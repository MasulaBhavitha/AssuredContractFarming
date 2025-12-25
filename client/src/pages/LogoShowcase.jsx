import React from 'react';
import { Download, Shield, Zap, Globe } from 'lucide-react';

const LogoShowcase = () => {
    return (
        <div className="min-h-screen bg-[#f8faf9] py-24 px-4">
            <div className="max-w-5xl mx-auto text-center">
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-6">Brand Identity System</p>
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase italic mb-16 underline decoration-emerald-500 decoration-8 underline-offset-12">
                    Our <span className="text-emerald-600 not-italic tracking-normal">Signature</span>
                </h1>

                <div className="bg-white rounded-[5rem] p-16 shadow-2xl shadow-emerald-900/5 border border-gray-50 mb-20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative z-10 space-y-12">
                        <div className="flex justify-center">
                            <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-emerald-50 transform group-hover:scale-105 transition-transform duration-700">
                                <img src="/assets/logo/logo.jpeg" className="h-48 md:h-64 w-auto object-contain" alt="AgriSecure Logo" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-black text-emerald-950 uppercase italic tracking-tighter">AgriSecure Global</h2>
                            <p className="text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
                                The official emblem of trust in agricultural contracting. Represents the intersection of earth, documentation, and secure growth.
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6">
                            <button className="bg-black text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl flex items-center gap-3 active:scale-95">
                                <Download size={18} /> Download SVG
                            </button>
                            <button className="bg-emerald-100 text-emerald-800 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-200 transition-all flex items-center gap-3">
                                <Shield size={18} /> Usage Guidelines
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-emerald-900 p-10 rounded-[3rem] text-white">
                        <Zap className="mb-6 text-emerald-400" size={32} />
                        <h4 className="font-black uppercase tracking-tight text-xl mb-4">Precision</h4>
                        <p className="text-emerald-100/60 text-sm font-medium leading-relaxed">Every element of our identity is engineered for clarity and impact across all digital and physical touchpoints.</p>
                    </div>
                    <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
                        <Globe className="mb-6 text-emerald-600" size={32} />
                        <h4 className="font-black uppercase tracking-tight text-xl mb-4 text-emerald-950">Scale</h4>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">A global brand mark designed to resonate with farmers and institutional buyers spanning every continent.</p>
                    </div>
                    <div className="bg-emerald-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-emerald-500/20">
                        <Shield className="mb-6 text-white" size={32} />
                        <h4 className="font-black uppercase tracking-tight text-xl mb-4">Integrity</h4>
                        <p className="text-emerald-50/70 text-sm font-medium leading-relaxed">The AgriSecure mark is a legally protected asset, signifying a verified and secure marketplace for all.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoShowcase;
