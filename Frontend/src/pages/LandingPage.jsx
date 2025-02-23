import React from "react";
import { useSelector } from "react-redux";

const Landing = () => {
  // const isAuthenticated = useSelector
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center px-8 md:px-16 py-20">
        {/* Left Image (Hidden on Mobile) */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Empowering University Students
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            A community-driven platform designed to help students collaborate,
            manage expenses, and access academic resources effortlessly.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo minus nihil officia suscipit natus! Dicta, suscipit fugiat culpa laborum eligendi, voluptatibus autem temporibus unde illum, qui et. Ab, minima odio.
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <button className="bg-purple-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-800">
              Get Started
            </button>
            <button className="bg-gray-200 px-6 py-3 rounded-lg shadow-md hover:bg-gray-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="hidden md:block w-1/2">
          <img src="/Landing.jpg" alt="Illustration" className="w-full" />
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Why Choose UniVerseX?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Community Posts
            </h3>
            <p className="text-gray-600">
              Share ideas, ask questions, and collaborate with fellow students.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-2 text-green-600">
              Budget Calculator
            </h3>
            <p className="text-gray-600">
              Track and manage your student expenses effectively.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-2 text-purple-600">
              AI Chatbot
            </h3>
            <p className="text-gray-600">
              Get instant academic assistance 24/7.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-2 text-purple-600">
              AI Chatbot
            </h3>
            <p className="text-gray-600">
              Get instant academic assistance 24/7.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-2 text-purple-600">
              AI Chatbot
            </h3>
            <p className="text-gray-600">
              Get instant academic assistance 24/7.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-2 text-purple-600">
              AI Chatbot
            </h3>
            <p className="text-gray-600">
              Get instant academic assistance 24/7.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-2 text-purple-600">
              AI Chatbot
            </h3>
            <p className="text-gray-600">
              Get instant academic assistance 24/7.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-2 text-purple-600">
              AI Chatbot
            </h3>
            <p className="text-gray-600">
              Get instant academic assistance 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-20 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          About UniVerseX
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          UniVerseX enhances the university experience by providing students
          with a comprehensive platform for staying informed, managing finances,
          and accessing academic resources seamlessly.
        </p>
      </section>
    </div>
  );
};

export default Landing;
