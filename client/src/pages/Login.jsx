"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/background1.jpeg";
import { useAppContext } from "../context/AppContext";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useAppContext();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <section className="bg-primary/40 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full flex overflow-hidden mt-20">
          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 px-8 md:px-12 py-10">
            <h2 className="text-3xl font-bold text-primary mb-1">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Login to make booking for shows
            </p>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm mb-1 text-primary">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-black w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-primary">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-black w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dull transition cursor-pointer"
              >
                Login
              </button>
            </form>

            <div className="mt-5 text-sm text-right text-primary hover:underline cursor-pointer">
              Forgot your password?
            </div>

            <div className="mt-6 flex justify-between items-center text-sm text-primary">
              <p>Don’t have an account?</p>
              <button
                onClick={() => navigate("/register")}
                className="py-1.5 px-5 border border-primary rounded-lg hover:bg-primary-dull hover:text-white transition cursor-pointer"
              >
                Register
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="hidden md:block w-1/2">
            <img
              src={loginImage}
              alt="Login Visual"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LogIn;
