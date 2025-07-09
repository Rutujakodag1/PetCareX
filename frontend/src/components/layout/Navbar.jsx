import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Conditional classes for light and dark mode
  const bgClass = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';
  const linkHoverClass = theme === 'dark' ? 'bg-gray-800 text-white hover:text-gray-300' : 'bg-white text-gray-800 hover:text-gray-600';
  const dropdownBgClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800';

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Use correct key
    setIsAuthenticated(!!token);
  }, []);


  return (
    <header className={`w-full shadow-md ${bgClass}`}>
      <div className="py-4 px-6 border-b border-gray-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-4">PetCareX</h1>
          </div>

          <input
            type="text"
            placeholder="Search for pets, products, or categories..."
            className={`w-full md:w-2/4 px-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:ring focus:ring-blue-300 ${linkHoverClass}`}
          />

          <div className="flex items-center gap-6 ml-2">
            <a
              href="/cart"
              className={`text-lg font-medium flex items-center gap-1 ${linkHoverClass}`}
            >
              <span className="material-icons inline-flex">shopping_cart</span>
            </a>


            <button
              onClick={toggleTheme}
              className="px-2 py-1 text-lg font-medium text-gray-800 rounded-lg border border-gray-500 dark:text-white hover:text-blue-500"
            >
              {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </button>

            {isAuthenticated ? (
              <a
                href="#"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("role");
                  setIsAuthenticated(false);
                  window.location.href = "/login";
                }}
                className={`py-1 px-3 block text-lg font-medium rounded-lg border border-gray-500 hover:bg-gray-200 hover:text-gray-800`}
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                logout
              </a>
            ) : (
              <a href="/login" className="px-4 py-2 rounded-lg border font-medium border-gray-500 hover:bg-gray-600">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Login/Sign Up
              </a>
            )}

          </div>
        </div>
      </div>

      <nav className={`py-4 px-6 ${bgClass}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <ul className="hidden md:flex items-center gap-6">
            <li>
              <a
                href="/"
                className={`text-lg font-medium ${linkHoverClass}`}
              >
                Home
              </a>
            </li>

            <li className="relative group">
              <button
                className={`text-lg font-medium flex items-center gap-1 ${linkHoverClass}`}
              >
                Dog
                <span className="material-icons">expand_more</span>
              </button>
              <ul
                className={`absolute left-0 hidden group-hover:flex flex-col mt-1 shadow-lg rounded-lg overflow-hidden ${dropdownBgClass} z-50`}
              >
                <li className="px-4 py-2 hover:bg-gray-600">
                  <a href="/dog/food">Dog Food</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-600">
                  <a href="/dog/healthcare">Healthcare</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-600">
                  <a href="/dog/accessories">Accessories</a>
                </li>
              </ul>
            </li>

            <li className="relative group">
              <button
                className={`text-lg font-medium flex items-center gap-1 ${linkHoverClass}`}
              >
                Cat
                <span className="material-icons">expand_more</span>
              </button>
              <ul
                className={`absolute left-0 hidden group-hover:flex flex-col mt-1 shadow-lg rounded-lg overflow-hidden ${dropdownBgClass} z-50`}
              >
                <li className="px-4 py-2 hover:bg-gray-600">
                  <a href="/cat/food">Cat Food</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-600">
                  <a href="/cat/healthcare">Healthcare</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-600">
                  <a href="/cat/accessories">Accessories</a>
                </li>
              </ul>
            </li>

            <li className="relative group">
              <button
                className={`text-lg font-medium flex items-center gap-1 ${linkHoverClass}`}
              >
                More Pets
                <span className="material-icons">expand_more</span>
              </button>
              <ul
                className={`absolute left-0 hidden group-hover:flex flex-col mt-1 shadow-lg rounded-lg overflow-hidden ${dropdownBgClass} z-50`}
              >
                <li className="px-4 py-2 hover:bg-gray-600">
                  <a href="/birds">Birds</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-600">
                  <a href="/rabbits">Rabbits</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-600">
                  <a href="/fish">Fish</a>
                </li>
              </ul>
            </li>

            <li>
              <a
                href="/contact"
                className={`text-lg font-medium ${linkHoverClass}`}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
