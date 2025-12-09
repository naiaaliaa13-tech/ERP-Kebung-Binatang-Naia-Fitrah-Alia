import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowUpRight, Users, Wallet, AlertTriangle } from 'lucide-react';
import { getDynamicPricing } from '../services/geminiService';

const dataVisitor = [
  { time: '08:00', count: 120 },
  { time: '10:00', count: 450 },
  { time: '12:00', count: 980 },
  { time: '14:00', count: 850 },
  { time: '16:00', count: 600 },
  { time: '18:00', count: 300 },
];

const dataRevenue = [
  { day: 'Mon', amount: 12000 },
  { day: 'Tue', amount: 15000 },
  { day: 'Wed', amount: 11000 },
  { day: 'Thu', amount: 18000 },
  { day: 'Fri', amount: 24000 },
  { day: 'Sat', amount: 45000 },
  { day: 'Sun', amount: 38000 },
];

const HeroCard: React.FC<{ title: string; value: string; trend: string; icon: React.ReactNode; isPositive?: boolean }> = ({ title, value, trend, icon, isPositive = true }) => (
  <div className="glass-panel p-6 rounded-xl border-l-4 border-l-luxury-gold relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      {icon}
    </div>
    <p className="text-gray-400 text-sm uppercase tracking-wide font-medium">{title}</p>
    <h3 className="text-3xl font-bold text-white mt-2 mb-1">{value}</h3>
    <div className={`flex items-center text-xs font-semibold ${isPositive ? 'text-luxury-emerald' : 'text-red-400'}`}>
      <ArrowUpRight size={14} className="mr-1" />
      {trend} vs last month
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [pricing, setPricing] = useState<{ price: number; reason: string } | null>(null);
  const [loadingPricing, setLoadingPricing] = useState(false);

  useEffect(() => {
    // Simulate fetching dynamic pricing on load
    const fetchPricing = async () => {
      setLoadingPricing(true);
      const result = await getDynamicPricing(980, "Sunny, 28°C", false);
      setPricing({ price: result.suggestedPrice, reason: result.reasoning });
      setLoadingPricing(false);
    };
    fetchPricing();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white">Executive Overview</h2>
          <p className="text-gray-400 mt-1">Real-time operational intelligence.</p>
        </div>
        <div className="text-right">
            <div className="text-xs text-gray-500 uppercase">AI Dynamic Pricing</div>
            {loadingPricing ? (
                <span className="text-luxury-gold text-sm animate-pulse">Calculating...</span>
            ) : (
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold text-luxury-gold">${pricing?.price.toFixed(2)}</span>
                    <span className="text-[10px] text-gray-400 max-w-[200px] truncate">{pricing?.reason}</span>
                </div>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <HeroCard 
          title="Total Cash Position" 
          value="$1,245,000" 
          trend="+12.5%" 
          icon={<Wallet size={48} />} 
        />
        <HeroCard 
          title="Daily Visitors" 
          value="3,402" 
          trend="+8.2%" 
          icon={<Users size={48} />} 
        />
        <HeroCard 
          title="Specimen Health Alert" 
          value="2 Critical" 
          trend="-1 case" 
          isPositive={false}
          icon={<AlertTriangle size={48} />} 
        />
        <HeroCard 
          title="Inventory Efficiency" 
          value="98.4%" 
          trend="+1.1%" 
          icon={<Users size={48} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-6">Visitor Flow (Real-time)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataVisitor}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                  itemStyle={{ color: '#d4af37' }}
                />
                <Area type="monotone" dataKey="count" stroke="#d4af37" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-6">Weekly Revenue Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} 
                />
                <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
