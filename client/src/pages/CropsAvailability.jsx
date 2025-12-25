import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Loader2 } from 'lucide-react';

const CropsAvailability = () => {
    const navigate = useNavigate();
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCrops = async () => {
        try {
            const res = await api.get('/crops');
            if (res.data.length === 0) {
                // Auto seed for demo purposes if empty
                await api.post('/crops/seed');
                const seedRes = await api.get('/crops');
                setCrops(seedRes.data);
            } else {
                setCrops(res.data);
            }
        } catch (err) {
            console.error('Error fetching crops:', err);
            setError('Failed to load crops. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="text-red-500 text-xl font-semibold">{error}</div>
            </div>
        );
    }

    useEffect(() => {
        fetchCrops();
    }, []);

    const handleBook = (crop) => {
        navigate('/payment', { state: { crop } });
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-emerald-600" size={40} /></div>;

    return (
        <div className="min-h-screen bg-[#f8faf9] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-4">Stock Status: Active</p>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase italic leading-none mb-6">
                        Live <span className="text-emerald-600 not-italic tracking-normal">Inventory</span>
                    </h1>
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Explore real-time inventory of climate-resilient crops available for immediate contracting. Verified yield potential and regional authenticity guaranteed.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { _id: '1', name: 'Premium Wheat', season: 'Rabi', available: '500 Tons', region: 'Punjab', price: '₹2,400/quintal', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800' },
                        { _id: '2', name: 'Basmati Rice', season: 'Kharif', available: '300 Tons', region: 'Haryana', price: '₹6,500/quintal', image: '/assets/crops/basmati rice.jpg' },
                        { _id: '3', name: 'Organic Cotton', season: 'Kharif', available: '200 Bales', region: 'Gujarat', price: '₹8,200/candy', image: '/assets/crops/cotton.jpg' },
                        { _id: '4', name: 'Yellow Soybean', season: 'Kharif', available: '450 Tons', region: 'Madhya Pradesh', price: '₹4,800/quintal', image: '/assets/crops/soyabeans.jpg' },
                        { _id: '5', name: 'Sugarcane', season: 'Annual', available: '1200 Tons', region: 'Maharashtra', price: '₹3,200/ton', image: '/assets/crops/sugarcane.jpg' },
                        { _id: '6', name: 'Mustard Seeds', season: 'Rabi', available: '150 Tons', region: 'Rajasthan', price: '₹5,400/quintal', image: '/assets/crops/mustard seeds.jpg' }
                    ].map((crop) => (
                        <div key={crop._id} className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                            <div className="relative h-56 overflow-hidden">
                                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={crop.image} alt={crop.name} />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-emerald-800 uppercase tracking-widest shadow-sm">
                                    {crop.region}
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tighter uppercase italic">{crop.name}</h3>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-emerald-50 p-3 rounded-2xl">
                                        <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest opacity-50 mb-1">Season</p>
                                        <p className="font-bold text-emerald-900">{crop.season}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-2xl">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Stock</p>
                                        <p className="font-bold text-gray-800">{crop.available}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Current Price</p>
                                        <span className="text-xl font-black text-emerald-600 tracking-tighter">{crop.price.split('/')[0]}</span>
                                        <span className="text-xs font-bold text-gray-400">/{crop.price.split('/')[1]}</span>
                                    </div>
                                    <button
                                        onClick={() => handleBook(crop)}
                                        className="bg-black text-white px-6 py-3 rounded-2xl hover:bg-emerald-600 font-black text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95"
                                    >
                                        Book
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CropsAvailability;
