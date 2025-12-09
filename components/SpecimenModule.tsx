import React, { useState } from 'react';
import { Specimen, AnimalStatus, HealthLog } from '../types';
import { Activity, Thermometer, Heart, AlertCircle, Sparkles } from 'lucide-react';
import { analyzeHealthRisk } from '../services/geminiService';

// Mock Data
const MOCK_SPECIMEN: Specimen = {
  id: 'SP-2024-001',
  name: 'Raja',
  speciesId: 'Panthera tigris sumatrae',
  habitatId: 'HAB-01',
  birthDate: '2015-06-15',
  gender: 'M',
  acquisitionDate: '2018-01-20',
  status: AnimalStatus.OBSERVATION,
  imageUrl: 'https://picsum.photos/400/400?grayscale' // Placeholder
};

const MOCK_LOGS: HealthLog[] = [
  { id: 'LOG-01', specimenId: 'SP-2024-001', timestamp: '2023-10-25', veterinarianId: 'VET-01', notes: 'Slight lethargy observed.', vitals: { weightKg: 120, temperatureC: 38.5, heartRateBpm: 75 } },
  { id: 'LOG-02', specimenId: 'SP-2024-001', timestamp: '2023-10-26', veterinarianId: 'VET-01', notes: 'Reduced appetite.', vitals: { weightKg: 119, temperatureC: 39.1, heartRateBpm: 82 } },
];

const SpecimenModule: React.FC = () => {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handlePredictHealth = async () => {
    setAnalyzing(true);
    const result = await analyzeHealthRisk(MOCK_SPECIMEN, MOCK_LOGS, "Sumatran Tiger");
    setAiAnalysis(result);
    setAnalyzing(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Specimen Health <span className="text-luxury-gold">&</span> Safety</h2>
        <button className="bg-luxury-gold text-luxury-900 px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
          + New Log
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="glass-panel rounded-2xl p-0 overflow-hidden col-span-1">
            <div className="h-64 overflow-hidden relative">
                <img src={MOCK_SPECIMEN.imageUrl} alt={MOCK_SPECIMEN.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-luxury-900 to-transparent p-4">
                    <h3 className="text-2xl font-bold text-white">{MOCK_SPECIMEN.name}</h3>
                    <p className="text-luxury-gold text-sm italic">Sumatran Tiger</p>
                </div>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Status</span>
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded border border-yellow-500/50">
                        {MOCK_SPECIMEN.status}
                    </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Age</span>
                    <span className="text-white">8 Years</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Weight</span>
                    <span className="text-white">119 Kg</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Habitat</span>
                    <span className="text-white">Rainforest Zone A</span>
                </div>
            </div>
        </div>

        {/* Analytics & Logs */}
        <div className="lg:col-span-2 space-y-6">
            {/* AI Action Area */}
            <div className="glass-panel p-6 rounded-2xl border border-luxury-gold/30 bg-gradient-to-br from-luxury-800 to-luxury-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Sparkles size={120} />
                </div>
                <div className="relative z-10">
                    <h4 className="text-xl font-semibold text-white mb-2 flex items-center">
                        <Sparkles className="text-luxury-gold mr-2" size={20} />
                        Vertex AI Health Forecasting
                    </h4>
                    <p className="text-gray-400 mb-4 text-sm max-w-lg">
                        Analyze recent vitals and behavioral logs against historical species data to predict potential health risks.
                    </p>
                    
                    {!aiAnalysis ? (
                        <button 
                            onClick={handlePredictHealth}
                            disabled={analyzing}
                            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg border border-white/20 transition-all"
                        >
                            {analyzing ? <Activity className="animate-spin" /> : <Activity />}
                            <span>{analyzing ? 'Processing Telemetry...' : 'Run Risk Assessment'}</span>
                        </button>
                    ) : (
                        <div className="mt-4 p-4 bg-black/30 rounded-lg border-l-4 border-luxury-emerald animate-fade-in">
                             <div className="flex justify-between items-start">
                                <p className="text-white whitespace-pre-line text-sm leading-relaxed">{aiAnalysis}</p>
                                <button onClick={() => setAiAnalysis(null)} className="text-gray-500 hover:text-white"><AlertCircle size={16}/></button>
                             </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Vitals Grid */}
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-luxury-800 rounded-xl border border-luxury-700 flex flex-col items-center">
                    <Heart className="text-red-500 mb-2" size={24} />
                    <span className="text-2xl font-bold text-white">82</span>
                    <span className="text-xs text-gray-500">BPM</span>
                </div>
                <div className="p-4 bg-luxury-800 rounded-xl border border-luxury-700 flex flex-col items-center">
                    <Thermometer className="text-orange-500 mb-2" size={24} />
                    <span className="text-2xl font-bold text-white">39.1°C</span>
                    <span className="text-xs text-gray-500">Temp</span>
                </div>
                <div className="p-4 bg-luxury-800 rounded-xl border border-luxury-700 flex flex-col items-center">
                    <Activity className="text-blue-500 mb-2" size={24} />
                    <span className="text-2xl font-bold text-white">Stable</span>
                    <span className="text-xs text-gray-500">Respiration</span>
                </div>
            </div>
            
             <div className="glass-panel p-6 rounded-xl">
                <h4 className="text-lg font-semibold text-white mb-4">Recent Clinical Logs</h4>
                <div className="space-y-4">
                    {MOCK_LOGS.map(log => (
                        <div key={log.id} className="flex border-b border-gray-700 pb-3 last:border-0 last:pb-0">
                            <div className="w-24 text-sm text-gray-400 font-mono">{log.timestamp}</div>
                            <div className="flex-1">
                                <p className="text-white text-sm">{log.notes}</p>
                                <div className="mt-1 flex gap-2">
                                    <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-300">Dr. Smith</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SpecimenModule;
