import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Sparkles, Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const themeRef = useRef(null); // To detect clicks outside
  const location = useLocation();

  const totalItems = getTotalCartItems();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (themeRef.current && !themeRef.current.contains(event.target)) {
        setIsThemeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [themeRef]);

  const isActive = (path) => {
    return location.pathname === path 
      ? "text-accent font-semibold" 
      : "text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white";
  };

  const getThemeIcon = () => {
    if (theme === 'light') return <Sun className="w-5 h-5" />;
    if (theme === 'dark') return <Moon className="w-5 h-5" />;
    return <Monitor className="w-5 h-5" />;
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight dark:from-white dark:to-accent">
              ZenCartopia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`${isActive('/')} transition-colors duration-200`}>Home</Link>
            <Link to="/shop" className={`${isActive('/shop')} transition-colors duration-200`}>Shop</Link>
            <Link to="/shop" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors duration-200">Electronics</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            
            {/* THEME DROPDOWN */}
            <div className="relative" ref={themeRef}>
              <button 
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="flex items-center gap-1 p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent dark:border-slate-700"
              >
                {getThemeIcon()}
                <ChevronDown className={`w-3 h-3 transition-transform ${isThemeOpen ? 'rotate-180' : ''}`} />
              </button>

              {isThemeOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-fade-in">
                  <button onClick={() => {setTheme('light'); setIsThemeOpen(false)}} className={`w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 ${theme === 'light' ? 'text-accent font-bold' : 'text-slate-600 dark:text-slate-300'}`}>
                    <Sun className="w-4 h-4" /> Light
                  </button>
                  <button onClick={() => {setTheme('dark'); setIsThemeOpen(false)}} className={`w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 ${theme === 'dark' ? 'text-accent font-bold' : 'text-slate-600 dark:text-slate-300'}`}>
                    <Moon className="w-4 h-4" /> Dark
                  </button>
                  <button onClick={() => {setTheme('system'); setIsThemeOpen(false)}} className={`w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 ${theme === 'system' ? 'text-accent font-bold' : 'text-slate-600 dark:text-slate-300'}`}>
                    <Monitor className="w-4 h-4" /> System
                  </button>
                </div>
              )}
            </div>

            <Link to="/login" className="hidden md:flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-accent transition-colors">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">Login</span>
            </Link>

            <Link to="/cart" className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-accent transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full animate-fade-in border-2 border-white dark:border-slate-900">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-slate-600 dark:text-slate-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 absolute w-full shadow-lg animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" className="block py-3 text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-slate-800">Home</Link>
            <Link to="/shop" className="block py-3 text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-slate-800">Shop</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;