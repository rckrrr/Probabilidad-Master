import React from 'react';
import { Home, RefreshCcw } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Question } from '../types';

interface ResultsViewProps {
  score: number;
  totalQuestions: number;
  history: { isCorrect: boolean; question: Question }[];
  onRetry: () => void;
  onHome: () => void;
  levelColor: string;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ score, totalQuestions, history, onRetry, onHome, levelColor }) => {
  const correctCount = history.filter(h => h.isCorrect).length;
  const incorrectCount = history.length - correctCount; // history length might be less than totalQuestions if died early
  
  const pieData = [
    { name: 'Correctas', value: correctCount, color: '#10b981' },
    { name: 'Incorrectas', value: incorrectCount, color: '#ef4444' },
  ];

  // Calculate generic feedback
  const percentage = (correctCount / totalQuestions) * 100;
  let message = "";
  if (percentage === 100) message = "¡Perfección Absoluta! 🏆";
  else if (percentage >= 70) message = "¡Gran Trabajo! Has dominado el tema.";
  else if (percentage >= 40) message = "Buen intento, pero necesitas repasar.";
  else message = "No te rindas. Revisa los conceptos e inténtalo de nuevo.";

  return (
    <div className="max-w-2xl mx-auto w-full animate-fade-in p-4 text-center">
      <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-2">
        Sesión Finalizada
      </h1>
      <p className={`text-xl font-medium ${levelColor} mb-8`}>{message}</p>

      <div className="bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-700 mb-8">
        <div className="flex justify-center mb-6">
           <div className="w-full h-64">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                    itemStyle={{ color: '#f1f5f9' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
             </ResponsiveContainer>
           </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-slate-300">
           <div className="bg-slate-900/50 p-4 rounded-xl">
             <div className="text-sm uppercase text-slate-500 font-bold">Puntaje Final</div>
             <div className="text-3xl font-mono text-white">{score}</div>
           </div>
           <div className="bg-slate-900/50 p-4 rounded-xl">
             <div className="text-sm uppercase text-slate-500 font-bold">Precisión</div>
             <div className="text-3xl font-mono text-white">{Math.round(percentage)}%</div>
           </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button onClick={onHome} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold transition-colors">
          <Home size={20} /> Menú
        </button>
        <button onClick={onRetry} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-1">
          <RefreshCcw size={20} /> Reintentar
        </button>
      </div>
    </div>
  );
};