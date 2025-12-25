// import React, { useState, useEffect } from 'react';
// import { useLocation, useSearchParams } from 'react-router-dom';
// import api from '../utils/api';
// import { Loader2 } from 'lucide-react';

// const Payment = () => {
//     const location = useLocation();
//     const [searchParams] = useSearchParams(); // To handle return from PhonePe
//     const [amount, setAmount] = useState('');
//     const [description, setDescription] = useState('');
//     const [processing, setProcessing] = useState(false);
//     const [transactions, setTransactions] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Check specific transaction status if returning from payment
//     useEffect(() => {
//         const txnId = searchParams.get('txnId');
//         if (txnId) {
//             verifyTransaction(txnId);
//         }
//     }, [searchParams]);

//     const verifyTransaction = async (txnId) => {
//         try {
//             const res = await api.get(`/payments/status/${txnId}`);
//             if (res.data.status === 'paid') {
//                 alert('Payment Successful!');
//             } else {
//                 alert('Payment Pending or Failed.');
//             }
//         } catch (err) {
//             console.error(err);
//         }
//         // Removing param from url for cleanliness (optional)
//         window.history.replaceState({}, document.title, "/payment");
//         fetchTransactions(); // Refresh list to show new status
//     };

//     // Pre-fill from navigation state (Crops Availability)
//     useEffect(() => {
//         if (location.state?.crop) {
//             const crop = location.state.crop;
//             // Extract numeric value from price string (e.g., "₹28,000/ton" -> 28000)
//             const priceString = crop.price.replace(/[^0-9]/g, '');
//             // This is a naive extraction, assuming user pays full price or just a booking fee.
//             // For now let's just pre-fill description.
//             setDescription(`Booking Advance for ${crop.name}`);
//         }
//         fetchTransactions();
//     }, [location.state]);

//     const fetchTransactions = async () => {
//         try {
//             const res = await api.get('/payments');
//             setTransactions(res.data);
//         } catch (err) {
//             console.error('Error fetching transactions:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const loadScript = (src) => {
//         return new Promise((resolve) => {
//             const script = document.createElement('script');
//             script.src = src;
//             script.onload = () => {
//                 resolve(true);
//             };
//             script.onerror = () => {
//                 resolve(false);
//             };
//             document.body.appendChild(script);
//         });
//     };

//     const handlePayment = async (e) => {
//         e.preventDefault();
//         setProcessing(true);

//         try {
//             // Initiate PhonePe Payment
//             const res = await api.post('/payments/initiate', {
//                 amount,
//                 description: description || 'General Payment'
//             });

//             if (res.data.url) {
//                 // Redirect user to PhonePe securely
//                 window.location.href = res.data.url;
//             } else {
//                 alert("Failed to initiate payment. Try again.");
//                 setProcessing(false);
//             }

//         } catch (err) {
//             console.error("PhonePe Error:", err);
//             // Fallback for demo if backend is not reachable or keys invalid
//             // alert('PhonePe initiation failed. Using offline mock mode.');
//             // ... (Mock logic can be kept if needed, but for "Real" payment request we usually error out)
//             setProcessing(false);
//             alert("Payment initiation failed on server. Please check console.");
//         }
//     };

//     if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-emerald-600" size={40} /></div>;

//     return (
//         <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-8">Payments & Finance</h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {/* Make a Payment Section */}
//                 <div className="bg-white shadow rounded-lg p-6">
//                     <h2 className="text-xl font-semibold mb-4">Make a Payment</h2>
//                     <form onSubmit={handlePayment}>
//                         <div className="mb-4">
//                             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Payment For</label>
//                             <input
//                                 type="text"
//                                 id="description"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
//                                 placeholder="e.g. Advance for Wheat"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
//                             <input
//                                 type="number"
//                                 id="amount"
//                                 value={amount}
//                                 onChange={(e) => setAmount(e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
//                                 placeholder="0.00"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-6">
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
//                             <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500">
//                                 <option>Bank Transfer</option>
//                                 <option>Credit/Debit Card</option>
//                                 <option>Digital Wallet</option>
//                             </select>
//                         </div>
//                         <button
//                             type="submit"
//                             disabled={processing}
//                             className={`w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         >
//                             {processing ? 'Processing...' : 'Pay Now'}
//                         </button>
//                     </form>
//                 </div>

//                 {/* Transaction History Section */}
//                 <div className="bg-white shadow rounded-lg p-6">
//                     <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                                     <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//                                     <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                                     <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {transactions.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="4" className="px-3 py-4 text-center text-sm text-gray-500">No transactions found.</td>
//                                     </tr>
//                                 ) : (
//                                     transactions.map((tx) => (
//                                         <tr key={tx._id}>
//                                             <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 {new Date(tx.createdAt).toLocaleDateString()}
//                                             </td>
//                                             <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{tx.description}</td>
//                                             <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{tx.amount}</td>
//                                             <td className="px-3 py-4 whitespace-nowrap text-sm">
//                                                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tx.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                                                     {tx.status}
//                                                 </span>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Payment;
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';
import {
    Loader2, CheckCircle, CreditCard, History, ShieldCheck,
    ArrowRight, Wallet, Smartphone, Banknote, Bell, X, Info,
    QrCode, ExternalLink, Shield, Building, Globe, Copy, Check
} from 'lucide-react';

const Payment = () => {
    const location = useLocation();

    // Core States
    const [amount, setAmount] = useState('1000');
    const [description, setDescription] = useState('Crop Advance Payment');
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Payment UI States
    const [activeMethod, setActiveMethod] = useState('upi'); // upi, card, netbanking, wallet
    const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success
    const [processingProgress, setProcessingProgress] = useState(0);

    // UPI Data
    const [vpa, setVpa] = useState('8872309128@paytm');
    const [utr, setUtr] = useState('');
    const [copied, setCopied] = useState(false);

    const defaultQrPath = "/assets/scanner.jpg"; // Updated to actual file name

    // Notification State
    const [showNotification, setShowNotification] = useState(false);
    const [lastTxn, setLastTxn] = useState(null);

    useEffect(() => {
        if (location.state) {
            if (location.state.crop) setDescription(`Advance for ${location.state.crop.name}`);
            if (location.state.amount) setAmount(location.state.amount.toString());
        }
        fetchTransactions();
    }, [location.state]);

    const fetchTransactions = async () => {
        try {
            const res = await api.get('/payments');
            setTransactions(res.data);
        } catch (err) {
            console.error('Error fetching transactions:', err);
        } finally {
            setLoading(false);
        }
    };

    const copyVpa = () => {
        navigator.clipboard.writeText(vpa);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePaymentSubmit = async () => {
        setPaymentStatus('processing');
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setProcessingProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                finalizePayment();
            }
        }, 100);
    };

    const finalizePayment = async () => {
        try {
            const res = await api.post('/payments/mock-initiate', {
                amount,
                description: `${activeMethod.toUpperCase()}: ${description}`
            });

            if (res.data.success) {
                setLastTxn(res.data.payment);
                setPaymentStatus('success');
                fetchTransactions();

                setTimeout(() => {
                    setShowNotification(true);
                    setTimeout(() => setShowNotification(false), 6000);
                }, 500);
            }
        } catch (err) {
            console.error(err);
            setPaymentStatus('idle');
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-[#f8faf9]">
            <div className="relative">
                <Loader2 className="animate-spin text-emerald-600" size={64} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="text-emerald-500/20" size={32} />
                </div>
            </div>
            <p className="mt-6 text-emerald-900 font-bold uppercase tracking-widest text-xs animate-pulse">Initializing Secure Ledger</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8faf9] py-8 px-4 sm:px-6 lg:px-8">

            {/* ALERT NOTIFICATION */}
            <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4 transition-all duration-700 transform ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0'}`}>
                <div className="bg-emerald-900 shadow-[0_30px_60px_rgba(5,150,105,0.4)] text-white p-6 rounded-[2.5rem] border border-emerald-400/30 flex items-center gap-5 backdrop-blur-xl">
                    <div className="bg-emerald-500 h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/50">
                        <Smartphone size={24} />
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-1">Payment Received</p>
                        <p className="text-sm font-bold">₹{lastTxn?.amount} Cleared</p>
                        <p className="text-[10px] opacity-50 font-mono mt-1">Ref: {lastTxn?.transactionId?.slice(-8)}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Header Branding */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-lg shadow-emerald-200">
                                <ShieldCheck size={28} />
                            </div>
                            <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase">Agri<span className="text-emerald-600">Secure</span> Pay</h1>
                        </div>
                        <p className="text-gray-500 font-medium max-w-md">Professional settlement gateway for guaranteed agricultural contracts.</p>
                    </div>
                    <div className="flex items-center gap-6 bg-white px-8 py-5 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Order Value</p>
                            <p className="text-2xl font-black text-emerald-600 leading-none">₹{parseFloat(amount).toLocaleString()}</p>
                        </div>
                        <div className="h-10 w-px bg-gray-100"></div>
                        <Info size={24} className="text-gray-200" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Side: Payment Options Sidebar */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 overflow-hidden">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 ml-2">Payment Channels</p>

                            <div className="space-y-2">
                                <button
                                    onClick={() => setActiveMethod('upi')}
                                    className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 group ${activeMethod === 'upi' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200' : 'hover:bg-emerald-50 text-gray-500'}`}
                                >
                                    <div className={`p-2.5 rounded-xl transition-colors ${activeMethod === 'upi' ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-white'}`}>
                                        <Smartphone size={22} />
                                    </div>
                                    <div className="text-left flex-1 font-bold tracking-tight">Direct UPI Transfer</div>
                                    {activeMethod === 'upi' && <ArrowRight size={18} className="animate-pulse" />}
                                </button>

                                <button
                                    onClick={() => setActiveMethod('card')}
                                    className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 group ${activeMethod === 'card' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200' : 'hover:bg-emerald-50 text-gray-500'}`}
                                >
                                    <div className={`p-2.5 rounded-xl transition-colors ${activeMethod === 'card' ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-white'}`}>
                                        <CreditCard size={22} />
                                    </div>
                                    <div className="text-left flex-1 font-bold tracking-tight">Card Networks</div>
                                    {activeMethod === 'card' && <ArrowRight size={18} />}
                                </button>

                                <button
                                    onClick={() => setActiveMethod('netbanking')}
                                    className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 group ${activeMethod === 'netbanking' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200' : 'hover:bg-emerald-50 text-gray-500'}`}
                                >
                                    <div className={`p-2.5 rounded-xl transition-colors ${activeMethod === 'netbanking' ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-white'}`}>
                                        <Building size={22} />
                                    </div>
                                    <div className="text-left flex-1 font-bold tracking-tight">Net Banking</div>
                                    {activeMethod === 'netbanking' && <ArrowRight size={18} />}
                                </button>

                                <button
                                    onClick={() => setActiveMethod('wallet')}
                                    className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 group ${activeMethod === 'wallet' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200' : 'hover:bg-emerald-50 text-gray-500'}`}
                                >
                                    <div className={`p-2.5 rounded-xl transition-colors ${activeMethod === 'wallet' ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-white'}`}>
                                        <Wallet size={22} />
                                    </div>
                                    <div className="text-left flex-1 font-bold tracking-tight">Digital Wallets</div>
                                    {activeMethod === 'wallet' && <ArrowRight size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Security Badge */}
                        <div className="bg-emerald-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                            <Shield className="absolute -right-8 -bottom-8 w-32 h-32 text-white/5 group-hover:scale-125 transition-transform duration-700" />
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-4">Security Protocol</p>
                            <h4 className="text-lg font-black mb-4 tracking-tight leading-tight uppercase">ISO 27001 Certified Gateway</h4>
                            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                                <ShieldCheck size={16} /> 256-Bit SSL Encrypted
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Main Payment Area */}
                    <div className="lg:col-span-8 min-h-[600px] flex flex-col">
                        <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-100 flex-1 overflow-hidden relative">

                            {/* Processing Overlay */}
                            {paymentStatus === 'processing' && (
                                <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-12">
                                    <div className="relative h-48 w-48 flex items-center justify-center mb-10">
                                        <div className="absolute inset-0 border-8 border-gray-50 rounded-full"></div>
                                        <div className="absolute inset-0 border-8 border-emerald-600 rounded-full border-t-transparent animate-spin"></div>
                                        <div className="text-2xl font-black text-emerald-900">{processingProgress}%</div>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase mb-4 italic">Verifying <span className="text-emerald-600 not-italic">Ledger</span></h3>
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Authenticating transfer with settlement bank...</p>
                                </div>
                            )}

                            {/* Success Overlay */}
                            {paymentStatus === 'success' && (
                                <div className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center text-center p-12 animate-fade-in-up">
                                    <div className="h-32 w-32 bg-emerald-100 rounded-[3rem] flex items-center justify-center text-emerald-600 mb-10 shadow-2xl shadow-emerald-200 animate-bounce">
                                        <CheckCircle size={64} strokeWidth={3} />
                                    </div>
                                    <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic leading-none mb-6">Payment <br /><span className="text-emerald-600 not-italic">Authorized</span></h3>
                                    <div className="bg-emerald-50 py-4 px-10 rounded-2xl border border-emerald-100 mb-10">
                                        <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-1 opacity-50">Transaction Token</p>
                                        <p className="text-xl font-bold font-mono text-emerald-900 tracking-tighter">{lastTxn?.transactionId}</p>
                                    </div>
                                    <button
                                        onClick={() => setPaymentStatus('idle')}
                                        className="px-12 py-5 bg-black text-white rounded-2xl font-black text-lg hover:shadow-2xl transition-all"
                                    >
                                        Back to Network
                                    </button>
                                </div>
                            )}

                            {/* Main Content Sections */}
                            <div className="p-8 md:p-10">
                                {activeMethod === 'upi' && (
                                    <div className="animate-fade-in">
                                        <div className="flex flex-col md:flex-row items-center gap-12">
                                            {/* CENTERED SCANNER */}
                                            <div className="flex-shrink-0 relative">
                                                <div className="absolute inset-0 bg-emerald-500/10 blur-[80px] rounded-full"></div>
                                                <div className="relative p-8 bg-white rounded-[3.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.08)] border-2 border-emerald-50">
                                                    <div className="relative overflow-hidden group">
                                                        <img
                                                            src={defaultQrPath}
                                                            alt="Payment QR"
                                                            className="w-56 h-56 object-contain rounded-2xl"
                                                            onError={(e) => {
                                                                e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + encodeURIComponent(`upi://pay?pa=${vpa}&am=${amount}`);
                                                            }}
                                                        />
                                                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/30 animate-scan"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-1 space-y-8">
                                                <div>
                                                    <h3 className="text-xl font-black text-gray-900 tracking-tighter uppercase mb-2">Scan to Settle</h3>
                                                    <p className="text-gray-400 font-medium">Use any mobile banking or UPI app to authorize this transaction.</p>
                                                </div>

                                                <div className="bg-gray-50 rounded-3xl p-6">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Receiver Identity</p>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-lg font-black text-gray-800 font-mono italic">{vpa}</p>
                                                        <button
                                                            onClick={copyVpa}
                                                            className="p-3 bg-white hover:bg-emerald-600 hover:text-white rounded-xl transition-all shadow-sm border border-gray-100"
                                                        >
                                                            {copied ? <Check size={18} /> : <Copy size={18} />}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-2">Verification Code (UTR)</label>
                                                    <input
                                                        type="text"
                                                        value={utr}
                                                        onChange={(e) => setUtr(e.target.value)}
                                                        placeholder="Enter 12-digit UPI Referral ID"
                                                        className="w-full px-8 py-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-emerald-500/10 font-black text-center text-lg"
                                                    />
                                                </div>

                                                <button
                                                    onClick={handlePaymentSubmit}
                                                    disabled={!utr}
                                                    className={`w-full py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 transition-all shadow-2xl ${utr ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none'}`}
                                                >
                                                    <span>Mark as Paid</span>
                                                    <CheckCircle size={26} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeMethod === 'card' && (
                                    <div className="animate-fade-in max-w-lg mx-auto space-y-8 py-8">
                                        <div className="text-center mb-10">
                                            <h3 className="text-xl font-black text-gray-900 tracking-tighter uppercase">Card Authorization</h3>
                                            <p className="text-gray-400 font-medium">Safe & Encrypted PCI-DSS Compliant Flow</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-3">Account Reference</label>
                                                <div className="relative">
                                                    <input type="text" placeholder="Card Number (#### #### #### ####)" className="w-full px-8 py-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-emerald-500/10 font-black tracking-widest text-lg" />
                                                    <CreditCard size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-3">Validity</label>
                                                    <input type="text" placeholder="MM/YY" className="w-full px-8 py-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-emerald-500/10 font-black text-lg" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-3">Security Key</label>
                                                    <input type="password" placeholder="***" className="w-full px-8 py-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-emerald-500/10 font-black text-lg" />
                                                </div>
                                            </div>

                                            <button
                                                onClick={handlePaymentSubmit}
                                                className="w-full py-6 bg-black text-white rounded-[2rem] font-black text-xl hover:bg-emerald-600 transition-all shadow-2xl active:scale-95 mt-4"
                                            >
                                                <span>Authorize ₹{amount}</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeMethod === 'netbanking' && (
                                    <div className="animate-fade-in space-y-10">
                                        <div className="text-center">
                                            <h3 className="text-xl font-black text-gray-900 tracking-tighter uppercase">Select Bank</h3>
                                            <p className="text-gray-400 font-medium tracking-tight">Direct connectivity with major financial institutions</p>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {['State Bank', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak', 'Others'].map((bank) => (
                                                <button
                                                    key={bank}
                                                    onClick={handlePaymentSubmit}
                                                    className="p-8 bg-white border border-gray-100 rounded-3xl hover:border-emerald-600 hover:shadow-xl hover:shadow-emerald-50 transition-all text-center group"
                                                >
                                                    <Building size={32} className="mx-auto text-gray-300 mb-3 group-hover:text-emerald-600" />
                                                    <div className="font-black text-gray-800 text-sm uppercase tracking-tight">{bank}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeMethod === 'wallet' && (
                                    <div className="animate-fade-in space-y-10">
                                        <div className="text-center">
                                            <h3 className="text-xl font-black text-gray-900 tracking-tighter uppercase">Mobile Wallets</h3>
                                            <p className="text-gray-400 font-medium tracking-tight">Fast 1-click checkout with your digital wallet</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
                                            {['Google Pay', 'PhonePe', 'Paytm', 'Amazon Pay'].map((wallet) => (
                                                <button
                                                    key={wallet}
                                                    onClick={handlePaymentSubmit}
                                                    className="p-6 bg-gray-50 border border-transparent rounded-[2rem] hover:bg-white hover:border-emerald-600 hover:shadow-xl transition-all flex items-center gap-5"
                                                >
                                                    <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                                                        <Wallet size={24} />
                                                    </div>
                                                    <div className="text-left">
                                                        <div className="font-black text-gray-900 uppercase italic tracking-tight">{wallet}</div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Connect Account</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Transactions Footer */}
                        <div className="mt-6 bg-emerald-100/50 rounded-[2.5rem] p-6 md:p-8 border border-emerald-100">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <History size={22} className="text-emerald-800" />
                                    <h5 className="text-base font-black text-emerald-950 uppercase tracking-tight italic leading-none">Journal <span className="text-emerald-600 not-italic">Records</span></h5>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[10px] font-black text-emerald-800 uppercase tracking-widest shadow-sm">
                                    <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping"></div>
                                    Live sync
                                </div>
                            </div>

                            <div className="space-y-4">
                                {transactions.slice(0, 3).map((tx) => (
                                    <div key={tx._id} className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl flex items-center justify-between group hover:shadow-xl transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 font-bold shadow-sm">
                                                ₹
                                            </div>
                                            <div>
                                                <div className="font-black text-gray-900 text-sm tracking-tight uppercase leading-none mb-1">{tx.description}</div>
                                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date(tx.createdAt).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-black text-emerald-600">₹{tx.amount}</div>
                                            <div className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em]">SUCCESS</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
                @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
                @keyframes scan { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }
                .animate-fade-in { animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-scan { animation: scan 3s linear infinite; }
            `}} />
        </div>
    );
};

export default Payment;
