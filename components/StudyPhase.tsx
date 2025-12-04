import React, { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb } from 'lucide-react';
import { StudySlide } from '../types';

interface StudyPhaseProps {
  slides: StudySlide[];
  onComplete: () => void;
  playClick: () => void;
}

export const StudyPhase: React.FC<StudyPhaseProps> = ({ slides, onComplete, playClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    playClick();
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(p => p + 1);
    } else {
      onComplete();
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="max-w-2xl mx-auto w-full animate-fade-in p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
            <BookOpen size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white">Concepto {currentSlide + 1}/{slides.length}</h2>
        </div>

        <div className="min-h-[300px] flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-indigo-300 mb-4">{slide.title}</h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">{slide.content}</p>
            
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-5 flex gap-4">
              <Lightbulb className="text-yellow-400 shrink-0" size={24} />
              <div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Ejemplo</span>
                <p className="text-emerald-400 font-mono text-sm">{slide.example}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-2 w-8 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-indigo-500' : 'bg-slate-700'}`}
                />
              ))}
            </div>
            <button 
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:translate-x-1"
            >
              {currentSlide === slides.length - 1 ? 'Iniciar Prueba' : 'Siguiente'}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};