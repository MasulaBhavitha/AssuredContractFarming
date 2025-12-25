import React from 'react';
import { Shield, CheckCircle, FileText, AlertTriangle } from 'lucide-react';

const SafetyProtocols = () => {
    return (
        <div className="min-h-screen bg-[#f8faf9] py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-xl">
                        <Shield size={32} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-1">Guidelines</p>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">Safety <span className="text-emerald-600 not-italic">Protocols</span></h1>
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-emerald-900/5 border border-gray-100 mb-8">
                    <p className="text-lg text-gray-600 mb-10 leading-relaxed font-medium">
                        At AgriSecure, safety and quality are our top priorities. We implement rigorous protocols to ensure that every contract is fulfilled to the highest standards of agricultural excellence.
                    </p>

                    <div className="grid gap-8">
                        {[
                            { title: 'Soil Quality Testing', icon: FileText, desc: 'Every farm in our network undergoes mandatory soil health assessment before contract initiation.' },
                            { title: 'Organic Certification', icon: CheckCircle, desc: 'We verify and maintain digital ledgers for all organic and non-GMO certifications.' },
                            { title: 'Pest Management', icon: AlertTriangle, desc: 'Integrated pest management strategies must be followed to ensure crop safety and yield stability.' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 p-6 rounded-[2rem] bg-emerald-50/50 border border-emerald-100">
                                <div className="bg-white p-4 rounded-2xl text-emerald-600 shadow-sm h-fit">
                                    <item.icon size={24} />
                                </div>
                                <div>
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

export default SafetyProtocols;
