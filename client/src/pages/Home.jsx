import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, TrendingUp, Shield } from 'lucide-react';
// "https://images.unsplash.com/photo-1625246333195-09d9d48b3275?q=80&w=1920&auto=format&fit=crop"

const Home = () => {
    return (
        <div className="space-y-0">
            {/* Hero Section */}
            <section className="relative bg-emerald-900 text-white rounded-3xl overflow-hidden mx-4 my-8 min-h-[500px] flex items-center">
                <div className="absolute inset-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-40"
                    >
                        <source src="https://videos.pexels.com/video-files/5565171/5565171-hd_1920_1080_25fps.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="relative container mx-auto px-4 text-center space-y-6 z-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                        Secure Contracts.<br />
                        <span className="text-emerald-400">Harvest Success.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light">
                        The modern platform connecting ambitious farmers with reliable buyers. Guaranteed prices, transparent deals, and timely payments.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                        <Link to="/register" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition transform hover:-translate-y-1 shadow-xl">
                            Start Farming Now
                        </Link>
                        <Link to="/about" className="bg-white/10 backdrop-blur-md border hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition">
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats / Trust Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-3xl font-bold text-emerald-800 mb-2">500+</div>
                        <div className="text-gray-600">Active Farmers</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-emerald-800 mb-2">₹2Cr+</div>
                        <div className="text-gray-600">Transactions</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-emerald-800 mb-2">100%</div>
                        <div className="text-gray-600">Payment Safety</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-emerald-800 mb-2">24/7</div>
                        <div className="text-gray-600">Support</div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-12 px-4 max-w-7xl mx-auto bg-emerald-800">
                <div className="text-center mb-10">
                    <h2 className="text-xl font-bold text-white mb-4">Why Choose AgriSecure?</h2>
                    <p className="text-emerald-100 max-w-2xl mx-auto">We eliminate uncertainty from agriculture by building secure, digital bridges between producers and consumers.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 group">
                        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Guaranteed Prices</h3>
                        <p className="text-gray-600 leading-relaxed">Lock in your selling price before you even plant seeds. We ensure you get the market value you deserve without the fluctuations.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 group">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                            <TrendingUp className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Direct Market Access</h3>
                        <p className="text-gray-600 leading-relaxed">Connect directly with verified industrial buyers and retailers. No middlemen, no commissions, just maximum profit.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 group">
                        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Secure Payments</h3>
                        <p className="text-gray-600 leading-relaxed">Our escrow-like digital contract system ensures that funds are secured and payments are released immediately upon delivery.</p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-emerald-50 py-12 px-8 rounded-3xl mx-4 mb-12">
                <h2 className="text-xl font-bold text-center mb-10 text-emerald-900">Simple 4-Step Process</h2>
                <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-emerald-200 z-0 transform -translate-y-1/2"></div>

                    {[
                        { step: 1, title: 'Register', desc: 'Join as a Farmer or Buyer in seconds.' },
                        { step: 2, title: 'Contract', desc: 'Browse or create farming contracts.' },
                        { step: 3, title: 'Accept', desc: 'Agree on terms and lock the price.' },
                        { step: 4, title: 'Grow & Earn', desc: 'Deliver produce and receive payment.' }
                    ].map((item, index) => (
                        <div key={index} className="relative z-10 bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
                            <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow-lg border-4 border-white">
                                {item.step}
                            </div>
                            <h4 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
