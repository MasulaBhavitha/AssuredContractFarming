import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-[#f8faf9] py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-4">Connect Hub</p>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic mb-6">Contact <span className="text-emerald-600 not-italic">AgriSecure</span></h1>
                    <p className="text-gray-500 font-bold max-w-2xl mx-auto uppercase tracking-wide text-sm">Our global support team is ready to assist you in securing your agricultural future.</p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-4 space-y-6">
                        {[
                            { icon: Mail, label: 'Email Us', val: 'support@agrisecure.com', color: 'bg-blue-600' },
                            { icon: Phone, label: 'Toll Free', val: '1800-FARM-SECURE', color: 'bg-emerald-600' },
                            { icon: MapPin, label: 'Headquarters', val: '123 AgriTech Valley, New Delhi', color: 'bg-emerald-950' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-6 group hover:translate-x-2 transition-transform duration-500">
                                <div className={`${item.color} p-4 rounded-2xl text-white shadow-lg`}>
                                    <item.icon size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                                    <p className="font-bold text-gray-900">{item.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-8">
                        <form className="bg-white p-12 rounded-[3.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.05)] border border-gray-100 space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Full Identity</label>
                                    <input type="text" placeholder="Your Name" className="w-full px-8 py-5 bg-gray-50 border-none rounded-[2rem] focus:ring-4 focus:ring-emerald-500/10 font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                                    <input type="email" placeholder="name@company.com" className="w-full px-8 py-5 bg-gray-50 border-none rounded-[2rem] focus:ring-4 focus:ring-emerald-500/10 font-bold" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Subject of Inquiry</label>
                                <input type="text" placeholder="e.g. Contract Verification" className="w-full px-8 py-5 bg-gray-50 border-none rounded-[2rem] focus:ring-4 focus:ring-emerald-500/10 font-bold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Detailed Message</label>
                                <textarea rows="5" placeholder="How can we help you today?" className="w-full px-8 py-5 bg-gray-50 border-none rounded-[2.5rem] focus:ring-4 focus:ring-emerald-500/10 font-bold"></textarea>
                            </div>
                            <button className="w-full py-6 bg-emerald-600 text-white rounded-[2.5rem] font-black text-xl hover:bg-emerald-700 transition-all shadow-2xl flex items-center justify-center gap-4 group">
                                <span>Transmit Message</span>
                                <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
