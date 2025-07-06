import React from "react";

const Header = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 text-center text-sm text-gray-500 py-6">
      <div className="flex justify-center flex-wrap gap-6 mb-2">
        <a href="/" className="hover:underline">
          Shop
        </a>
        <a href="/about" className="hover:underline">
          About
        </a>
        <a href="/contact" className="hover:underline">
          Contact
        </a>
        <a href="/privacy" className="hover:underline">
          Privacy Policy
        </a>
        <a href="/terms" className="hover:underline">
          Terms of Service
        </a>
      </div>
      <p>©2024 WristCharm. All rights reserved.</p>
    </footer>
  );
};

export default Header;
