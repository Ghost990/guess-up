'use client';

import { useMemo, useState, useEffect } from 'react';
import { Category } from '@/types/word';

interface StunningTimerProps {
  timeLeft: number;
  totalDuration: number;
  category: Category;
  currentPlayer: string;
  currentTurn: number;
  totalTurns: number;
  onGotIt: () => void;
  onPass: () => void;
}

const categoryThemes = {
  draw: { primary: '#FFD60A', emoji: '\u{1F3A8}', label: 'DRAW' },
  explain: { primary: '#00E5FF', emoji: '\u{1F4AC}', label: 'EXPLAIN' },
  signal: { primary: '#FF3A8F', emoji: '\u{1F44B}', label: 'SIGNAL' },
} as const;

export function StunningTimer({
  timeLeft,
  totalDuration,
  category,
  currentPlayer,
  currentTurn,
  totalTurns,
  onGotIt,
  onPass,
}: StunningTimerProps) {
  const [svgSize, setSvgSize] = useState(260);

  useEffect(() => {
    const update = () => setSvgSize(Math.min(280, window.innerWidth * 0.7));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const progressPercent = (timeLeft / totalDuration) * 100;
  const theme = categoryThemes[category];

  const timeColor = useMemo(() => {
    if (progressPercent > 50) return theme.primary;
    if (progressPercent > 25) return '#F59E0B';
    return '#FF4444';
  }, [progressPercent, theme.primary]);

  const isPulsing = progressPercent <= 25;

  const radius = svgSize * 0.42;
  const strokeWidth = svgSize * 0.065;
  const center = svgSize / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressPercent / 100);

  return (
    <div
      className="min-h-[100dvh] flex flex-col"
      style={{
        background: `radial-gradient(ellipse at 50% 30%, ${theme.primary}18 0%, transparent 60%), #0A0A12`,
      }}
    >
      {/* TOP: Category pill + player info */}
      <div className="px-5 pt-5 space-y-3">
        <div className="flex justify-center">
          <div
            className="px-5 py-2 rounded-full font-bold text-sm tracking-wider flex items-center gap-2"
            style={{
              background: `${theme.primary}22`,
              color: theme.primary,
              border: `1.5px solid ${theme.primary}44`,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <span className="text-lg">{theme.emoji}</span>
            <span style={{ fontFamily: 'var(--font-syne)' }}>{theme.label}</span>
          </div>
        </div>
        <div className="flex items-center justify-between px-1">
          <span className="text-white/80 text-sm font-semibold">{currentPlayer}</span>
          <span className="text-white/50 text-sm">Round {currentTurn} of {totalTurns}</span>
        </div>
      </div>

      {/* MIDDLE: SVG circular timer */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="relative"
          style={{
            width: svgSize,
            height: svgSize,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Inner frosted layer */}
          <div
            className="absolute rounded-full"
            style={{
              width: svgSize * 0.6,
              height: svgSize * 0.6,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          />
          <svg width={svgSize} height={svgSize} className="transform -rotate-90">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Background track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={strokeWidth}
              fill="rgba(255,255,255,0.02)"
            />
            {/* Progress circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke={timeColor}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
              filter="url(#glow)"
            />
          </svg>

          {/* Timer number overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className={`text-7xl font-semibold tracking-tighter ${isPulsing ? 'animate-pulse' : ''}`}
              style={{
                fontFamily: 'var(--font-syne)',
                color: timeColor,
                textShadow: `0 0 30px ${timeColor}66`,
              }}
            >
              {timeLeft}
            </div>
            <div
              className="text-xs font-bold uppercase tracking-[0.2em] mt-1"
              style={{ color: `${timeColor}99` }}
            >
              SECONDS
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM: Buttons + round dots */}
      <div className="px-5 pb-8 space-y-3">
        <div className="flex gap-3">
          <button
            onClick={onGotIt}
            className="flex-1 py-5 rounded-2xl text-xl font-bold active:scale-95 transition-transform"
            style={{
              background: 'rgba(0,230,118,0.12)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,230,118,0.25)',
              color: '#00E676',
              boxShadow: '0 6px 24px rgba(0,230,118,0.15)',
            }}
          >
            ✓ Got It!
          </button>
          <button
            onClick={onPass}
            className="flex-1 py-5 rounded-2xl text-xl font-bold active:scale-95 transition-transform"
            style={{
              background: 'rgba(255,68,68,0.12)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,68,68,0.25)',
              color: '#FF4444',
              boxShadow: '0 6px 24px rgba(255,68,68,0.15)',
            }}
          >
            ✗ Skip
          </button>
        </div>

        {/* Round dots */}
        <div className="flex justify-center items-center gap-1.5 py-2">
          {Array.from({ length: totalTurns }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i < currentTurn ? theme.primary : 'rgba(255,255,255,0.2)',
                boxShadow: i < currentTurn ? `0 0 6px ${theme.primary}88` : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
