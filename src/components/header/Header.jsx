import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../../assets/profile-icon.svg"; // Path to your SVG file

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token"); // Example authentication check

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleHomeClick = () => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  return (
    <header className="w-full py-2 bg-gray-800 text-white flex justify-between items-center px-4 font-mono z-50 relative">
      <button onClick={handleHomeClick}>Air Quality - IoT Platform</button>
      <div className="relative">
        <button
          onClick={handleProfileClick}
          className="text-white focus:outline-none"
        >
          <img src={ProfileIcon} alt="Profile" className="w-6 h-6" />{" "}
          {/* Using SVG as an img element */}
        </button>
        {isAuthenticated && isDropdownOpen && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50">
            <a
              href="#"
              onClick={() => navigate("/profile")}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Profile
            </a>
            <a
              href="#"
              onClick={() => {
                localStorage.removeItem("token"); // Logout logic
                setIsDropdownOpen(false);
                navigate("/login");
              }}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Log Out
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
