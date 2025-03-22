
import React from 'react';

interface SuggestionChipsProps {
  topics: string[];
  onSelectSuggestion: (suggestion: string) => void;
}

const SuggestionChips = ({ topics, onSelectSuggestion }: SuggestionChipsProps) => {
  return (
    <div className="px-4 mb-4">
      <p className="text-sm text-foreground/60 mb-2">Choose your challenge:</p>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <button
            key={index}
            onClick={() => onSelectSuggestion(topic)}
            className="text-xs md:text-sm px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionChips;
