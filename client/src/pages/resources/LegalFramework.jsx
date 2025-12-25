import React from 'react';
import { Gavel, Scale, FileCheck, ShieldAlert } from 'lucide-react';

const LegalFramework = () => {
    return (
        <div className="min-h-screen bg-[#f8faf9] py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-xl">
                        <Scale size={32} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-1">Resources</p>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">Legal <span className="text-emerald-600 not-italic">Framework</span></h1>
                    </div>
                </div>

                <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl shadow-emerald-900/5 border border-gray-100 space-y-12">
                    <p className="text-xl font-medium text-gray-600 leading-relaxed italic border-l-8 border-emerald-500 pl-10">
                        "AgriSecure operates under a transparent, enforceable digital contracting system that protects both the farmer and the buyer, ensuring fair trade and guaranteed settlements."
                    </p>

                    <div className="grid gap-10">
                        {[
                            { title: 'The Farmers Act 2024', icon: Gavel, desc: 'Compliance with federal agricultural laws ensuring the right to fair pricing and open markets.' },
                            { title: 'Smart Contract Law', icon: FileCheck, desc: 'Digital agreements on AgriSecure are legally binding and protected by automated escrow systems.' },
                            { title: 'Dispute Resolution', icon: ShieldAlert, desc: 'A dedicated arbitration committee for rapid, fair conflict resolution without heavy legal costs.' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-8 group">
                                <div className="h-16 w-16 min-w-[4rem] bg-gray-50 rounded-[1.5rem] flex items-center justify-center text-gray-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors duration-500">
                                    <item.icon size={28} />
                                </div>
                                <div className="pt-2">
                                    <h3 className="text-lg font-black text-emerald-900 mb-2 uppercase tracking-tight italic">{item.title}</h3>
                                    <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalFramework;
