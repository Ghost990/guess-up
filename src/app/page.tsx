"use client";

import { useEffect } from "react";
import { EffectsProvider } from "@/components/effects/EffectsProvider";
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

  let content;

  if (!hasHydrated) {
    content = (
      <main className="loading-screen">
        <Logo />
        <p>{messages[language].setup.tagline}</p>
      </main>
    );
  } else if (!game) {
    content = <PlayerSetup />;
  } else if (game.phase === "gameOver") {
    content = <GameOver />;
  } else {
    content = <GamePlay key={`${game.id}-${game.currentRound}`} />;
  }

  return <EffectsProvider>{content}</EffectsProvider>;
}
