import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import Payment from './pages/Payment';
import AboutUs from './pages/AboutUs';
import CropsAvailability from './pages/CropsAvailability';
import Contracts from './pages/Contracts';
import Market from './pages/Market';
import SafetyProtocols from './pages/resources/SafetyProtocols';
import YieldOptimization from './pages/resources/YieldOptimization';
import LegalFramework from './pages/resources/LegalFramework';
import PrivacyLedger from './pages/resources/PrivacyLedger';
import Contact from './pages/support/Contact';
import Support from './pages/support/Support';
import LogoShowcase from './pages/LogoShowcase';
import { AuthProvider } from './context/AuthContext';

import Footer from './components/Footer';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
                    <Navbar />
                    <main className="container mx-auto px-4 py-8 flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
                            <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/crops-availability" element={<CropsAvailability />} />
                            <Route path="/contracts" element={<Contracts />} />
                            <Route path="/market" element={<Market />} />

                            {/* Resource Routes */}
                            <Route path="/resources/safety-protocols" element={<SafetyProtocols />} />
                            <Route path="/resources/yield-optimization" element={<YieldOptimization />} />
                            <Route path="/resources/legal-framework" element={<LegalFramework />} />
                            <Route path="/resources/privacy-ledger" element={<PrivacyLedger />} />

                            {/* Support Routes */}
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/support" element={<Support />} />
                            <Route path="/logo" element={<LogoShowcase />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
