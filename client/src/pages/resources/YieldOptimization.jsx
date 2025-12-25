import React from 'react';
import { TrendingUp, Sprout, CloudRain, Zap } from 'lucide-react';

const YieldOptimization = () => {
    return (
        <div className="min-h-screen bg-[#f8faf9] py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-xl">
                        <TrendingUp size={32} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-1">Resources</p>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">Yield <span className="text-emerald-600 not-italic">Optimization</span></h1>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {[
                        { title: 'Smart Irrigation', icon: CloudRain, val: '+25% Yield', desc: 'Implementing sensor-based irrigation to ensure optimal moisture levels throughout the growth cycle.' },
                        { title: 'Nutrient Timing', icon: Sprout, val: '+15% Growth', desc: 'Precision application of organic fertilizers based on real-time soil analysis data.' },
                    ].map((card, i) => (
                        <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-500">
                            <div>
                                <div className="h-16 w-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 shadow-sm">
                                    <card.icon size={32} />
                                </div>
                                <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-tight italic">{card.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed mb-6">{card.desc}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Zap size={18} className="text-emerald-500 animate-pulse" />
                                <span className="text-lg font-black text-emerald-600 tracking-tighter">{card.val} Potential</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-emerald-950 p-12 rounded-[3.5rem] text-white overflow-hidden relative">
                    <Zap className="absolute -right-10 -bottom-10 h-64 w-64 text-emerald-500/5 rotate-12" />
                    <h3 className="text-2xl font-black mb-6 tracking-tighter uppercase italic">Precision <span className="text-emerald-500 not-italic">Seeding</span></h3>
                    <p className="text-emerald-200/60 font-medium text-lg leading-relaxed max-w-xl">
                        Our technical team provides high-precision seeding machinery recommendations tailored to your specific crop variety and soil density, ensuring maximum germination rates.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default YieldOptimization;
