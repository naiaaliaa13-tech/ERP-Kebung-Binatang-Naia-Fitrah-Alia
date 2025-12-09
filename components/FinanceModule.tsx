import React, { useState } from 'react';
import { suggestJournalEntry } from '../services/geminiService';
import { Bot, CheckCircle, Save, Loader2 } from 'lucide-react';

const FinanceModule: React.FC = () => {
  const [description, setDescription] = useState('');
  const [suggestion, setSuggestion] = useState<{ debitAccount: string; creditAccount: string; explanation: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAISuggest = async () => {
    if (!description) return;
    setLoading(true);
    const result = await suggestJournalEntry(description);
    setSuggestion(result);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h2 className="text-3xl font-bold text-white">General Ledger</h2>
            <p className="text-gray-400">Double-entry bookkeeping with AI assurance.</p>
        </div>
        <div className="flex space-x-3">
             <button className="px-4 py-2 border border-luxury-700 text-gray-300 rounded-lg hover:bg-luxury-800">
                View Reports
            </button>
            <button className="px-4 py-2 bg-luxury-emerald text-white rounded-lg flex items-center shadow-lg shadow-emerald-900/20">
                <Save size={18} className="mr-2" /> Post Batch
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Entry Form */}
        <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel p-6 rounded-xl border-t-4 border-t-luxury-gold">
                <h3 className="text-xl font-semibold text-white mb-6">New Journal Entry</h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Transaction Description</label>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="e.g., Monthly feed purchase for Lion enclosure from Vendor X"
                                className="flex-1 bg-luxury-900/50 border border-luxury-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxury-gold"
                            />
                            <button 
                                onClick={handleAISuggest}
                                disabled={loading || !description}
                                className="bg-luxury-gold/10 border border-luxury-gold/50 text-luxury-gold px-4 py-2 rounded-lg hover:bg-luxury-gold/20 disabled:opacity-50 transition-colors flex items-center min-w-[140px] justify-center"
                            >
                                {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Bot className="mr-2" size={18} />}
                                AI Assist
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                         {/* Debit Side */}
                         <div className="p-4 bg-luxury-900/30 rounded-lg border border-luxury-700/50">
                            <div className="text-xs font-bold text-luxury-emerald uppercase mb-2 tracking-wider">Debit</div>
                            <input 
                                type="text"
                                placeholder="Account Code"
                                value={suggestion?.debitAccount || ''}
                                readOnly={!!suggestion}
                                className="w-full bg-transparent border-b border-gray-600 pb-1 text-white mb-3 focus:outline-none focus:border-luxury-emerald"
                            />
                            <input 
                                type="number"
                                placeholder="Amount"
                                className="w-full bg-transparent border-b border-gray-600 pb-1 text-white focus:outline-none focus:border-luxury-emerald"
                            />
                         </div>

                         {/* Credit Side */}
                         <div className="p-4 bg-luxury-900/30 rounded-lg border border-luxury-700/50">
                            <div className="text-xs font-bold text-red-400 uppercase mb-2 tracking-wider">Credit</div>
                            <input 
                                type="text"
                                placeholder="Account Code"
                                value={suggestion?.creditAccount || ''}
                                readOnly={!!suggestion}
                                className="w-full bg-transparent border-b border-gray-600 pb-1 text-white mb-3 focus:outline-none focus:border-red-400"
                            />
                            <input 
                                type="number"
                                placeholder="Amount"
                                className="w-full bg-transparent border-b border-gray-600 pb-1 text-white focus:outline-none focus:border-red-400"
                            />
                         </div>
                    </div>

                    {suggestion && (
                        <div className="bg-luxury-accent/10 border border-luxury-accent/30 p-4 rounded-lg flex items-start gap-3 animate-fade-in">
                            <Bot className="text-luxury-accent mt-1 flex-shrink-0" size={20} />
                            <div>
                                <p className="text-sm text-luxury-accent font-semibold mb-1">AI Contextual Reasoning</p>
                                <p className="text-sm text-gray-300">{suggestion.explanation}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Ledger Lines */}
            <div className="glass-panel p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
                <table className="w-full text-left">
                    <thead className="text-xs text-gray-500 uppercase border-b border-gray-700">
                        <tr>
                            <th className="pb-3">Date</th>
                            <th className="pb-3">Ref</th>
                            <th className="pb-3">Description</th>
                            <th className="pb-3 text-right">Amount</th>
                            <th className="pb-3 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b border-gray-800">
                            <td className="py-3 text-gray-300">Oct 24</td>
                            <td className="text-gray-500">JE-1092</td>
                            <td className="text-gray-300">Ticket Revenue - Gate A</td>
                            <td className="text-right text-white font-mono">$12,450.00</td>
                            <td className="text-center"><CheckCircle size={14} className="inline text-luxury-emerald"/></td>
                        </tr>
                        <tr className="border-b border-gray-800">
                            <td className="py-3 text-gray-300">Oct 24</td>
                            <td className="text-gray-500">JE-1093</td>
                            <td className="text-gray-300">Vet Supplies - Vaccines</td>
                            <td className="text-right text-white font-mono">$850.00</td>
                            <td className="text-center"><CheckCircle size={14} className="inline text-luxury-emerald"/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
            <div className="glass-panel p-6 rounded-xl bg-gradient-to-b from-luxury-800 to-luxury-900">
                <h4 className="text-gray-400 text-sm uppercase font-bold mb-4">Quick Stats</h4>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Month End Close</span>
                            <span className="text-white">82%</span>
                        </div>
                        <div className="h-1 bg-gray-700 rounded-full">
                            <div className="h-1 bg-luxury-gold rounded-full w-[82%]"></div>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-gray-700">
                        <div className="text-sm text-gray-400 mb-1">Unreconciled Items</div>
                        <div className="text-2xl font-bold text-white">14</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceModule;
