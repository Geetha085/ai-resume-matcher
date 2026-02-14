import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      const res = await axios.post("http://127.0.0.1:5000/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.access_token);
      navigate("/resume");

    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen bg-indigo-950">
      <div className="w-full max-w-md m-auto bg-indigo-100 rounded-xl p-5">

        {/* <header>
          <img
            className="w-20 mx-auto mb-5"
            src="https://img.icons8.com/fluent/344/year-of-tiger.png"
            alt="logo"
          />
        </header> */}

        <form onSubmit={handleLogin}>
          <div>
            <label className="block mb-2 text-indigo-500">
              Email
            </label>

            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="email"
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
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
            >
              Login
            </button>
          </div>
        </form>

        <footer className="flex justify-between">
          {/* <span className="text-indigo-700 hover:text-pink-700 text-sm cursor-pointer">
            Forgot Password?
          </span> */}
          <span
  className="block text-center text-indigo-700 hover:text-pink-700 text-sm cursor-pointer"
  onClick={() => navigate("/register")}
>
  Create Account
</span>


        </footer>

      </div>
    </div>
  );
}

export default Login;
