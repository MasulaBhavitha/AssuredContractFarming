import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import ContractCard from '../components/ContractCard';
import { useAuth } from '../context/AuthContext';
import { Loader2, Plus } from 'lucide-react';

const BuyerDashboard = () => {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const { user } = useAuth();

    // Form State
    const [formData, setFormData] = useState({
        cropName: '',
        quantity: '',
        pricePerUnit: '',
        duration: ''
    });

    const fetchContracts = async () => {
        try {
            const res = await api.get('/contracts');
            setContracts(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContracts();
    }, []);

    const handleCreateContract = async (e) => {
        e.preventDefault();
        try {
            await api.post('/contracts', formData);
            setShowForm(false);
            setFormData({ cropName: '', quantity: '', pricePerUnit: '', duration: '' });
            fetchContracts();
        } catch (err) {
            alert('Error creating contract');
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-emerald-600" size={40} /></div>;

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Buyer Dashboard</h1>
                    <p className="text-gray-600">Create and manage your crop contracts.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold transition shadow-md"
                >
                    <Plus size={20} /> New Contract
                </button>
            </header>

            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 animate-fade-in-down mb-8">
                    <h3 className="text-base font-bold mb-4 text-emerald-800">Create New Contract</h3>
                    <form onSubmit={handleCreateContract} className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Crop Name</label>
                            <input type="text" name="cropName" value={formData.cropName} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Wheat" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (kg)</label>
                            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="1000" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit (₹)</label>
                            <input type="number" name="pricePerUnit" value={formData.pricePerUnit} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="25" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                            <input type="text" name="duration" value={formData.duration} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. 6 Months" />
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md">Create Contract</button>
                        </div>
                    </form>
                </div>
            )}

            {contracts.length === 0 ? (
                <div className="bg-white p-10 rounded-xl text-center shadow-sm">
                    <p className="text-gray-500 text-lg">You haven't created any contracts yet.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contracts.map(contract => (
                        <ContractCard
                            key={contract._id}
                            contract={contract}
                            userRole={user.role}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BuyerDashboard;
