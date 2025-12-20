import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 shadow bg-gray-100">
      <nav className="py-3 px-5 md:px-6 flex justify-between items-center">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-extrabold cursor-pointer drop-shadow"
        >
          <span>Flav</span>
          <span className="text-yellow-500">oriz</span>
        </h1>

        {/* Mobile menu icon */}
        <div className="md:hidden flex items-center gap-3">
          <input
            type="text"
            className="rounded-lg bg-gray-200 text-gray-500 p-2 outline-none"
            placeholder="Search your dishes..."
          />
          {isOpen ? (
            <IoClose size={30} onClick={() => setIsOpen(false)} />
          ) : (
            <HiMenu size={30} onClick={() => setIsOpen(true)} />
          )}
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 text-gray-400 text-xl">
          <li
            onClick={() => navigate("/")}
            className="cursor-pointer transform transition duration-300 hover:scale-105 hover:text-gray-600"
          >
            Home
          </li>
          <li
            onClick={() => navigate("/about")}
            className="cursor-pointer transform transition duration-300 hover:scale-105 hover:text-gray-600"
          >
            About
          </li>
          <li className="cursor-pointer transform transition duration-300 hover:scale-105 hover:text-gray-600">
            Recipes
          </li>
        </ul>

        {/* Desktop search */}
        <div className="hidden lg:flex">
          <input
            type="text"
            className="rounded-lg bg-gray-200 text-gray-500 p-3 outline-none"
            placeholder="Search your dishes..."
          />
        </div>

        {/* Login */}
        <button className="hidden md:block bg-orange-400 text-white px-4 py-2 rounded-lg transform transition duration-300 hover:bg-orange-600 hover:scale-105 cursor-pointer">
          Login
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col gap-8 p-8 text-lg">
          <li onClick={() => navigate("/")} className="cursor-pointer">Home</li>
          <li onClick={() => navigate("/about")} className="cursor-pointer hover:scale-125 hover:bg-gray-100">About</li>
          <li className="cursor-pointer">Recipies</li>
          <button className="bg-orange-400 text-white p-2 rounded-lg cursor-pointer hover:scale-25 hover:bg-orange-600">
            Login
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
