import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import ContractCard from '../components/ContractCard';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const FarmerDashboard = () => {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

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

    const handleAccept = async (id) => {
        if (!window.confirm("Are you sure you want to accept this contract?")) return;
        try {
            await api.put(`/contracts/${id}/accept`);
            fetchContracts(); // Refresh list
        } catch (err) {
            alert(err.response?.data?.msg || 'Error accepting contract');
        }
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-emerald-600" size={40} /></div>;

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-xl font-bold text-gray-900">Farmer Dashboard</h1>
                <p className="text-gray-600">Browse available contracts and manage your accepted deals.</p>
            </header>

            {contracts.length === 0 ? (
                <div className="bg-white p-10 rounded-xl text-center shadow-sm">
                    <p className="text-gray-500 text-lg">No contracts available at the moment.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contracts.map(contract => (
                        <ContractCard
                            key={contract._id}
                            contract={contract}
                            userRole={user.role}
                            onAccept={handleAccept}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FarmerDashboard;
