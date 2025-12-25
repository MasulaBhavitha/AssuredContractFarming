import React from 'react';

const Market = () => {
    const marketPrices = [
        { crop: 'Wheat', current: '₹2,350/q', previous: '₹2,300/q', change: '+2.17%' },
        { crop: 'Rice', current: '₹1,950/q', previous: '₹1,980/q', change: '-1.52%' },
        { crop: 'Cotton', current: '₹6,200/q', previous: '₹6,100/q', change: '+1.64%' },
        { crop: 'Sugarcane', current: '₹315/q', previous: '₹305/q', change: '+3.28%' },
        { crop: 'Mustard', current: '₹5,400/q', previous: '₹5,450/q', change: '-0.92%' },
        { crop: 'Potato', current: '₹1,200/q', previous: '₹1,100/q', change: '+9.09%' }
    ];

    return (
        <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-2xl font-bold mb-8 text-emerald-900">Crop Market & Pricing</h1>

                <div className="grid gap-6">
                    {marketPrices.map((item, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-emerald-50 to-white p-6 rounded-xl shadow-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold text-emerald-800 mb-2">{item.crop}</h3>
                                    <div className="flex items-center space-x-4">
                                        <div>
                                            <div className="text-sm text-gray-500">Current Price</div>
                                            <div className="text-2xl font-bold text-emerald-600">{item.current}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Previous</div>
                                            <div className="text-xl text-gray-600">{item.previous}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl mb-2">{item.change.startsWith('+') ? '📈' : '📉'}</div>
                                    <div className={`text-xl font-bold ${item.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {item.change}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Market;
