import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/register", form);

      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 w-80">
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" required />

        <button className="w-full bg-orange-400 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;