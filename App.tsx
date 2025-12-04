
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Heart, Trophy, Brain, ChevronRight, Trash2 } from 'lucide-react';
import { LEVELS } from './data';
import { GameState, Question } from './types';
import { useGameAudio } from './hooks/useGameAudio';
import { StudyPhase } from './components/StudyPhase';
import { ResultsView } from './components/ResultsView';

const MAX_LIVES = 3;

export default function App() {
  // State
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Progress Persistence
  const [highScores, setHighScores] = useState<Record<number, number>>({});

  // Gameplay State
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [gameHistory, setGameHistory] = useState<{ isCorrect: boolean; question: Question }[]>([]);

  const soundFX = useGameAudio(soundEnabled);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('pm_pro_scores');
    if (savedProgress) {
      try {
        setHighScores(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Error loading progress", e);
      }
    }
  }, []);

  // Save progress logic
  const saveProgress = (levelId: number, newScore: number) => {
    setHighScores(prev => {
      const currentHigh = prev[levelId] || 0;
      if (newScore > currentHigh) {
        const updated = { ...prev, [levelId]: newScore };
        localStorage.setItem('pm_pro_scores', JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  const resetProgress = () => {
    if (confirm("¿Estás seguro de que quieres borrar todo tu progreso y récords?")) {
      localStorage.removeItem('pm_pro_scores');
      setHighScores({});
      soundFX.lose(); // Sound effect feedback
    }
  };

  // Helper: Start Level Flow
  const startLevel = (levelId: number) => {
    soundFX.click();
    setCurrentLevelId(levelId);
    setGameState(GameState.STUDY);
  };

  // Helper: Initialize Actual Game after Study
  const initializeGame = () => {
    const level = LEVELS[currentLevelId];
    // Shuffle questions
    const shuffled = [...level.questions]
      .sort(() => Math.random() - 0.5)
      .map(q => ({
        ...q,
        opts: [...q.opts].sort(() => Math.random() - 0.5) // Shuffle options too
      }));
    
    // Fix correct index after shuffle options
    const fixedQuestions = shuffled.map(q => {
        const originalCorrectText = level.questions.find(oq => oq.id === q.id)?.opts[level.questions.find(oq => oq.id === q.id)!.c];
        const newCorrectIndex = q.opts.indexOf(originalCorrectText!);
        return { ...q, c: newCorrectIndex };
    });

    setShuffledQuestions(fixedQuestions);
    setScore(0);
    setLives(MAX_LIVES);
    setCurrentQIndex(0);
    setGameHistory([]);
    setIsAnswerChecked(false);
    setSelectedOption(null);
    setGameState(GameState.PLAYING);
  };

  const handleAnswer = (optIndex: number) => {
    if (isAnswerChecked) return;
    
    soundFX.click();
    setSelectedOption(optIndex);
    setIsAnswerChecked(true);

    const currentQ = shuffledQuestions[currentQIndex];
    const isCorrect = optIndex === currentQ.c;
    
    // Update History
    setGameHistory(prev => [...prev, { isCorrect, question: currentQ }]);

    if (isCorrect) {
      soundFX.correct();
      setScore(s => s + (100 * currentLevelId));
    } else {
      soundFX.wrong();
      setLives(l => l - 1);
    }
  };

  const handleGameOver = (isWin: boolean) => {
    if (isWin) soundFX.win();
    else soundFX.lose();

    // Save Score before showing results
    // We pass the current calculated score. Note: 'score' state might be one render tick behind if updated in same func, 
    // but here we updated score in handleAnswer previously, so it's safe.
    // However, if the last question was correct, score updated. 
    // Let's rely on the state 'score' being up to date because nextQuestion is called by user interaction AFTER handleAnswer.
    saveProgress(currentLevelId, score);
    
    setGameState(GameState.RESULTS);
  };

  const nextQuestion = () => {
    soundFX.click();
    
    // Check for game over (loss) - logic should strictly be checked here if we auto-advanced, 
    // but we advance manually. 
    // If lives hit 0 in handleAnswer, user sees feedback then clicks next.
    if (lives <= 0) {
      handleGameOver(false);
      return;
    }

    // Check for game over (end of questions)
    if (currentQIndex >= shuffledQuestions.length - 1) {
      handleGameOver(true);
      return;
    }

    setIsAnswerChecked(false);
    setSelectedOption(null);
    setCurrentQIndex(prev => prev + 1);
  };

  const currentLevel = LEVELS[currentLevelId];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] transform -translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[100px] transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Global Controls */}
      <button 
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-6 right-6 p-3 bg-slate-800/50 hover:bg-slate-700/80 rounded-full backdrop-blur-sm transition-all z-50 border border-slate-700"
      >
        {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      {/* --- MENU SCREEN --- */}
      {gameState === GameState.MENU && (
        <div className="max-w-4xl w-full z-10 animate-fade-in flex flex-col items-center">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 tracking-tight">
              PROBABILIDAD MASTER
            </h1>
            <p className="text-slate-400 text-lg">Selecciona tu nivel de desafío</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 w-full mb-12">
            {Object.values(LEVELS).map((lvl) => {
              const highScore = highScores[lvl.id] || 0;
              return (
                <button
                  key={lvl.id}
                  onClick={() => startLevel(lvl.id)}
                  className="group relative bg-slate-800/60 border border-slate-700 hover:border-indigo-500 rounded-3xl p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 text-left overflow-hidden flex flex-col"
                >
                  <div className={`text-4xl mb-4 transform transition-transform group-hover:scale-110 duration-300`}>
                      {lvl.icon}
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${lvl.color}`}>{lvl.title}</h3>
                  <p className="text-slate-400 text-sm font-medium mb-4 flex-grow">{lvl.description}</p>
                  
                  {highScore > 0 && (
                    <div className="mb-4 flex items-center gap-2 text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-lg w-fit">
                      <Trophy size={14} />
                      <span className="text-xs font-bold">Récord: {highScore}</span>
                    </div>
                  )}

                  <div className="mt-auto flex items-center text-slate-500 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                    Iniciar <ChevronRight size={16} className="ml-1" />
                  </div>
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </button>
              );
            })}
          </div>

          {/* Reset Progress */}
          {Object.keys(highScores).length > 0 && (
            <button 
              onClick={resetProgress}
              className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors text-sm font-semibold px-4 py-2 rounded-lg hover:bg-rose-500/10"
            >
              <Trash2 size={16} />
              Borrar Progreso
            </button>
          )}
        </div>
      )}

      {/* --- STUDY SCREEN --- */}
      {gameState === GameState.STUDY && (
        <StudyPhase 
          slides={currentLevel.studyMaterial} 
          onComplete={initializeGame}
          playClick={soundFX.click}
        />
      )}

      {/* --- PLAYING SCREEN --- */}
      {gameState === GameState.PLAYING && shuffledQuestions.length > 0 && (
        <div className="max-w-3xl w-full z-10 animate-slide-up">
          {/* Header Stats */}
          <div className="flex justify-between items-center mb-8 bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-lg">
            <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-700 ${currentLevel.color}`}>
              {currentLevel.title}
            </div>
            
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2 text-indigo-400">
                 <Trophy size={18} />
                 <span className="font-mono font-bold text-xl">{score}</span>
               </div>
               <div className="flex items-center gap-1 text-rose-500">
                 {Array.from({length: MAX_LIVES}).map((_, i) => (
                   <Heart 
                     key={i} 
                     size={20} 
                     fill={i < lives ? "currentColor" : "none"} 
                     className={i < lives ? "" : "opacity-30"}
                   />
                 ))}
               </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-800 rounded-full mb-8 overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-500 ease-out"
              style={{ width: `${((currentQIndex) / shuffledQuestions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Card */}
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl mb-6">
            <h2 className="text-xl md:text-2xl font-semibold leading-relaxed mb-8 text-slate-100">
              <span className="text-slate-500 mr-2">#{currentQIndex + 1}</span>
              {shuffledQuestions[currentQIndex].q}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shuffledQuestions[currentQIndex].opts.map((opt, idx) => {
                let btnClass = "bg-slate-700/50 hover:bg-slate-700 border-slate-600 text-slate-300";
                
                if (isAnswerChecked) {
                  if (idx === shuffledQuestions[currentQIndex].c) {
                    btnClass = "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
                  } else if (idx === selectedOption) {
                    btnClass = "bg-rose-500/20 border-rose-500 text-rose-300";
                  } else {
                    btnClass = "opacity-50 border-transparent";
                  }
                } else if (selectedOption === idx) {
                    btnClass = "bg-indigo-600 text-white border-indigo-500";
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerChecked}
                    onClick={() => handleAnswer(idx)}
                    className={`p-5 rounded-xl border-2 text-left font-medium transition-all duration-200 transform ${!isAnswerChecked && 'hover:-translate-y-1'} ${btnClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Next Button */}
          {isAnswerChecked && (
            <div className="animate-fade-in-up">
              <div className={`p-6 rounded-2xl mb-6 border ${selectedOption === shuffledQuestions[currentQIndex].c ? 'bg-emerald-900/20 border-emerald-900/50' : 'bg-rose-900/20 border-rose-900/50'}`}>
                <div className="flex items-start gap-3">
                  <Brain className={`shrink-0 mt-1 ${selectedOption === shuffledQuestions[currentQIndex].c ? 'text-emerald-400' : 'text-rose-400'}`} />
                  <div>
                    <h4 className={`font-bold uppercase text-xs tracking-wider mb-2 ${selectedOption === shuffledQuestions[currentQIndex].c ? 'text-emerald-400' : 'text-rose-400'}`}>
                      Análisis Matemático
                    </h4>
                    <p className="text-slate-300 leading-relaxed font-mono text-sm">
                      {shuffledQuestions[currentQIndex].exp}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={nextQuestion}
                className="w-full py-4 bg-slate-100 text-slate-900 rounded-xl font-bold text-lg hover:bg-white hover:scale-[1.01] transition-all shadow-lg shadow-white/10"
              >
                {lives <= 0 || currentQIndex >= shuffledQuestions.length - 1 ? 'Ver Resultados Finales' : 'Siguiente Desafío'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- RESULTS SCREEN --- */}
      {gameState === GameState.RESULTS && (
        <ResultsView 
          score={score}
          totalQuestions={shuffledQuestions.length}
          history={gameHistory}
          onRetry={() => startLevel(currentLevelId)}
          onHome={() => {
              soundFX.click();
              setGameState(GameState.MENU);
          }}
          levelColor={currentLevel.color}
        />
      )}
    </div>
  );
}
