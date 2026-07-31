import { PencilGlyph, SignalGlyph, SpeakGlyph } from "@/components/icons";
import { messages } from "@/i18n/translations";
import type { Category, Language } from "@/types";

const icons = {
  draw: PencilGlyph,
  explain: SpeakGlyph,
  signal: SignalGlyph,
};

interface CategoryBadgeProps {
  category: Category;
  language: Language;
  showInstruction?: boolean;
}

export function CategoryBadge({
  category,
  language,
  showInstruction = false,
}: CategoryBadgeProps) {
  const Icon = icons[category];
  const copy = messages[language].categories[category];

  return (
    <div className="category-line" data-category={category}>
      <span className="category-badge">
        <Icon aria-hidden="true" size={17} />
        {copy.label}
      </span>
      {showInstruction && <p>{copy.instruction}</p>}
    </div>
  );
}
