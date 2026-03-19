import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-slate-950/60 border-b border-slate-800/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <span className="font-black tracking-tight text-xl text-white">
            LOBBY<span className="text-blue-500">VISION</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wide text-slate-400">
          <a
            href="/about"
            className="uppercase hover:text-blue-400 transition-colors duration-200"
          >
            The Project
          </a>

          <a
            href="/team"
            className="uppercase hover:text-blue-400 transition-colors duration-200"
          >
            The Team
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;