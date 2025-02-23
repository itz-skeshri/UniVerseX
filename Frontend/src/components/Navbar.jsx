import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice"; // Import logout action

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select authentication state from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  // Local state for user data
  const [userData, setUserData] = useState({
    userName: "User",
    userAvatar:
      "https://www.shutterstock.com/image-vector/no-photo-vector-flat-illustration-260nw-2470053053.jpg", // Default avatar
  });

  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Update user data when authentication state changes
  useEffect(() => {
    if (isAuthenticated && user) {
      setUserData({
        userName: user.firstName,
        userAvatar:
          user.image
      });
    }
  }, [isAuthenticated, user]);

  // Toggle dropdown
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    closeDropdown();
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white w-full">
      {/* Logo */}
      <h1
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        UniVerseX
      </h1>

      {/* Menu Items */}
      <ul className="hidden md:flex gap-6 text-gray-700">
        <li
          className="cursor-pointer hover:text-blue-600"
          onClick={() => navigate("/about")}
        >
          About
        </li>
        <li
          className="cursor-pointer hover:text-blue-600"
          onClick={() => navigate("/mission")}
        >
          Mission
        </li>
        <li
          className="cursor-pointer hover:text-blue-600"
          onClick={() => navigate("/product")}
        >
          Product
        </li>
      </ul>

      {/* Right Section: Login/Signup OR Avatar */}
      <div className="relative">
        {isAuthenticated ? (
          // User Avatar when logged in
          <div className="relative">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              onClick={toggleDropdown}
            >
              <div className="w-10 rounded-full">
                <img src={userData.userAvatar} alt="User Avatar" />
              </div>
            </label>

            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 shadow bg-white rounded-lg w-52 absolute right-0 z-50 border border-gray-200"
              >
                <li className="p-2 text-gray-700 font-semibold">
                  {userData.userName}
                </li>
                <hr />
                <li>
                  <a
                    className="hover:bg-gray-200 p-2 cursor-pointer"
                    onClick={() => {
                      navigate("/community");
                      closeDropdown();
                    }}
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    className="hover:bg-gray-200 p-2 cursor-pointer"
                    onClick={() => {
                      navigate("/budget");
                      closeDropdown();
                    }}
                  >
                    Budget
                  </a>
                </li>
                <li onClick={handleLogout}>
                  <a className="hover:bg-gray-200 p-2 cursor-pointer text-red-500">
                    Logout
                  </a>
                </li>
              </ul>
            )}
          </div>
        ) : (
          // Login Button when not logged in
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600"
            onClick={handleLogin}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
