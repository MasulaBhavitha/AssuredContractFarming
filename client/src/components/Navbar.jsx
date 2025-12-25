import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-emerald-800 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/assets/logo/logo.jpeg" className="h-10 w-auto object-contain rounded-lg shadow-sm" alt="AgriSecure" />
                        <span className="text-2xl font-black tracking-tighter uppercase italic">Agri<span className="text-emerald-400 not-italic">Secure</span></span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="hover:text-emerald-200 transition">Home</Link>
                        <Link to="/about" className="hover:text-emerald-200 transition">About Us</Link>
                        <Link to="/crops-availability" className="hover:text-emerald-200 transition">Crops</Link>
                        <Link to="/contracts" className="hover:text-emerald-200 transition">Contracts</Link>
                        <Link to="/market" className="hover:text-emerald-200 transition">Market</Link>
                        <Link to="/payment" className="hover:text-emerald-200 transition">Payments</Link>

                        {isAuthenticated ? (
                            <>
                                {user?.role === 'farmer' && (
                                    <Link to="/farmer-dashboard" className="hover:text-emerald-200 transition">Dashboard</Link>
                                )}
                                {user?.role === 'buyer' && (
                                    <Link to="/buyer-dashboard" className="hover:text-emerald-200 transition">Dashboard</Link>
                                )}
                                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-emerald-600">
                                    <span className="flex items-center gap-2 text-sm"><User size={16} /> {user?.name} ({user?.role})</span>
                                    <button onClick={handleLogout} className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition">
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-emerald-200 transition">Login</Link>
                                <Link to="/register" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded transition">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button could go here */}
                    <button className="md:hidden">
                        <Menu />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
