import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = ({ cartCount }) => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          AIStoreWithDeepSeek
        </Link>
        <div className="flex items-center space-x-4">
          <NavLink
            to="/static-tanstack-table"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-600"
            }
          >
            Static Tanstack
          </NavLink>
          <NavLink
            to="/dynamic-tanstack-table"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-600"
            }
          >
            Dynamic Tanstack
          </NavLink>
          <NavLink
            to="/tanstack-table"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-600"
            }
          >
            Tanstack
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-600"
            }
          >
            Cart ({cartCount})
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
