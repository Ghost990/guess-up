"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, Trophy } from "lucide-react";
import { useEffects } from "@/components/effects/EffectsProvider";
import { PackScene } from "@/components/illustrations";
import { GameNightRecap } from "@/components/recap/GameNightRecap";
import { taskPackRegistry } from "@/content/packs";
import { buildGameNightRecap } from "@/lib/recap/buildGameNightRecap";
import {
  copyRecapText,
  createRecapPng,
  downloadBlob,
  shareRecapNative,
} from "@/lib/recap/browserRecapShare";
import { RECAP_EVENT_SCHEMA_VERSION } from "@/types/recap";
import { Scoreboard } from "./Scoreboard";
import { messages } from "@/i18n/translations";
import { useGameStore } from "@/stores/gameStore";

export function GameOver() {
  const game = useGameStore((state) => state.game);
  const roundHistory = useGameStore((state) => state.roundHistory);
  const resetGame = useGameStore((state) => state.resetGame);
  const { capabilities, trigger } = useEffects();
  const winnerTriggered = useRef(false);
  const [shareCapabilities, setShareCapabilities] = useState({
    nativeShare: false,
    pngDownload: false,
    textShare: false,
  });
  const recap = useMemo(() => {
    if (!game || roundHistory.length === 0) return null;
    return buildGameNightRecap({
      schemaVersion: RECAP_EVENT_SCHEMA_VERSION,
      gameId: game.id,
      language: game.settings.language,
      startedAt: game.startedAt,
      endedAt: game.endedAt ?? game.startedAt,
      players: game.players.map(({ id, name, score }) => ({ id, name, score })),
      rounds: roundHistory,
    });
  }, [game, roundHistory]);

  useEffect(() => {
    if (!game || game.phase !== "gameOver" || winnerTriggered.current) return;
    winnerTriggered.current = true;
    trigger("winner");
  }, [game, trigger]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setShareCapabilities({
        nativeShare: typeof navigator.share === "function",
        pngDownload: typeof document.createElement("canvas").toBlob === "function",
        textShare: typeof navigator.clipboard?.writeText === "function",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!game) return null;

  const language = game.settings.language;
  const copy = messages[language];
  const sorted = [...game.players].sort((a, b) => b.score - a.score);
  const leaders = sorted.filter((player) => player.score === sorted[0]?.score);
  const selectedPack = game.settings.packId
    ? taskPackRegistry.getById(game.settings.packId)
    : null;

  return (
    <main className="game-over-page">
      <section
        className="winner-panel"
        aria-labelledby="game-over-title"
        data-celebrate={!capabilities.reducedMotion}
      >
        {selectedPack ? (
          <div className="winner-pack-art" aria-hidden="true">
            <PackScene
              coverAsset={selectedPack.visualTheme.coverAsset}
              variant="recap"
            />
          </div>
        ) : null}
        <span className="winner-icon"><Trophy aria-hidden="true" /></span>
        <p>{copy.gameOver.title}</p>
        <h1 id="game-over-title">
          {leaders.length > 1 ? copy.gameOver.tie : copy.gameOver.winner(leaders[0].name)}
        </h1>
        <span>{copy.gameOver.tasksPlayed(roundHistory.length)}</span>
        <button className="primary-button" type="button" onClick={resetGame}>
          <RotateCcw aria-hidden="true" size={20} />
          {copy.common.playAgain}
        </button>
      </section>

      <Scoreboard
        players={game.players}
        language={language}
        title={copy.gameOver.finalStandings}
      />

      {recap ? (
        <div className="game-over-recap">
          <GameNightRecap
            recap={recap}
            labels={copy.gameOver.recap}
            shareCapabilities={shareCapabilities}
            shareCallbacks={{
              onNativeShare: () => shareRecapNative(recap),
              onDownloadPng: async () => {
                const blob = await createRecapPng(recap);
                downloadBlob(blob, `game-night-recap-${recap.gameId}.png`);
              },
              onShareText: () => copyRecapText(recap),
            }}
          />
        </div>
      ) : null}
    </main>
  );
}
