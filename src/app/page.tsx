"use client";

import { useEffect } from "react";
import { GameOver } from "@/components/game/GameOver";
import { GamePlay } from "@/components/game/GamePlay";
import { Logo } from "@/components/game/Logo";
import { PlayerSetup } from "@/components/game/PlayerSetup";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import { messages } from "@/i18n/translations";
import { useGameStore } from "@/stores/gameStore";

export default function Home() {
  const game = useGameStore((state) => state.game);
  const language = useGameStore((state) => state.language);
  const hasHydrated = useHasHydrated();
  const activeLanguage = game?.settings.language ?? language;

  useEffect(() => {
    document.documentElement.lang = activeLanguage;
  }, [activeLanguage]);

  if (!hasHydrated) {
    return (
      <main className="loading-screen">
        <Logo />
        <p>{messages[language].setup.tagline}</p>
      </main>
    );
  }

  if (!game) return <PlayerSetup />;
  if (game.phase === "gameOver") return <GameOver />;
  return <GamePlay key={`${game.id}-${game.currentRound}`} />;
}
