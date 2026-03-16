import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Recipie from "./pages/Recipie";
import RecipieDetailsPage from "./pages/RecipieDetailsPage";
import AddRecipe from "./pages/AddRecipe";
import Favorites from './pages/Favorites';
import Footer from "./components/Footer"
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
     <Navbar />
    
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/recipies" element={<Recipie/>} ></Route>
            <Route path="/recipes/:id" element={<RecipieDetailsPage/>}/>
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            
           </Routes>
           <Footer />

    </div>
  );
}
