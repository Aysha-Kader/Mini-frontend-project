import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
// import Recipie from "./pages/Recipie";
// import UserDetail from "./pages/RecipieDetailsPage";

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

       {/* <Routes> */}
        {/* <Home/> */}
        <About/>
       {/* </Routes> */}
      
    </div>
  );
}
