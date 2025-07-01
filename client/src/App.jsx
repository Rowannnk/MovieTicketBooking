import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Movies from "./pages/Movies";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";
import { Toaster } from "react-hot-toast";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddShows from "./pages/admin/AddShows";
import ListShows from "./pages/admin/ListShows";
import ListBookings from "./pages/admin/ListBookings";
import LogIn from "./pages/Login";
import Register from "./pages/Register";
import { useAppContext } from "./context/AppContext";
import Loading from "./components/Loading";

const App = () => {
  const location = useLocation();
  const isAdminRoute = useLocation().pathname.startsWith("/admin");
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  // const { user } = useAppContext();
  const { user, loading } = useAppContext();
  console.log("Current user:", user);
  console.log("Token:", localStorage.getItem("token"));

  if (loading) return null; // ✅ or show a loading spinner

  return (
    <>
      <Toaster />
      {!isAdminRoute && !isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/loading/:nextUrl" element={<Loading />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route
          path="/my-bookings"
          element={user ? <MyBookings /> : <LogIn />} // ✅ optional protection
        />
        <Route
          path="/favorite"
          element={user ? <Favorite /> : <LogIn />} // ✅ optional protection
        />
        {/* For Admin Route */}
        <Route path="/admin/*" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>
      {!isAdminRoute && !isAuthPage && <Footer />}
    </>
  );
};

export default App;
