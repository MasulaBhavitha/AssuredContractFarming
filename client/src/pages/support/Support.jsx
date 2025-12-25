import React from 'react';
import { HelpCircle, MessageCircle, ExternalLink, ArrowRight } from 'lucide-react';

const Support = () => {
    return (
        <div className="min-h-screen bg-[#f8faf9] py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-20">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-4">Connect Hub</p>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic mb-6">Support <span className="text-emerald-600 not-italic">Center</span></h1>
                    <div className="max-w-xl mx-auto relative">
                        <input type="text" placeholder="Search for answers..." className="w-full px-10 py-6 bg-white shadow-2xl shadow-gray-200 border border-gray-100 rounded-[2.5rem] font-bold text-lg" />
                        <HelpCircle size={24} className="absolute right-8 top-1/2 -translate-y-1/2 text-emerald-600" />
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {[
                        { title: 'Common Queries', icon: MessageCircle, desc: 'Instant answers to frequently asked questions about contracts and payments.' },
                        { title: 'Live Chat', icon: HelpCircle, desc: 'Connect with a support specialist in real-time (Available 9AM - 6PM IST).' },
                        { title: 'Documentation', icon: ExternalLink, desc: 'Comprehensive guides for farmers and buyers on using the AgriSecure platform.' },
                    ].map((box, i) => (
                        <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all border border-gray-100 group">
                            <div className="h-16 w-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-emerald-600/30">
                                <box.icon size={28} />
                            </div>
                            <h3 className="text-xl font-black text-emerald-950 mb-4 uppercase tracking-tight italic">{box.title}</h3>
                            <p className="text-gray-500 font-medium leading-relaxed mb-8">{box.desc}</p>
                            <button className="flex items-center gap-2 font-black text-emerald-600 uppercase tracking-widest text-[10px] group-hover:gap-4 transition-all">
                                Learn More <ArrowRight size={14} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-[3.5rem] p-12 shadow-xl border border-gray-100 overflow-hidden relative">
                    <div className="absolute top-0 right-0 h-full w-2 bg-emerald-600"></div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic mb-8">Popular <span className="text-emerald-600 not-italic">Topics</span></h3>
                    <div className="space-y-4">
                        {[
                            'How do I verify my farm location?',
                            'What are the payment terms for soybean contracts?',
                            'How to dispute a quality assessment report?',
                            'Updating banking details for settlements',
                        ].map((q, i) => (
                            <div key={i} className="p-6 bg-gray-50 rounded-2xl flex justify-between items-center group cursor-pointer hover:bg-emerald-50 transition-colors">
                                <span className="font-bold text-gray-800">{q}</span>
                                <ArrowRight size={18} className="text-gray-300 group-hover:text-emerald-600 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
