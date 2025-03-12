
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 py-4 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-medium text-primary flex items-center space-x-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="text-2xl font-bold tracking-wide">HERØ</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/chat" 
            className={`nav-link ${location.pathname === '/chat' ? 'active' : ''}`}
          >
            Chat
          </Link>
          <Link 
            to="/resources" 
            className={`nav-link ${location.pathname === '/resources' ? 'active' : ''}`}
          >
            Resources
          </Link>
        </nav>
        
        <div className="md:hidden">
          {/* Mobile menu button would go here */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
