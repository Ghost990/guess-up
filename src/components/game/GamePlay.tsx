"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Eye, EyeOff, SkipForward } from "lucide-react";
import { EffectsSettings } from "@/components/effects/EffectsSettings";
import { useEffects } from "@/components/effects/EffectsProvider";
import { CategoryBadge } from "./CategoryBadge";
import { HowToPlay } from "./HowToPlay";
import { Logo } from "./Logo";
import { RoundResultScreen } from "./RoundResultScreen";
import { Scoreboard } from "./Scoreboard";
import { ScoringDialog } from "./ScoringDialog";
import { TimerDial } from "./TimerDial";
import { WordAssist } from "./WordAssist";
import { messages } from "@/i18n/translations";
import { useGameStore } from "@/stores/gameStore";

function getRemainingMs(
  phase: "playing" | "paused",
  roundEndsAt: number | null,
  pausedRemainingMs: number | null,
): number {
  if (phase === "paused") return pausedRemainingMs ?? 0;
  return Math.max(0, (roundEndsAt ?? Date.now()) - Date.now());
}

export function GamePlay() {
  const game = useGameStore((state) => state.game);
  const startPlaying = useGameStore((state) => state.startPlaying);
  const pauseRound = useGameStore((state) => state.pauseRound);
  const resumeRound = useGameStore((state) => state.resumeRound);
  const endRound = useGameStore((state) => state.endRound);
  const { trigger } = useEffects();
  const [revealedRoundKey, setRevealedRoundKey] = useState<string | null>(null);
  const [shownRoundKey, setShownRoundKey] = useState<string | null>(null);
  const [scoringOpen, setScoringOpen] = useState(game?.phase === "paused");
  const [remainingMs, setRemainingMs] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false);
  const lastCountdownSecond = useRef<number | null>(null);
  const timeoutEffectPlayed = useRef(false);

  const currentPlayer = game?.players[game.currentPlayerIndex];
  const language = game?.settings.language ?? "hu";
  const copy = messages[language];
  const roundKey = game ? `${game.id}:${game.currentRound}` : null;
  const wordRevealed = revealedRoundKey === roundKey;
  const showWord = shownRoundKey === roundKey;

  useEffect(() => {
    if (!game || (game.phase !== "playing" && game.phase !== "paused")) return;
    const phase = game.phase;
    const update = () => {
      const nextRemaining = getRemainingMs(
        phase,
        game.roundEndsAt,
        game.pausedRemainingMs,
      );
      setRemainingMs(nextRemaining);
      if (phase === "playing" && nextRemaining <= 0) setTimerExpired(true);
    };
    update();
    if (phase === "paused") return;
    const interval = window.setInterval(update, 250);
    return () => window.clearInterval(interval);
  }, [game]);

  const timeExpired = game?.phase === "playing" && timerExpired;
  const remainingSeconds = Math.ceil(remainingMs / 1000);
  const importantTimeAnnouncement =
    remainingSeconds === 10 || remainingSeconds === 5 ? `${remainingSeconds}` : "";

  useEffect(() => {
    if (game?.phase !== "playing") return;
    if (
      remainingSeconds > 0 &&
      remainingSeconds <= 5 &&
      lastCountdownSecond.current !== remainingSeconds
    ) {
      lastCountdownSecond.current = remainingSeconds;
      trigger("countdown");
    }
    if (timerExpired && !timeoutEffectPlayed.current) {
      timeoutEffectPlayed.current = true;
      trigger("timeout");
    }
  }, [game?.phase, remainingSeconds, timerExpired, trigger]);

  if (!game || !currentPlayer) return null;
  if (game.phase === "roundEnd") return <RoundResultScreen />;

  const roundNumber = game.currentRound + 1;
  const progressLabel = `${copy.common.round} ${roundNumber} / ${game.settings.totalRounds}`;

  if (game.phase === "wordReveal" && !wordRevealed) {
    return (
      <main className="handoff-screen" data-category={game.currentCategory}>
        <div className="handoff-content">
          <span className="privacy-label"><EyeOff aria-hidden="true" />{copy.ready.privateLabel}</span>
          <CategoryBadge
            category={game.currentCategory}
            language={language}
            showInstruction
          />
          <p className="round-progress">{progressLabel}</p>
          <h1>{copy.ready.title(currentPlayer.name)}</h1>
          <p>{copy.ready.subtitle}</p>
          <button
            className="primary-button"
            type="button"
            onClick={() => setRevealedRoundKey(roundKey)}
          >
            <Eye aria-hidden="true" size={20} />
            {copy.ready.reveal}
          </button>
        </div>
      </main>
    );
  }

  if (game.phase === "wordReveal") {
    return (
      <main className="reveal-screen" data-category={game.currentCategory}>
        <div className="reveal-content">
          <CategoryBadge category={game.currentCategory} language={language} />
          <p>{copy.reveal.label}</p>
          <h1>{game.currentWord.text}</h1>
          <p className="category-instruction">
            {copy.categories[game.currentCategory].instruction}
          </p>
          <WordAssist word={game.currentWord} language={language} />
          <button
            className="primary-button primary-button--inverse"
            onClick={() => {
              trigger("roundStart");
              startPlaying();
            }}
          >
            {copy.reveal.startNow}
            <Check aria-hidden="true" size={20} />
          </button>
        </div>
      </main>
    );
  }

  const openScoring = () => {
    if (game.phase !== "playing") return;
    pauseRound();
    setScoringOpen(true);
  };

  const cancelScoring = () => {
    resumeRound();
    setScoringOpen(false);
  };

  const completeRound = (success: boolean, guesserId?: string) => {
    if (success) trigger("correct");
    else if (!timeExpired) trigger("pass");
    endRound(success, guesserId, timeExpired ? "timedOut" : "passed");
  };

  return (
    <main className="game-page">
      <header className="game-topbar">
        <Logo compact />
        <div className="game-topbar__meta">
          <EffectsSettings language={language} compact />
          <HowToPlay language={language} compact />
          <span>{progressLabel}</span>
        </div>
      </header>

      <div className="play-layout">
        <section className="play-stage" aria-labelledby="play-title">
          <CategoryBadge
            category={game.currentCategory}
            language={language}
            showInstruction
          />
          <h1 id="play-title">{copy.play.presenter(currentPlayer.name)}</h1>

          <TimerDial
            remainingMs={remainingMs}
            totalMs={game.settings.roundDuration}
            label={copy.setup.duration}
            unit={copy.setup.seconds}
          />
          <span className="sr-only" aria-live="polite">{importantTimeAnnouncement}</span>

          <button
            type="button"
            className="peek-button"
            aria-pressed={showWord}
            aria-controls="active-task-card"
            onClick={() => setShownRoundKey((current) => (current === roundKey ? null : roundKey))}
          >
            {showWord ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
            {showWord ? copy.play.hideWord : copy.play.peek}
          </button>

          <section
            id="active-task-card"
            className="active-task-card"
            aria-live="polite"
            aria-atomic="true"
          >
            {showWord ? <p>{game.currentWord.text}</p> : <p>{copy.play.wordHidden}</p>}
          </section>

          <div className="play-actions">
            <button className="primary-button" type="button" onClick={openScoring}>
              <Check aria-hidden="true" size={22} />
              {copy.play.gotIt}
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={() => completeRound(false)}
            >
              <SkipForward aria-hidden="true" size={21} />
              {copy.play.pass}
            </button>
          </div>
        </section>

        <Scoreboard players={game.players} language={language} />
      </div>

      <ScoringDialog
        open={scoringOpen || timeExpired}
        players={game.players}
        presenterId={currentPlayer.id}
        language={language}
        timeExpired={timeExpired}
        onSelect={(playerId) => completeRound(true, playerId)}
        onNoOne={() => completeRound(false)}
        onCancel={cancelScoring}
      />
    </main>
  );
}
