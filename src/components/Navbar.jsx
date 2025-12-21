import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false); 
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <nav className="py-3 px-5 md:px-6 flex justify-between items-center">

        {/* Logo */}
        <h1
          onClick={() => handleNavigate("/")}
          className="text-2xl font-extrabold cursor-pointer drop-shadow"
        >
          <span>Flav</span>
          <span className="text-yellow-500">oriz</span>
        </h1>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center gap-3">
          <input
            type="text"
            className="rounded-lg bg-gray-200 text-gray-500 p-2 outline-none"
            placeholder="Search your dishes..."
          />
          {isOpen ? (
            <IoClose
              size={30}
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <HiMenu
              size={30}
              className="cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>

        {/* DESKTOP nav */}
        <ul className="hidden md:flex gap-8 text-gray-400 text-xl">
          <li
            onClick={() => handleNavigate("/")}
            className="cursor-pointer transform transition duration-300 hover:scale-105 hover:text-gray-600"
          >
            Home
          </li>
          <li
            onClick={() => handleNavigate("/about")}
            className="cursor-pointer transform transition duration-300 hover:scale-105 hover:text-gray-600"
          >
            About
          </li>
          <li onClick={() => handleNavigate("/recipies")} className="cursor-pointer transform transition duration-300 hover:scale-105 hover:text-gray-600">
            Recipes
          </li>
        </ul>

        {/* searcg
        h */}
        <div className="hidden lg:flex">
          <input
            type="text"
            className="rounded-lg bg-gray-200 text-gray-500 p-3 outline-none"
            placeholder="Search your dishes..."
          />
        </div>

        {/*login */}
        <button className="hidden md:block bg-orange-400 text-white px-4 py-2 rounded-lg transform transition duration-300 hover:bg-orange-600 hover:scale-105">
          Login
        </button>
      </nav>

      {/*mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col gap-8 p-8 pt-20">

          {/*close button */}
          <IoClose
            size={30}
            className="absolute top-5 right-5 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

          <li
            onClick={() => handleNavigate("/")}
            className="list-none font-bold text-lg text-gray-400 cursor-pointer transform transition hover:scale-105 hover:text-gray-600"
          >
            Home
          </li>

          <li
            onClick={() => handleNavigate("/about")}
            className="list-none font-bold text-lg text-gray-400 cursor-pointer transform transition hover:scale-105 hover:text-gray-600"
          >
            About
          </li>

          <li
            onClick={() => setIsOpen(false)}
            className="list-none font-bold text-lg text-gray-400 cursor-pointer transform transition hover:scale-105 hover:text-gray-600"
          >
            Recipes
          </li>

          <button
            onClick={() => setIsOpen(false)}
            className="bg-orange-400 rounded-lg p-2 text-white transform transition hover:bg-orange-600 hover:scale-105 cursor-pointer"
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
