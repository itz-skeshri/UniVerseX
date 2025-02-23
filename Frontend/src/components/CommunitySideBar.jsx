import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CommunitySideBar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);


  return (
    <aside className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md md:sticky md:top-4 mb-4 md:mb-0">
      {/* Profile Section */}
      {user ? (
        <div className="hidden md:flex flex-col items-center text-center">
          <img
            src={user?.image || "/default-profile.png"} // ✅ Default profile image
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
          />
          <h2 className="text-lg md:text-xl font-semibold mt-2">
            {`${user?.firstName || "User"} ${user?.lastName || ""}`}
          </h2>
          <p className="text-xs md:text-sm text-gray-500">
            {user?.additionalDetails?.about || "No bio available"}
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading user data...</p> // ✅ Prevents crash
      )}

      <hr className="md:my-4 hidden md:flex" />

      {/* Sidebar Menu */}
      <ul className="text-gray-700 flex md:flex-col justify-between">
        <li
          className="p-2 text-sm md:text-base hover:bg-gray-200 rounded-lg cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          Edit Profile
        </li>
        <li className="p-2 text-sm md:text-base hover:bg-gray-200 rounded-lg cursor-pointer">
          Dashboard
        </li>
        <li className="p-2 text-sm md:text-base hover:bg-gray-200 rounded-lg cursor-pointer">
          My Posts
        </li>
        <li className="p-2 text-sm md:text-base hover:bg-gray-200 rounded-lg cursor-pointer">
          Saved Items
        </li>
        <li className="p-2 text-sm md:text-base hover:bg-gray-200 rounded-lg cursor-pointer">
          Settings
        </li>
        
      </ul>
    </aside>
  );
}

export default CommunitySideBar;
