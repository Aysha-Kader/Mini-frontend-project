import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     await axios.post("https://mini-frontend-project.onrender.com/api/auth/register",{name,email,password});
    alert ("User registerd")   ;
    navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-yellow-100 to-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 w-80">
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input name="name" placeholder="Name" onChange={(e)=>setName(e.target.value)} className="w-full p-2 border rounded" required />
        <input name="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="w-full p-2 border rounded" required />

        <button className="w-full bg-orange-400 text-white p-2 rounded">
          Register
        </button>
         <br></br> 
       Already have an account? <span onClick={()=>navigate("/login")} className="text-gray-800 cursor-pointer">Login</span> 
           </form>
   
      
    </div>
  );
};

export default Register;