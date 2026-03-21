import React, { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../data/authSlice";
import {setFavorites,fetchFavorites} from "../data/recipeSlice"

const Navbar = () => {
  const dispatch = useDispatch();
  

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };
 const {isLoggedIn}=useSelector(state=> state.auth);

 useEffect(()=>{
  if(isLoggedIn){
    dispatch(fetchFavorites());
  }
 },[isLoggedIn,dispatch]);

const handleLogout=()=>{
 dispatch(logout());
 dispatch(setFavorites([]));
 navigate("/login");
}
  // helper to check active page
  const isActive = (path) => location.pathname === path;

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
         
          {isOpen ? (
            <IoClose size={30} className="cursor-pointer" onClick={() => setIsOpen(false)} />
          ) : (
            <HiMenu size={30} className="cursor-pointer" onClick={() => setIsOpen(true)} />
          )}
        </div>

        {/* DESKTOP nav */}
        <ul className="hidden md:flex gap-8 text-gray-400 text-xl">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Recipes", path: "/recipies" },
            { name: "Favorites", path: "/favorites" },
            
            ...(isLoggedIn?[{name:"Dashboard",path :"/dashboard"}]:[]),
             ...(!isLoggedIn?[{name:"Sign up",path :"/register"}]:[])
            
          ].map((item) => (
            <li
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={`cursor-pointer transform transition duration-300 hover:scale-105 hover:text-gray-600 ${isActive(item.path) ? "border-b-2 border-yellow-500 text-gray-800" : ""
                }`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* Login / Logout */}
        {isLoggedIn ? (
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer"
          >
           Sign in
          </button>

         
        )}
       
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col gap-8 p-8 pt-20">
          <IoClose size={30} className="absolute top-5 right-5 cursor-pointer" onClick={() => setIsOpen(false)} />

          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Recipes", path: "/recipies" },
            { name: "Favorites", path: "/favorites" },
            {name:"Sign up",path:"/register"}
             ,
            ...(isLoggedIn?[{name:"Dashboard",path :"/dashboard"}]:[])
            
          ].map((item) => (
            <li
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={`list-none font-bold text-lg cursor-pointer transform transition hover:scale-105 ${isActive(item.path) ? "border-b-2 border-yellow-500 text-gray-800" : "text-gray-400 hover:text-gray-600"
                }`}
            >
              {item.name}
            </li>
          ))}

          {isLoggedIn ? (
            <button
              onClick={() => {
               handleLogout();
                setIsOpen(false);
                navigate("/login");
              }}
              className="bg-red-500 rounded-lg p-2 text-white hover:bg-red-600"
            >
              Logout
            </button>):(
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
              className="bg-orange-400 rounded-lg p-2 text-white hover:bg-orange-600"
            >
             Sign in
            </button>
         
         
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;