import { useState } from "react";

import { loginUser } from "../data/authSlice";
import { useNavigate } from "react-router-dom";
import {fetchFavorites} from "../data/recipeSlice";
import {useDispatch} from "react-redux";

const Login = () => {
  
  //  navigate between pages
  const navigate = useNavigate();
const dispatch=useDispatch();
  // State to store email input value
  const [email, setEmail] = useState("");

  // State to store password input value
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault(); //  stop page reload

  try {
    //  login request
    const res = await dispatch(
      loginUser({ email, password })
    ).unwrap();
console.log(res);
    // Check role and navigate
    if (res.role === "admin") {
      //  Admin → go to admin dashboard
      navigate("/admin");
    } else {
      //  Normal user → fetch favorites + go dashboard
      dispatch(fetchFavorites());
      navigate("/dashboard");
    }

  } catch (err) {
    //  Show backend error (important for approval case)
    alert("Waiting for admin approval"|| "Login failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 to-gray-100">
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login 🍽️</h2>
        {/* email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-orange-400 text-white py-3 rounded-xl hover:bg-orange-500 transition">
          Login
        </button>
        <br></br> 
        Don't have an account? <span onClick={()=>navigate("/register")} className="text-orange-800 cursor-pointer">Register</span>     </form>
    </div>
  );
};

export default Login;
