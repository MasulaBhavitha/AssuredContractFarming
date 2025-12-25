import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-emerald-950 text-emerald-100 relative overflow-hidden">
            {/* Design patterns */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                    {/* Brand Section */}
                    <div className="md:col-span-12 lg:col-span-5">
                        <Link to="/" className="text-3xl font-black text-white flex items-center gap-3 mb-8 tracking-tighter uppercase italic">
                            <img src="/assets/logo/logo.jpeg" className="h-12 w-auto object-contain rounded-lg shadow-sm" alt="AgriSecure" />
                            Agri<span className="text-emerald-500 not-italic">Secure</span>
                        </Link>
                        <p className="text-emerald-200/60 mb-10 text-lg leading-relaxed max-w-md font-medium">
                            The world's most trusted digital gateway for high-yield, guaranteed agricultural contracts. Connecting farms to global markets through secure blockchain-ready settlements.
                        </p>
                        <div className="flex space-x-5">
                            {[
                                { icon: Facebook, label: 'Facebook' },
                                { icon: Twitter, label: 'Twitter' },
                                { icon: Instagram, label: 'Instagram' },
                                { icon: Linkedin, label: 'LinkedIn' }
                            ].map((social, i) => (
                                <a key={i} href="#" className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-500 border border-white/5 hover:border-emerald-400/30 group">
                                    <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="md:col-span-4 lg:col-span-2">
                        <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-8">Navigation</h3>
                        <ul className="space-y-4 font-bold tracking-tight">
                            <li><Link to="/" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Home</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> About Platform</Link></li>
                            <li><Link to="/crops-availability" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Live Inventory</Link></li>
                            <li><Link to="/contracts" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Open Contracts</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-4 lg:col-span-2">
                        <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-8">Resources</h3>
                        <ul className="space-y-4 font-bold tracking-tight text-emerald-200/60">
                            <li><Link to="/resources/safety-protocols" className="hover:text-white transition-colors">Safety Protocols</Link></li>
                            <li><Link to="/resources/yield-optimization" className="hover:text-white transition-colors">Yield Optimization</Link></li>
                            <li><Link to="/resources/legal-framework" className="hover:text-white transition-colors">Legal Framework</Link></li>
                            <li><Link to="/resources/privacy-ledger" className="hover:text-white transition-colors">Privacy Ledger</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="md:col-span-4 lg:col-span-3">
                        <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-8">Connect Hub</h3>
                        <div className="space-y-6">
                            <Link to="/contact" className="flex items-start gap-5 group">
                                <div className="p-3 bg-emerald-900 rounded-2xl border border-emerald-800 shadow-sm text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1">Send Query</p>
                                    <p className="font-bold text-white group-hover:text-emerald-500 transition-colors">Contact Support</p>
                                </div>
                            </Link>
                            <Link to="/support" className="flex items-start gap-5 group">
                                <div className="p-3 bg-emerald-900 rounded-2xl border border-emerald-800 shadow-sm text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <HelpCircle size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1">Online Help</p>
                                    <p className="font-bold text-white group-hover:text-emerald-500 transition-colors">Knowledge Base</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-emerald-500/40 text-xs font-black uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} AgriSecure Global Technologies. All Data Verified.
                    </p>
                    <div className="flex gap-8 text-[10px] font-black text-emerald-500/40 uppercase tracking-widest">
                        <a href="#" className="hover:text-emerald-500 transition-colors">System Status</a>
                        <a href="#" className="hover:text-emerald-500 transition-colors">Terms of Trade</a>
                        <a href="#" className="hover:text-emerald-500 transition-colors">Carbon Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
