"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { EffectsProvider } from "@/components/effects/EffectsProvider";
import { Logo } from "@/components/game/Logo";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import { messages } from "@/i18n/translations";
import { useGameStore } from "@/stores/gameStore";

function PhaseLoading() {
  return (
    <main className="loading-screen" aria-busy="true">
      <Logo />
    </main>
  );
}

const PlayerSetup = dynamic(
  () => import("@/components/game/PlayerSetup").then((module) => module.PlayerSetup),
  { loading: PhaseLoading },
);
const GamePlay = dynamic(
  () => import("@/components/game/GamePlay").then((module) => module.GamePlay),
  { loading: PhaseLoading },
);
const GameOver = dynamic(
  () => import("@/components/game/GameOver").then((module) => module.GameOver),
  { loading: PhaseLoading },
);

export default function NewGamePage() {
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
