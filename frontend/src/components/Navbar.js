import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("resume_id");
    navigate("/");
  };

  const isLoginPage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";

  return (
    <nav className="bg-indigo-950 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-lg">AI Resume Matcher</h1>

        <div className="space-x-4">

         
          {!token && !isLoginPage && !isRegisterPage && (
            <Link to="/" className="hover:text-blue-400">
              Login
            </Link>
          )}

          
          {token && (
            <>
              <Link to="/resume" className="hover:text-blue-400">
                Resume
              </Link>

              <Link to="/match" className="hover:text-blue-400">
                Match
              </Link>

              <button
                onClick={handleLogout}
                className="hover:text-red-400"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
