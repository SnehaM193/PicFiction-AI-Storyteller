import React from 'react';
// Assuming FiSettings is imported in the consuming component (Storyteller) 
// or you have access to it, otherwise we'll remove it from the h2.
import { GiCastle, GiAlienBug, GiSkullCrossedBones, GiMagnifyingGlass, GiCompass } from 'react-icons/gi';

const GENRES = [
  { name: 'Fantasy', icon: GiCastle, description: 'Magical realms & epic quests' },
  { name: 'Mystery', icon: GiMagnifyingGlass, description: 'Puzzles & suspense' },
  { name: 'Horror', icon: GiSkullCrossedBones, description: 'Dark & thrilling tales' },
  { name: 'Scifi', icon: GiAlienBug, description: 'Space & futuristic stories' },
  { name: 'Adventure', icon: GiCompass, description: 'Exciting explorations' },
];

const LENGTHS = [
  { name: 'Short', words: 100, readTime: '30 sec' },
  { name: 'Medium', words: 200, readTime: '1 min' },
  { name: 'Long', words: 300, readTime: '2 min' },
];

const StorySettings = ({ settings, onSettingChange }) => {
  return (
    // Removed the background and shadow here, assuming the parent Card component provides it.
    <div className="space-y-8"> 


      {/* Genre Selection */}
      <section>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Genre</h3>
        <div className="grid grid-cols-2 gap-4"> {/* Adjusted to col-2 for wider buttons like screenshot */}
          {GENRES.map((g) => {
            const isSelected = settings.genre === g.name;
            return (
              <div
                key={g.name}
                onClick={() => onSettingChange('genre', g.name)}
                // Styling the genre boxes to match the screenshot look
                className={`p-4 rounded-xl cursor-pointer border transition-all h-full flex flex-col justify-between 
                  ${isSelected
                    ? 'border-purple-500 bg-purple-50 shadow-md' // Selected: Stronger border, light background
                    : 'border-gray-300 hover:border-purple-400 bg-white' // Default: Clean white, subtle border
                  }`}
              >
                <div className="flex items-center space-x-3 mb-1">
                  {/* Icon color based on selection */}
                  <g.icon className={`w-5 h-5 flex-shrink-0 ${isSelected ? 'text-purple-600' : 'text-gray-600'}`} />
                  {/* Text size and weight based on screenshot */}
                  <span className="font-semibold text-sm text-gray-800">{g.name}</span>
                </div>
                {/* Description size and color */}
                <p className="text-xs text-gray-500">{g.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Story Length */}
      <section>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Story Length</h3>
        <div className="space-y-3">
          {LENGTHS.map((l) => {
            const isSelected = settings.length === l.name;
            return (
              <div
                key={l.name}
                onClick={() => onSettingChange('length', l.name)}
                // Styling the length boxes to match the screenshot look
                className={`p-5 rounded-xl cursor-pointer border transition-all flex justify-between items-center 
                  ${isSelected
                    ? 'border-pink-500 bg-pink-50 shadow-md' // Selected: Pink border, light pink background
                    : 'border-gray-300 hover:border-pink-400 bg-white' // Default: Clean white
                  }`}
              >
                <span className={`font-medium ${isSelected ? 'text-pink-800' : 'text-gray-700'}`}>{l.name}</span>
                <span className={`text-sm ${isSelected ? 'text-pink-600' : 'text-gray-500'}`}>
                  ~{l.words} words • {l.readTime}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default StorySettings;