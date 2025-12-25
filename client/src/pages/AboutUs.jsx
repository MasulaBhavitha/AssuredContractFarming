import { Shield, TrendingUp } from 'lucide-react';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-[#f8faf9] py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full text-emerald-800 text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-sm">
                        <Shield size={16} /> Verified Platform
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase italic leading-none mb-4">
                        About <span className="text-emerald-600 not-italic tracking-normal">Platform</span>
                    </h1>
                    <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        AgriSecure is the world's first decentralized agricultural gateway that guarantees transparency, safety, and prosperity for the global farming community.
                    </p>
                </div>

                {/* Content Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-emerald-900 text-white p-6 rounded-[4rem] shadow-2xl relative overflow-hidden group">
                        <TrendingUp className="absolute -right-10 -bottom-10 h-64 w-64 text-white/5 group-hover:scale-110 transition-transform duration-700" />
                        <h2 className="text-2xl font-black mb-3 tracking-tighter uppercase italic">Our <span className="text-emerald-500 not-italic">Mission</span></h2>
                        <p className="text-emerald-100/70 text-lg leading-relaxed font-medium">
                            To eliminate market volatility by creating an immutable bridge between earth's producers and industrial consumers. We ensure that every seed planted has a guaranteed home.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-[4rem] shadow-xl border border-gray-100 relative overflow-hidden group">
                        <Shield className="absolute -right-10 -bottom-10 h-64 w-64 text-emerald-500/5 group-hover:scale-110 transition-transform duration-700" />
                        <h2 className="text-2xl font-black text-emerald-950 mb-3 tracking-tighter uppercase italic">Our <span className="text-emerald-600 not-italic">Vision</span></h2>
                        <p className="text-gray-500 text-lg leading-relaxed font-medium">
                            A global standard for agricultural trade where technology empowers the smallest farms to compete at a global scale with total financial security.
                        </p>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="bg-white rounded-[5rem] p-6 shadow-2xl shadow-emerald-900/5 border border-gray-50">
                    <h2 className="text-xl font-black text-center text-emerald-950 mb-6 uppercase italic tracking-tight">The AgriSecure <span className="text-emerald-600 not-italic">Edge</span></h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'Smart Contracts', desc: 'Secure agreements locked before planting.', color: 'text-blue-600' },
                            { title: 'Zero Middlemen', desc: 'Direct trade means maximum profit for you.', color: 'text-emerald-600' },
                            { title: 'Real-time Data', desc: 'Market prices and inventory at your fingertips.', color: 'text-orange-600' },
                            { title: 'Rapid Payouts', desc: 'Automated settlements within 24 hours.', color: 'text-purple-600' }
                        ].map((item, i) => (
                            <div key={i} className="text-center space-y-2">
                                <div className={`text-3xl font-black ${item.color} tabular-nums italic`}>0{i + 1}</div>
                                <h4 className="font-black text-gray-900 uppercase tracking-tight text-lg">{item.title}</h4>
                                <p className="text-sm text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
