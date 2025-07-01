import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  MenuIcon,
  SearchIcon,
  TicketPlus,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const { user, logout } = useAppContext();

  // const { favoriteMovies } = useAppContext();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token);
  //       // decoded looks like { userId: "...", role: "...", iat: ..., exp: ... }
  //       // If your token does NOT have the user's name/email, you might fetch from backend here.
  //       setUser({
  //         id: decoded.userId,
  //         role: decoded.role,
  //         name: decoded.name || "User",
  //       });
  //     } catch (err) {
  //       console.error("Invalid token", err);
  //     }
  //   }
  // }, []);
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="" className="w-36 h-auto" />
      </Link>
      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row
      items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300
      ${isOpen ? "max-md:w-full" : "max-md:w-0"}`}
      >
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        <NavLink
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "text-gray-300"
          }
        >
          Home
        </NavLink>
        <NavLink
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/movies"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "text-gray-300"
          }
        >
          Movies
        </NavLink>
        <NavLink
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/theaters"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "text-gray-300"
          }
        >
          Theaters
        </NavLink>
        <NavLink
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/releases"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "text-gray-300"
          }
        >
          Releases
        </NavLink>
        {/* {favoriteMovies.length > 0 && ( */}
        <NavLink
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/favorite"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "text-gray-300"
          }
        >
          Favorites
        </NavLink>
      </div>
      <div className="flex items-center gap-8">
        <SearchIcon className="w-6 h-6 cursor-pointer max-md:hidden" />
        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="sm:px-7 sm:py-2 px-4 py-1 bg-primary hover:bg-primary-dull transition rounded-full cursor-pointer font-medium"
          >
            Login
          </button>
        ) : (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/my-bookings")}
            title="Go to Profile"
          >
            <UserIcon className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold">
              {user.name || "User"}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLogout();
              }}
              className="cursor-pointer ml-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              title="Logout"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <MenuIcon
        className="cursor-pointer h-8 w-8 max-md:ml-4 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default Navbar;
