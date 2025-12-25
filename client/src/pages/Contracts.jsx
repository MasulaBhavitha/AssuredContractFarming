import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Contracts = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [selectedContract, setSelectedContract] = useState(null);
    const [applying, setApplying] = useState(false);
    const [applicationData, setApplicationData] = useState({
        area: '',
        experience: '',
        equipment: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleApplySubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => {
                setApplying(false);
                setSelectedContract(null);
                setIsSubmitted(false);
            }, 3000);
        }, 1500);
    };

    const contracts = [
        {
            id: 1,
            crop: 'Wheat (High Yield)',
            buyer: 'AgroCorp Industries',
            area: '50 Acres',
            price: '₹2,200/quintal',
            duration: '6 Months',
            status: 'available',
            image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400',
            description: 'Looking for farmers with irrigation facilities for high-yield wheat variety.'
        },
        {
            id: 2,
            crop: 'Organic Maize',
            buyer: 'GreenEarth Foods',
            area: '25 Acres',
            price: '₹1,950/quintal',
            duration: '4 Months',
            status: 'available',
            image: '/assets/contracts/organic-maize.jpg',
            description: 'Contract for certified organic maize. Non-GMO seeds provided.'
        },
        {
            id: 3,
            crop: 'Soybean',
            buyer: 'NutriSoya Ltd',
            area: '100 Acres',
            price: '₹4,100/quintal',
            duration: '5 Months',
            status: 'applied',
            image: '/assets/contracts/soyabean.jpg',
            description: 'Large scale soybean cultivation contract with assured buyback.'
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8faf9] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-3">Market Opportunity: Open</p>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase italic leading-none mb-4">
                        Open <span className="text-emerald-600 not-italic tracking-normal">Contracts</span>
                    </h1>
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Secure your future harvest with legally binding smart contracts. Browse open solicitations from verified industrial buyers and institution partners.
                    </p>
                </div>

                <div className="grid gap-4">
                    {contracts.map((contract) => (
                        <div key={contract.id} className="bg-white p-3 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row gap-4">
                            <img src={contract.image} className="w-full md:w-40 h-40 object-cover rounded-[2rem] shadow-lg" alt={contract.crop} />
                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-black text-emerald-900 tracking-tighter uppercase italic">{contract.crop}</h3>
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${contract.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {contract.status}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                                        <div className="bg-emerald-50/50 p-2 rounded-2xl">
                                            <p className="text-[9px] font-black text-emerald-800/40 uppercase tracking-widest mb-1">Buyer</p>
                                            <p className="text-sm font-bold text-emerald-900">{contract.buyer}</p>
                                        </div>
                                        <div className="bg-gray-50 p-2 rounded-2xl">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Area</p>
                                            <p className="text-sm font-bold text-gray-800">{contract.area}</p>
                                        </div>
                                        <div className="bg-gray-50 p-2 rounded-2xl">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Price</p>
                                            <p className="text-sm font-bold text-emerald-600">{contract.price}</p>
                                        </div>
                                        <div className="bg-gray-50 p-2 rounded-2xl">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Duration</p>
                                            <p className="text-sm font-bold text-gray-800">{contract.duration}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-3 md:mt-0">
                                    <button
                                        onClick={() => setSelectedContract(contract)}
                                        className="bg-black text-white px-8 py-3 rounded-2xl hover:bg-emerald-600 font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg flex items-center gap-3"
                                    >
                                        <span>Details</span>
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedContract && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-xl font-bold text-emerald-900">Contract Details</h2>
                                <button onClick={() => setSelectedContract(null)} className="text-gray-500 hover:text-gray-700">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div><strong>Crop:</strong> {selectedContract.crop}</div>
                                    <div><strong>Buyer:</strong> {selectedContract.buyer}</div>
                                    <div><strong>Area:</strong> {selectedContract.area}</div>
                                    <div><strong>Price:</strong> {selectedContract.price}</div>
                                    <div><strong>Duration:</strong> {selectedContract.duration}</div>
                                    <div><strong>Status:</strong> {selectedContract.status}</div>
                                </div>

                                <div className="bg-emerald-50 p-4 rounded-lg">
                                    <h3 className="font-bold mb-2 text-emerald-900">Contract Terms</h3>
                                    <ul className="text-sm space-y-1 text-gray-700">
                                        <li>• Quality standards as per industry norms</li>
                                        <li>• Payment within 7 days of delivery verification</li>
                                        <li>• Technical support provided by buyer</li>
                                        <li>• Insurance coverage included</li>
                                    </ul>
                                </div>
                            </div>

                            {!isAuthenticated ? (
                                <button onClick={() => navigate('/login')} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl uppercase tracking-widest">
                                    Login to Apply
                                </button>
                            ) : (
                                <button
                                    onClick={() => setApplying(true)}
                                    className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl uppercase tracking-widest"
                                >
                                    Apply for Contract
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {applying && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
                        <div className="bg-white rounded-[3rem] p-10 max-w-2xl w-full shadow-2xl relative overflow-hidden">
                            {isSubmitting && (
                                <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center">
                                    <div className="h-20 w-20 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-6"></div>
                                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Processing Application</h3>
                                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">Uploading credentials to AgriSecure network...</p>
                                </div>
                            )}

                            {isSubmitted && (
                                <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center animate-fade-in">
                                    <div className="h-24 w-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 animate-bounce">
                                        <ChevronRight size={48} className="rotate-[-45deg]" strokeWidth={4} />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-4 italic">Submission <br /><span className="text-emerald-600 not-italic">Successful</span></h3>
                                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Your application is being reviewed by {selectedContract.buyer}.</p>
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1">Step 2: Verification</p>
                                    <h2 className="text-xl font-black text-gray-900 tracking-tighter uppercase italic">Contract <span className="text-emerald-600 not-italic">Application</span></h2>
                                </div>
                                <button onClick={() => setApplying(false)} className="p-2 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-xl transition-all">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleApplySubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Area to Commit (Acres)</label>
                                        <input
                                            required
                                            type="number"
                                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-emerald-500/10 font-bold"
                                            placeholder="e.g. 10"
                                            value={applicationData.area}
                                            onChange={(e) => setApplicationData({ ...applicationData, area: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Exp. in {selectedContract.crop.split(' ')[0]} (Years)</label>
                                        <input
                                            required
                                            type="number"
                                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-emerald-500/10 font-bold"
                                            placeholder="e.g. 5"
                                            value={applicationData.experience}
                                            onChange={(e) => setApplicationData({ ...applicationData, experience: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Available Equipment</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-emerald-500/10 font-bold"
                                        placeholder="Tractor, Harvester, Irrigation Pump..."
                                        value={applicationData.equipment}
                                        onChange={(e) => setApplicationData({ ...applicationData, equipment: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Additional Remarks</label>
                                    <textarea
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-emerald-500/10 font-bold min-h-[100px]"
                                        placeholder="Tell us more about your farming practices..."
                                        value={applicationData.notes}
                                        onChange={(e) => setApplicationData({ ...applicationData, notes: e.target.value })}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-5 bg-black text-white rounded-[2rem] font-black text-xl hover:bg-emerald-600 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 mt-4"
                                >
                                    <span>Submit Application</span>
                                    <ChevronRight size={24} />
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contracts;
