// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/auth.js";

const ViewResetPassword = () => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (password && repeatPassword && password === repeatPassword) {
      // Simulate an API call
      API.resetPassword(password)
        .then((response) => {
          //   if (response.token && response.id_usuario && response.role) {
          //     localStorage.setItem("token", response.token);
          //     localStorage.setItem("id_usuario", response.id_usuario);
          //     localStorage.setItem("role", response.role);
          //     navigate("/");
          //   } else {
          //     alert("Invalid credentials");
          //   }
        })
        .catch((error) => {
          console.error("Login error:", error);
          alert("Login failed. Please try again later.");
        });
    }
  }, [password]);

  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-gray-300 via-blue-500 to-blue-700">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">
          Forgot Password Request
        </h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="repeated-password"
              className="block text-sm font-medium text-gray-700"
            >
              Repeat new password
            </label>
            <input
              id="repeated-password"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewResetPassword;
