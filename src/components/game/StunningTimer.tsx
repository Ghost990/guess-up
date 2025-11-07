'use client';

import { useMemo } from 'react';
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
  // Calculate progress percentage
  const progressPercent = (timeLeft / totalDuration) * 100;

  // Dynamic color based on time remaining
  const timePhase = useMemo(() => {
    if (progressPercent > 50) return 'success';
    if (progressPercent > 25) return 'warning';
    return 'critical';
  }, [progressPercent]);

  // Category theme configuration
  const categoryTheme = useMemo(() => {
    switch (category) {
      case 'draw':
        return {
          primary: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb',
          glow: 'rgba(59, 130, 246, 0.3)',
          gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          emoji: '🎨',
          label: 'Draw',
        };
      case 'explain':
        return {
          primary: '#10b981',
          light: '#34d399',
          dark: '#059669',
          glow: 'rgba(16, 185, 129, 0.3)',
          gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          emoji: '💬',
          label: 'Explain',
        };
      case 'signal':
        return {
          primary: '#f97316',
          light: '#fb923c',
          dark: '#ea580c',
          glow: 'rgba(249, 115, 22, 0.3)',
          gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          emoji: '👋',
          label: 'Signal',
        };
    }
  }, [category]);

  // Time-based color theming
  const timeColors = useMemo(() => {
    if (timePhase === 'success') {
      return {
        timer: '#10b981',
        glow: 'rgba(16, 185, 129, 0.4)',
        ring: '#10b981',
      };
    }
    if (timePhase === 'warning') {
      return {
        timer: '#f59e0b',
        glow: 'rgba(245, 158, 11, 0.4)',
        ring: '#f59e0b',
      };
    }
    return {
      timer: '#ef4444',
      glow: 'rgba(239, 68, 68, 0.4)',
      ring: '#ef4444',
    };
  }, [timePhase]);

  // Circle SVG parameters
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressPercent / 100);

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 50% 20%, ${categoryTheme.glow}, transparent 50%),
          radial-gradient(circle at 50% 80%, ${timeColors.glow}, transparent 50%),
          linear-gradient(180deg, #0f172a 0%, #1e293b 100%)
        `,
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            background: categoryTheme.gradient,
            top: '-10%',
            left: '-10%',
            animationDuration: '3s',
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            background: `radial-gradient(circle, ${timeColors.timer}40, transparent)`,
            bottom: '-10%',
            right: '-10%',
            animationDuration: '4s',
            animationDelay: '1s',
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex-1 flex flex-col p-6 pb-8">
        {/* Top section: Category badge and player info */}
        <div className="space-y-4 mb-6">
          {/* Category badge with glassmorphism */}
          <div className="flex justify-center">
            <div
              className="px-6 py-3 rounded-full backdrop-blur-xl border-2 shadow-2xl"
              style={{
                background: `${categoryTheme.primary}20`,
                borderColor: categoryTheme.primary,
                boxShadow: `0 0 30px ${categoryTheme.glow}`,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{categoryTheme.emoji}</span>
                <span
                  className="font-bold text-lg"
                  style={{ color: categoryTheme.light }}
                >
                  {categoryTheme.label.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Player name */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">
              {currentPlayer}'s Turn
            </h2>
          </div>
        </div>

        {/* Main timer section - HERO ELEMENT */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-full blur-2xl animate-pulse"
              style={{
                background: `radial-gradient(circle, ${timeColors.glow}, transparent 70%)`,
                transform: 'scale(1.3)',
                animationDuration: timePhase === 'critical' ? '0.5s' : '2s',
              }}
            />

            {/* Main timer container with glassmorphism */}
            <div
              className="relative backdrop-blur-2xl rounded-full border-4 shadow-2xl"
              style={{
                width: '320px',
                height: '320px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: `${timeColors.ring}60`,
                boxShadow: `
                  0 0 60px ${timeColors.glow},
                  inset 0 0 60px rgba(255, 255, 255, 0.05)
                `,
              }}
            >
              {/* SVG Progress Ring */}
              <svg
                className="absolute inset-0 transform -rotate-90"
                width="320"
                height="320"
              >
                {/* Background circle */}
                <circle
                  cx="160"
                  cy="160"
                  r={radius}
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="20"
                  fill="none"
                />
                {/* Progress circle with gradient */}
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={timeColors.ring} />
                    <stop offset="100%" stopColor={categoryTheme.primary} />
                  </linearGradient>
                </defs>
                <circle
                  cx="160"
                  cy="160"
                  r={radius}
                  stroke="url(#progressGradient)"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-linear"
                  style={{
                    filter: `drop-shadow(0 0 10px ${timeColors.ring}80)`,
                  }}
                />
              </svg>

              {/* Timer number - CENTER FOCUS */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div
                  className="text-8xl font-black tracking-tighter"
                  style={{
                    color: timeColors.timer,
                    textShadow: `
                      0 0 40px ${timeColors.glow},
                      0 0 20px ${timeColors.glow},
                      0 5px 30px rgba(0, 0, 0, 0.5)
                    `,
                    animation: timePhase === 'critical' ? 'pulse 0.5s infinite' : 'none',
                  }}
                >
                  {timeLeft}
                </div>
                <div
                  className="text-sm font-semibold uppercase tracking-widest mt-2"
                  style={{
                    color: `${timeColors.timer}cc`,
                  }}
                >
                  Seconds
                </div>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute inset-0">
                {[0, 90, 180, 270].map((rotation) => (
                  <div
                    key={rotation}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      background: categoryTheme.primary,
                      top: '10px',
                      left: '50%',
                      transform: `rotate(${rotation}deg) translateY(145px)`,
                      transformOrigin: '50% 145px',
                      boxShadow: `0 0 10px ${categoryTheme.glow}`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Floating progress indicator */}
            <div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full backdrop-blur-xl border"
              style={{
                background: `${timeColors.timer}20`,
                borderColor: `${timeColors.timer}60`,
              }}
            >
              <div className="text-sm font-bold text-white">
                {Math.round(progressPercent)}%
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons section */}
        <div className="space-y-6 mt-8">
          {/* Main action buttons */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <button
              onClick={onGotIt}
              className="group relative px-8 py-5 rounded-2xl font-bold text-xl text-white shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 10px 40px rgba(16, 185, 129, 0.4)',
              }}
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-2xl">✓</span>
                <span>Got It!</span>
              </div>
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-700" />
            </button>

            <button
              onClick={onPass}
              className="group relative px-8 py-5 rounded-2xl font-bold text-xl text-white shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                boxShadow: '0 10px 40px rgba(239, 68, 68, 0.4)',
              }}
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-2xl">✗</span>
                <span>Pass</span>
              </div>
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-700" />
            </button>
          </div>

          {/* Round progress indicator */}
          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border"
              style={{
                background: `${categoryTheme.primary}15`,
                borderColor: `${categoryTheme.primary}40`,
              }}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: totalTurns }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background: i < currentTurn
                        ? categoryTheme.primary
                        : 'rgba(255, 255, 255, 0.2)',
                      boxShadow: i < currentTurn
                        ? `0 0 8px ${categoryTheme.glow}`
                        : 'none',
                    }}
                  />
                ))}
              </div>
              <span
                className="text-sm font-bold"
                style={{ color: categoryTheme.light }}
              >
                {currentTurn} / {totalTurns} Rounds
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Add pulse animation for critical time */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
