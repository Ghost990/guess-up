import { memo } from "react";
import { messages } from "@/i18n/translations";
import type { Language, Player } from "@/types";

interface ScoreboardProps {
  players: Player[];
  language: Language;
  title?: string;
  compact?: boolean;
  collapsible?: boolean;
}

export const Scoreboard = memo(function Scoreboard({
  players,
  language,
  title,
  compact = false,
  collapsible = false,
}: ScoreboardProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  const copy = messages[language];
  const heading = title ?? copy.result.standings;
  const leader = sorted[0];
  const playerList = (
    <ol>
      {sorted.map((player, index) => (
        <li key={player.id}>
          <span className="scoreboard__rank">{index + 1}</span>
          <span className="scoreboard__name">{player.name}</span>
          <strong>
            {player.score} <span>{copy.common.points}</span>
          </strong>
        </li>
      ))}
    </ol>
  );

  if (collapsible) {
    return (
      <details className="scoreboard scoreboard--collapsible">
        <summary>
          <h2>{heading}</h2>
          {leader ? (
            <p>
              <strong>{leader.name}</strong>
              <span>{leader.score} {copy.common.points}</span>
            </p>
          ) : null}
        </summary>
        <div className="scoreboard__body">{playerList}</div>
      </details>
    );
  }

  return (
    <section className={compact ? "scoreboard scoreboard--compact" : "scoreboard"}>
      <h2>{heading}</h2>
      {playerList}
    </section>
  );
});
