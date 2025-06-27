import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const navigate = useNavigate();

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
            onClick={openSignIn}
            className="sm:px-7 sm:py-2 px-4 py-1 bg-primary hover:bg-primary-dull transition rounded-full cursor-pointer font-medium"
          >
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                onClick={() => navigate("/my-bookings")}
                label="My Bookings"
                labelIcon={<TicketPlus width={15} />}
              />
            </UserButton.MenuItems>
          </UserButton>
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
