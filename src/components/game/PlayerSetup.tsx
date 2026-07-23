"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, Check, Clock3, Layers3, Plus, Trash2, Users } from "lucide-react";
import { CategoryBadge } from "./CategoryBadge";
import { HowToPlay } from "./HowToPlay";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";
import { messages } from "@/i18n/translations";
import { useGameStore } from "@/stores/gameStore";
import type { Category, Difficulty } from "@/types";

const PLAYER_STORAGE_KEY = "guessup-player-names";
const roundOptions = [1, 2, 3, 4] as const;
const durationOptions = [30000, 45000, 60000, 90000] as const;
const standardDifficultyOptions: Difficulty[] = ["easy", "medium", "hard"];
const englishDifficultyOptions: Difficulty[] = [
  "lowEnglish",
  ...standardDifficultyOptions,
];
const categoryOptions: Category[] = ["draw", "explain", "signal"];

interface PlayerDraft {
  id: string;
  name: string;
}

let nextDraftId = 0;

function createDraft(name = ""): PlayerDraft {
  nextDraftId += 1;
  return { id: `player-draft-${nextDraftId}`, name };
}

function loadSavedPlayers(): PlayerDraft[] {
  if (typeof window === "undefined") return [createDraft(), createDraft()];
  try {
    const value = JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY) ?? "null");
    if (Array.isArray(value) && value.length >= 2) {
      return value.slice(0, 8).map((name) => createDraft(String(name)));
    }
  } catch {
    // A malformed convenience value should never block game setup.
  }
  return [createDraft(), createDraft()];
}

export function PlayerSetup() {
  const language = useGameStore((state) => state.language);
  const setLanguage = useGameStore((state) => state.setLanguage);
  const setupGame = useGameStore((state) => state.setupGame);
  const [players, setPlayers] = useState(loadSavedPlayers);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [roundsPerPlayer, setRoundsPerPlayer] = useState(2);
  const [roundDuration, setRoundDuration] =
    useState<(typeof durationOptions)[number]>(60000);
  const [categories, setCategories] = useState<Category[]>(categoryOptions);
  const copy = messages[language];
  const difficultyOptions =
    language === "en" ? englishDifficultyOptions : standardDifficultyOptions;

  const validNames = players.map((player) => player.name.trim()).filter(Boolean);
  const hasDuplicates =
    new Set(validNames.map((name) => name.toLocaleLowerCase(language))).size !==
    validNames.length;
  const canStart = validNames.length >= 2 && !hasDuplicates && categories.length > 0;
  const totalTasks = validNames.length * roundsPerPlayer;

  useEffect(() => {
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(validNames));
  }, [validNames]);

  const updatePlayer = (index: number, value: string) => {
    setPlayers((drafts) =>
      drafts.map((draft, playerIndex) =>
        playerIndex === index ? { ...draft, name: value } : draft,
      ),
    );
  };

  const removePlayer = (index: number) => {
    setPlayers((drafts) => drafts.filter((_, playerIndex) => playerIndex !== index));
  };

  const toggleCategory = (category: Category) => {
    setCategories((current) => {
      if (current.includes(category)) {
        return current.length === 1 ? current : current.filter((item) => item !== category);
      }
      return categoryOptions.filter((item) => [...current, category].includes(item));
    });
  };

  const handleLanguageChange = (nextLanguage: typeof language) => {
    if (nextLanguage === "hu" && difficulty === "lowEnglish") {
      setDifficulty("easy");
    }
    setLanguage(nextLanguage);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canStart) return;
    setupGame({
      playerNames: validNames,
      difficulty,
      roundsPerPlayer,
      roundDuration,
      language,
      categories,
    });
  };

  return (
    <main className="setup-page">
      <header className="topbar">
        <Logo />
        <div className="topbar-actions">
          <HowToPlay language={language} />
          <LanguageSwitch language={language} onChange={handleLanguageChange} />
        </div>
      </header>

      <div className="setup-layout">
        <section className="setup-intro" aria-labelledby="setup-title">
          <p className="setup-tagline">{copy.setup.tagline}</p>
          <h1 id="setup-title">{copy.setup.title}</h1>
          <p className="setup-subtitle">{copy.setup.subtitle}</p>

          <div className="rules-list">
            <h2>{copy.setup.rulesTitle}</h2>
            <ol>
              {copy.setup.rules.map((rule, index) => (
                <li key={rule}>
                  <span>{index + 1}</span>
                  <p>{rule}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <form className="setup-form" onSubmit={handleSubmit}>
          <section className="form-section" aria-labelledby="players-title">
            <div className="section-heading">
              <span className="section-icon"><Users aria-hidden="true" size={19} /></span>
              <div>
                <h2 id="players-title">{copy.setup.players}</h2>
                <p>{copy.setup.minPlayers}</p>
              </div>
              <strong>{validNames.length}/8</strong>
            </div>

            <div className="player-list">
              {players.map((player, index) => (
                <div className="player-field" key={player.id}>
                  <span aria-hidden="true">{index + 1}</span>
                  <label className="sr-only" htmlFor={`player-${index}`}>
                    {copy.setup.playerPlaceholder} {index + 1}
                  </label>
                  <input
                    id={`player-${index}`}
                    value={player.name}
                    maxLength={20}
                    autoComplete="off"
                    placeholder={`${copy.setup.playerPlaceholder} ${index + 1}`}
                    onChange={(event) => updatePlayer(index, event.target.value)}
                  />
                  {players.length > 2 && (
                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`${copy.setup.removePlayer}: ${player.name || index + 1}`}
                      onClick={() => removePlayer(index)}
                    >
                      <Trash2 aria-hidden="true" size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {hasDuplicates && <p className="form-error">{copy.setup.duplicateNames}</p>}
            {players.length < 8 && (
              <button
                type="button"
                className="text-button"
                onClick={() => setPlayers((drafts) => [...drafts, createDraft()])}
              >
                <Plus aria-hidden="true" size={18} />
                {copy.setup.addPlayer}
              </button>
            )}
          </section>

          <section className="form-section" aria-labelledby="difficulty-title">
            <div className="form-section-heading">
              <h2 id="difficulty-title">{copy.setup.difficulty}</h2>
            </div>
            <div
              className="segmented-grid segmented-grid--difficulty"
              role="radiogroup"
              aria-labelledby="difficulty-title"
            >
              {difficultyOptions.map((option) => {
                const optionCopy = copy.setup.difficultyOptions[option];
                return (
                  <label key={option}>
                    <input
                      type="radio"
                      name="difficulty"
                      value={option}
                      checked={difficulty === option}
                      onChange={() => setDifficulty(option)}
                    />
                    <span>
                      <strong>{optionCopy.label}</strong>
                      <small>{optionCopy.description}</small>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          <section
            className="form-section"
            role="group"
            aria-labelledby="language-title"
          >
            <div className="form-section-heading">
              <h2 id="language-title">{copy.setup.gameLanguage}</h2>
              <p className="field-hint">{copy.setup.languageHint}</p>
            </div>
            <LanguageSwitch language={language} onChange={handleLanguageChange} />
          </section>

          <section
            className="form-section"
            role="group"
            aria-labelledby="rounds-title"
          >
            <div className="form-section-heading">
              <h2 id="rounds-title">{copy.setup.roundsPerPlayer}</h2>
              <p className="field-hint">{copy.setup.roundsHint}</p>
            </div>
            <div className="choice-row">
              {roundOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={roundsPerPlayer === option}
                  onClick={() => setRoundsPerPlayer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="selection-summary">
              <Layers3 aria-hidden="true" size={17} />
              {copy.setup.totalTasks(totalTasks)}
            </p>
          </section>

          <section
            className="form-section"
            role="group"
            aria-labelledby="duration-title"
          >
            <div className="form-section-heading">
              <h2 id="duration-title">{copy.setup.duration}</h2>
            </div>
            <div className="choice-row choice-row--duration">
              {durationOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={roundDuration === option}
                  onClick={() => setRoundDuration(option)}
                >
                  <Clock3 aria-hidden="true" size={16} />
                  {option / 1000} {copy.setup.seconds}
                </button>
              ))}
            </div>
          </section>

          <section
            className="form-section"
            role="group"
            aria-labelledby="categories-title"
          >
            <div className="form-section-heading">
              <h2 id="categories-title">{copy.setup.categories}</h2>
            </div>
            <div className="category-choices">
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  type="button"
                  data-category={category}
                  aria-pressed={categories.includes(category)}
                  onClick={() => toggleCategory(category)}
                >
                  <CategoryBadge category={category} language={language} />
                  {categories.includes(category) && <Check aria-hidden="true" size={18} />}
                </button>
              ))}
            </div>
          </section>

          <div className="start-area">
            <button className="primary-button" type="submit" disabled={!canStart}>
              {copy.setup.start}
              <ArrowRight aria-hidden="true" size={20} />
            </button>
            {!canStart && !hasDuplicates && <p>{copy.setup.startHint}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}
