import { useCallback, useEffect, useRef } from 'react';

export const useGameAudio = (enabled: boolean) => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    };
    window.addEventListener('click', initAudio, { once: true });
    return () => window.removeEventListener('click', initAudio);
  }, []);

  const playTone = useCallback((freq: number, type: OscillatorType, duration: number, startTime: number = 0, vol: number = 0.1) => {
    if (!enabled || !audioCtxRef.current) return;
    
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
    
    gain.gain.setValueAtTime(vol, ctx.currentTime + startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + duration);
  }, [enabled]);

  const soundFX = {
    click: () => playTone(600, 'sine', 0.05, 0, 0.05),
    correct: () => {
      playTone(440, 'sine', 0.1, 0);
      playTone(554, 'sine', 0.1, 0.1);
      playTone(659, 'sine', 0.2, 0.2);
    },
    wrong: () => {
      playTone(150, 'sawtooth', 0.3, 0);
      playTone(100, 'sawtooth', 0.4, 0.2);
    },
    win: () => {
      [523, 659, 783, 1046].forEach((f, i) => playTone(f, 'square', 0.2, i * 0.1, 0.05));
    },
    lose: () => {
      playTone(200, 'triangle', 0.5, 0);
      playTone(150, 'triangle', 0.8, 0.4);
    }
  };

  return soundFX;
};