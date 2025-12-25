import React from 'react';
import { Calendar, DollarSign, Package, CheckCircle, Clock } from 'lucide-react';

const ContractCard = ({ contract, userRole, onAccept }) => {
    const { cropName, quantity, pricePerUnit, duration, status, buyer } = contract;

    const statusColors = {
        open: 'bg-blue-100 text-blue-800',
        accepted: 'bg-yellow-100 text-yellow-800',
        completed: 'bg-green-100 text-green-800'
    };

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{cropName}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusColors[status] || 'bg-gray-100'}`}>
                    {status}
                </span>
            </div>

            <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                    <Package size={18} className="text-emerald-500" />
                    <span>Quantity: <span className="font-semibold text-gray-800">{quantity} kg</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <DollarSign size={18} className="text-emerald-500" />
                    <span>Price: <span className="font-semibold text-gray-800">₹{pricePerUnit}/kg</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-emerald-500" />
                    <span>Duration: <span className="font-semibold text-gray-800">{duration}</span></span>
                </div>
                {status === 'accepted' && (
                    <div className="flex items-center gap-2 text-yellow-600">
                        <Clock size={18} />
                        <span>In Progress</span>
                    </div>
                )}
                {status === 'completed' && (
                    <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle size={18} />
                        <span>Completed</span>
                    </div>
                )}
            </div>

            {userRole === 'farmer' && status === 'open' && (
                <button
                    onClick={() => onAccept(contract._id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg transition"
                >
                    Accept Contract
                </button>
            )}
            {userRole === 'buyer' && status === 'open' && (
                <div className="text-center text-sm text-gray-500 italic border-t pt-3">
                    Waiting for farmer...
                </div>
            )}
        </div>
    );
};

export default ContractCard;
