import React from "react";
import { assets } from "../assets/assets";
import backgroundImage from "../assets/background2.jpeg";
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center h-screen flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36"
    >
      <img src={assets.appStore} alt="" className="max-h-11 lg:h-11 mt-20" />
      <h1 className="text-5xl md:text-[70px] md:leading-18 font-semibold max-w-150 ">
        BREAKING <br /> BAD
      </h1>
      <div className="flex items-center gap-4 text-gray-300">
        <span>Action | Adventure | Sci-Fi</span>
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-4.5 h-4.5" /> 2018
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon className="w-4.5 h-4.5" /> 2h 8m
        </div>
      </div>
      <p className="max-w-md text-gray-300">
        A high school chemistry teacher turned methamphetamine partners with a
        former student to build an empire but as power grows,forcing him deeper
        into a violent underworld.
      </p>
      <button
        className="flex items-center gap-1 bg-primary hover:bg-primary-dull px-6 py-3 text-sm rounded-full transition font-medium cursor-pointer"
        onClick={() => navigate("/movies")}
      >
        Explore Movies
        <ArrowRight
          className="w-4.5 h-4.5
        "
        />
      </button>
    </div>
  );
};

export default HeroSection;
