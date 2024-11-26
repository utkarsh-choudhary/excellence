import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <h1 className="text-white text-xl font-bold">Movie App</h1>

                {/* Menu Links for larger screens */}
                <div className="hidden md:flex space-x-6">
                    <Link
                        to="/"
                        className={`${
                            isActive('/') ? 'text-blue-400' : 'text-white'
                        } hover:text-blue-400 transition`}
                    >
                        Movies
                    </Link>
                    <Link
                        to="/login"
                        className={`${
                            isActive('/login') ? 'text-blue-400' : 'text-white'
                        } hover:text-blue-400 transition`}
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className={`${
                            isActive('/register') ? 'text-blue-400' : 'text-white'
                        } hover:text-blue-400 transition`}
                    >
                        Register
                    </Link>
                </div>

                {/* Hamburger menu for mobile screens */}
                <button
                    className="text-white md:hidden focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    )}
                </button>

                {/* Dropdown menu for mobile screens */}
                {menuOpen && (
                    <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text-white py-4 shadow-lg">
                        <div className="flex flex-col items-center space-y-4">
                            <Link
                                to="/"
                                onClick={() => setMenuOpen(false)}
                                className={`${
                                    isActive('/') ? 'text-blue-400' : 'text-white'
                                } hover:text-blue-400 transition`}
                            >
                                Movies
                            </Link>
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className={`${
                                    isActive('/login') ? 'text-blue-400' : 'text-white'
                                } hover:text-blue-400 transition`}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setMenuOpen(false)}
                                className={`${
                                    isActive('/register') ? 'text-blue-400' : 'text-white'
                                } hover:text-blue-400 transition`}
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
