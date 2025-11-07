/**
 * GuessUp - Timer Types
 * Server-authoritative timer state definitions
 */

import { GamePhase } from './game';

/**
 * Timer state interface
 * Represents server-authoritative timer state
 */
export interface Timer {
  /** Server timestamp (milliseconds since epoch) */
  serverTime: number;

  /** When current phase started (server time) */
  phaseStartTime: number;

  /** Total duration of current phase (milliseconds) */
  phaseDuration: number;

  /** Remaining time (milliseconds) */
  remainingMs: number;

  /** Is timer paused */
  isPaused: boolean;

  /** Timestamp when paused (null if not paused) */
  pausedAt: number | null;
}

/**
 * Timer update message from server
 * Broadcast every 100ms during active round
 */
export interface TimerUpdate {
  /** Current server timestamp */
  serverTime: number;

  /** Milliseconds remaining in phase */
  remainingMs: number;

  /** Game phase (for validation) */
  phase: GamePhase;

  /** Sequence number (for detecting missed messages) */
  sequence: number;
}

/**
 * Timer synchronization status
 * Tracks client-server sync quality
 */
export interface TimerSyncStatus {
  /** Is client synchronized with server */
  synchronized: boolean;

  /** Drift amount (ms) - positive means client ahead */
  driftMs: number;

  /** Last successful sync timestamp */
  lastSyncAt: number;

  /** Number of missed server updates */
  missedUpdates: number;

  /** Network latency estimate (ms) */
  latencyMs: number;
}

/**
 * Timer configuration constants
 */
export const TIMER_CONFIG = {
  /** Server broadcast interval (ms) */
  BROADCAST_INTERVAL: 100,

  /** Client animation frame rate (fps) */
  CLIENT_FPS: 60,

  /** Maximum acceptable drift before hard sync (ms) */
  MAX_DRIFT_MS: 500,

  /** Time to show word to active player (ms) */
  WORD_REVEAL_DURATION: 3000,

  /** Round duration options (ms) */
  ROUND_DURATIONS: {
    SHORT: 30000,    // 30 seconds
    MEDIUM: 60000,   // 60 seconds
    LONG: 90000,     // 90 seconds
  },

  /** Final seconds for visual warning */
  WARNING_THRESHOLD: 10000,  // 10 seconds

  /** Critical final seconds */
  CRITICAL_THRESHOLD: 5000,  // 5 seconds
} as const;
