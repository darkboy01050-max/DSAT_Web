import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import ContactPage from './pages/ContactPage';
import SettingsPage from './pages/SettingsPage';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/contact', label: 'Contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled ? 'bg-white shadow-sm' : 'bg-white'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center transition-elegant hover:opacity-80">
            <img
              src="/images/logo.jpg"
              alt="Digital SAT Math"
              className="h-14 w-auto rounded-lg transition-elegant hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const textLogo = e.currentTarget.nextElementSibling;
                if (textLogo) textLogo.classList.remove('hidden');
              }}
            />
            <span className="text-xl font-bold text-gray-900 hidden ml-2">
              Digital SAT Math
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-elegant relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300 ${
                  isActive(link.to) ? 'text-blue-500 after:w-full' : 'text-gray-700 hover:text-blue-500 after:w-0 hover:after:w-full'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-elegant hover:scale-110"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-200 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-elegant hover:translate-x-1 ${
                  isActive(link.to) ? 'bg-blue-50 text-blue-500' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Digital SAT Math
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Master the Digital SAT Math section with comprehensive online courses taught by Mr. Mohamed Aliaa.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-gray-600 hover:text-blue-500 transition-elegant hover:translate-x-1">
                Home
              </Link>
              <Link to="/courses" className="block text-sm text-gray-600 hover:text-blue-500 transition-elegant hover:translate-x-1">
                Courses
              </Link>
              <Link to="/contact" className="block text-sm text-gray-600 hover:text-blue-500 transition-elegant hover:translate-x-1">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-500 transition-elegant hover:scale-110 hover:-translate-y-1"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-elegant hover:scale-110 hover:-translate-y-1"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-elegant hover:scale-110 hover:-translate-y-1"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © 2025 Digital SAT Math. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
