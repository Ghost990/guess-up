import { messages } from "@/i18n/translations";
import type { Language, Player } from "@/types";

interface ScoreboardProps {
  players: Player[];
  language: Language;
  title?: string;
  compact?: boolean;
}

export function Scoreboard({
  players,
  language,
  title,
  compact = false,
}: ScoreboardProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  const copy = messages[language];

  return (
    <section className={compact ? "scoreboard scoreboard--compact" : "scoreboard"}>
      <h2>{title ?? copy.result.standings}</h2>
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
    </section>
  );
}
