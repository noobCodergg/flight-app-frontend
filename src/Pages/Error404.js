import React from "react";

const Error404 = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-blue-600">404</h1>
        <p className="text-xl text-gray-700 mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-gray-500 mt-2">It seems you've hit a dead end.</p>
        <div className="mt-6">
          <a
            href="/"
            className="px-6 py-3 bg-blue-600 text-white text-lg rounded-md shadow-lg hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </a>
        </div>
        <div className="mt-8">
          <img
            src="https://via.placeholder.com/400"
            alt="Lost in Space Illustration"
            className="mx-auto w-72 lg:w-96"
          />
        </div>
      </div>
    </div>
  );
};

export default Error404;
