import React from 'react';
import { Database, Lock, Eye, CheckCircle } from 'lucide-react';

const PrivacyLedger = () => {
    return (
        <div className="min-h-screen bg-[#f8faf9] py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-xl">
                        <Lock size={32} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-1">Resources</p>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">Privacy <span className="text-emerald-600 not-italic">Ledger</span></h1>
                    </div>
                </div>

                <div className="bg-emerald-900 rounded-[4rem] p-16 text-white text-center shadow-3xl shadow-emerald-900/40 border border-emerald-400/20 mb-12 overflow-hidden relative">
                    <Database className="absolute -left-20 -top-20 h-80 w-80 text-white/5" />
                    <h2 className="text-3xl font-black tracking-tighter uppercase italic mb-8 leading-none">Immutable <br /> <span className="text-emerald-500 not-italic">Transparency</span></h2>
                    <p className="text-emerald-200/60 font-medium text-lg leading-relaxed max-w-2xl mx-auto">
                        Your data is secured using enterprise-grade encryption and recorded on our private privacy ledger, ensuring that your financial and farm records are only visible to authorized parties.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: 'Zero Sharing', icon: Eye, desc: 'We never sell your data to third-party advertisers.' },
                        { title: 'Encrypted', icon: Lock, desc: 'All PII is encrypted at rest and in transit.' },
                        { title: 'Verified', icon: CheckCircle, desc: 'Full audit logs for every data access event.' },
                    ].map((feature, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-gray-100 text-center">
                            <div className="bg-emerald-50 h-14 w-14 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight italic">{feature.title}</h3>
                            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrivacyLedger;
