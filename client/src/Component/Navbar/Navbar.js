import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleTheme = () => setDarkMode(!darkMode);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/createpost', label: 'Create Post' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full ${darkMode ? 'dark' : ''}`}>
      <nav className="w-full py-4 flex justify-between items-center bg-white dark:bg-[#0f0f0f] text-black dark:text-white border-b border-gray-200 dark:border-zinc-800 shadow-md px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Social site
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 flex-nowrap overflow-x-auto whitespace-nowrap max-w-full">
          {/* Nav Links */}
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative group ${
                location.pathname === item.path ? 'text-purple-400' : 'text-gray-800 dark:text-white'
              } whitespace-nowrap`}
            >
              {item.label}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 w-full bg-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                  location.pathname === item.path ? 'scale-x-100' : ''
                }`}
              ></span>
            </Link>
          ))}

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1.5 rounded-md bg-zinc-800 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-32 lg:w-48 shrink-0"
          />

          {/* Notifications */}
          <button className="relative shrink-0">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
          </button>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="ml-2 shrink-0">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={toggleMobileMenu} className="md:hidden">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.ul
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#111] px-6 py-4 space-y-4 text-lg font-medium text-white shadow-lg"
          >
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block hover:text-purple-400 ${
                    location.pathname === item.path ? 'text-purple-400 font-semibold' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-[#111] md:hidden flex justify-around items-center p-3 border-t border-zinc-800">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center text-sm ${
              location.pathname === item.path ? 'text-purple-400' : 'text-white'
            }`}
          >
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
