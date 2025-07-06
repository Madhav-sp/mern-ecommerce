import React, { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-blue-600" : "hover:text-gray-600";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close hamburger menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm transition duration-300 ease-in-out">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand */}
        <NavLink to="/">
          <div className="text-xl font-bold text-black">Bead Bracelets</div>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-black font-medium">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/bracelets" className={navLinkClass}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>
          <li className="p-2 rounded-md hover:bg-gray-100 transition">
            <IoSearch size={20} />
          </li>
          <li className="p-2 rounded-md hover:bg-gray-100 transition">
            <MdOutlineShoppingBag size={20} />
          </li>
          <li>
            <NavLink to="/dashboard/profile" className={navLinkClass}>
              <img
                src="data:image/jpeg;base64,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"
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              {/* <img
                src="https://i.pravatar.cc/40"
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              /> */}
            </NavLink>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <IoClose size={26} /> : <IoMenu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden px-6 py-4 space-y-4 text-black font-medium border-t border-gray-200 bg-white"
        >
          <div className="flex flex-col space-y-3">
            <NavLink to="/" className={navLinkClass} onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink
              to="/bracelets"
              className={navLinkClass}
              onClick={toggleMenu}
            >
              Shop
            </NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={toggleMenu}>
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={navLinkClass}
              onClick={toggleMenu}
            >
              Contact
            </NavLink>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <NavLink onClick={toggleMenu}>
              <IoSearch size={22} className="cursor-pointer" />
            </NavLink>
            <NavLink onClick={toggleMenu}>
              <MdOutlineShoppingBag size={22} className="cursor-pointer" />
            </NavLink>
            <NavLink to="/dashboard/profile" onClick={toggleMenu}>
              <CgProfile size={22} className="cursor-pointer" />
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
