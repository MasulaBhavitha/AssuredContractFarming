import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'farmer' // default
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const { name, email, password, role } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        const result = await register(formData);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden">
            <div className="flex justify-center mb-8">
                <img src="/assets/logo/logo.jpeg" className="h-16 w-auto object-contain rounded-xl shadow-lg border border-emerald-50" alt="AgriSecure" />
            </div>
            <h2 className="text-2xl font-black text-center text-gray-900 mb-6 tracking-tight uppercase italic underline decoration-emerald-500 decoration-4 underline-offset-8">Join <span className="text-emerald-600 not-italic">AgriSecure</span></h2>
            {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded mb-4 flex items-center gap-2">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                        placeholder="john@example.com"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                        placeholder="••••••••"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">I am a...</label>
                    <select
                        name="role"
                        value={role}
                        onChange={onChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                    >
                        <option value="farmer">Farmer</option>
                        <option value="buyer">Buyer</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition transform active:scale-95"
                >
                    Register
                </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
                Already have an account? <a href="/login" className="text-emerald-600 font-semibold hover:underline">Login</a>
            </p>
        </div>
    );
};

export default Register;
