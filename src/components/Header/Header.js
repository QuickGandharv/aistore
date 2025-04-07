import React from "react";
import { Link } from "react-router-dom";

const Header = ({ cartCount }) => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          AIStoreWithDeepSeek
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/dynamic-tanstack-table"
            className="text-gray-700 hover:text-blue-600"
          >
            Dynamic Tanstack
          </Link>
          <Link
            to="/tanstack-table"
            className="text-gray-700 hover:text-blue-600"
          >
            Tanstack
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-600">
            Cart ({cartCount})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
