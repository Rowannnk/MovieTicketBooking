/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [shows, setShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const location = useLocation();
  const navigate = useNavigate();

  // Get token from localStorage
  const getToken = () => localStorage.getItem("token");

  const decodeUserFromToken = () => {
    const token = getToken();
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (err) {
      console.error("Invalid token", err);
      return null;
    }
  };

  const fetchIsAdmin = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/admin/is-admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsAdmin(data.isAdmin);

      if (!data.isAdmin && location.pathname.startsWith("/admin")) {
        navigate("/");
        toast.error("You are not authorized to access admin dashboard");
      }
    } catch (error) {
      console.warn(
        "Admin check failed:",
        error?.response?.data?.message || error.message
      );

      // Handle 403 error gracefully
      if (location.pathname.startsWith("/admin")) {
        navigate("/");
        toast.error("Access denied: Admin only");
      }
      setIsAdmin(false);
    }
  };

  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
      if (data.success) {
        setShows(data.shows);
        console.log("Shows fetched:", data.shows);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch shows:", error);
    }
  };

  const fetchFavoriteMovies = async () => {
    try {
      const { data } = await axios.get("/api/user/favorites", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setFavoriteMovies(data.movies);
        console.log("Favorite movies fetched:", data.movies);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Fetching favorites failed:", error);
    }
  };

  // Load shows on mount
  useEffect(() => {
    fetchShows();
  }, []);

  // Decode user from token and fetch auth-protected data
  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        fetchIsAdmin();
        if (decoded.role !== "admin") {
          fetchFavoriteMovies();
        }
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post("/api/user/login", { email, password });

      if (data.token) {
        localStorage.setItem("token", data.token);
        const decoded = jwtDecode(data.token);
        setUser(decoded); // ✅ make sure this line is here
        await fetchIsAdmin();
        if (decoded.role !== "admin") {
          await fetchFavoriteMovies();
        }
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAdmin(false);
    navigate("/login");
  };

  const value = {
    loading,
    axios,
    user,
    isAdmin,
    shows,
    fetchIsAdmin,
    favoriteMovies,
    fetchFavoriteMovies,
    fetchShows,
    getToken,
    login,
    logout,
    navigate,
    image_base_url,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
