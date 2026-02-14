import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:5000/auth/register", {
        name,
        email,
        password
      });

      alert("Account created successfully!");
      navigate("/"); // go back to login

    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex h-screen bg-indigo-700">
      <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">

        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          Create Account
        </h2>

        <form onSubmit={handleRegister}>
          <div>
            <label className="block mb-2 text-indigo-500">
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-2 mb-4 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-indigo-500">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 mb-4 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-indigo-500">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 mb-6 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </form>

        <p
          className="text-center text-indigo-700 mt-4 cursor-pointer hover:text-pink-700"
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>

      </div>
    </div>
  );
}

export default Register;
