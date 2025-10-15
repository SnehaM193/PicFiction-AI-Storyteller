// src/components/Storyteller.jsx
import React, { useState, useEffect } from 'react';
import { FiBookOpen, FiClock, FiBarChart, FiSun, FiSettings, FiShare2, FiDownload, FiZap, FiKey, FiUser, FiMic } from 'react-icons/fi';
import ImageUploader from './ImageUploader';
import StorySettings from './StorySettings';
import GradientButton from './UI/GradientButton';
import SampleImages from './SampleImages'; 
import IconButton from './UI/IconButton'; // <--- We keep this import
import Card from './UI/Card';
import { generateStory } from '../utils/geminiApi'; 

const INITIAL_SETTINGS = {
  genre: 'Fantasy',
  length: 'Medium',
};

// Check API Key availability once (as done in the utility file)
const VITE_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const Storyteller = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [story, setStory] = useState('');
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('create'); 
  const [isApiKeySet] = useState(!!VITE_KEY);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // --- FUNCTIONALITY: Share and Export ---
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My AI Story from Art Story Bot',
        text: story.substring(0, 150) + '...',
        url: window.location.href,
      }).catch(error => console.error('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(`Check out my AI story generated from art!\n\n${story.substring(0, 500)}...\n\nLink: ${window.location.href}`)
        .then(() => alert('Story copied to clipboard!'))
        .catch(err => console.error('Could not copy text: ', err));
    }
  };

  const handleExportPdf = () => {
    if (!story) return;
    const storyText = story;
    const filename = `AI_Story_${settings.genre}_${Date.now()}.txt`;
    
    const element = document.createElement('a');
    const file = new Blob([storyText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
  };

  const handleGenerateStory = async () => {
    if (!selectedImage) {
      alert('Please upload or select an image first!');
      return;
    }

    setLoading(true);
    setStory(''); 
    
    // Convert length name to word count for API call
    const lengthWords = settings.length === 'Short' ? '100 words' :
                        settings.length === 'Medium' ? '200 words' : '300 words';

    let imageInputForAPI = selectedImage;

    try {
      const generatedText = await generateStory(
        imageInputForAPI, 
        settings.genre,
        lengthWords
      );
      setStory(generatedText);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setStory(`Failed to generate story. Error details: ${error.message || 'Check console for full details.'}`);
    } finally {
      setLoading(false);
    }
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all shadow-md active:scale-[0.98] ${
        activeTab === id
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-pink-500/40'
          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
      }`}
    >
      <Icon className="w-5 h-5 mr-2" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      
      {/* Header and Navigation */}
      <header className="flex justify-between items-center max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
          <FiBookOpen className="w-8 h-8 text-purple-600 mr-2" />
          AI Storyteller
          <span className="ml-3 text-sm text-pink-500 font-medium">
            Transform images into captivating stories with Gemini AI
          </span>
        </h1>
        <div className="flex space-x-2">
          <IconButton><FiSettings className="w-5 h-5" /></IconButton>
          <IconButton><FiSun className="w-5 h-5" /></IconButton>
        </div>
      </header>

      {/* Main Layout Section 1: Upload, Generate, and Story */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        
        {/* Column 1: Image Uploader and Generate Button */}
        <div className="lg:col-span-1 space-y-6">
          <ImageUploader onImageSelect={setSelectedImage} selectedImage={selectedImage} />
          
          <GradientButton 
            onClick={handleGenerateStory} 
            disabled={loading || !selectedImage}
            className="w-full text-lg py-3 rounded-xl shadow-lg flex items-center justify-center"
            fromColor="from-purple-500"
            toColor="to-pink-500"
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : <FiZap className="w-5 h-5 mr-2" />}
            {loading ? 'Generating...' : 'Generate Story'}
          </GradientButton>
        </div>

        {/* Column 2 & 3 (Span 2): Generated Story Display */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Generated Story 📖
            {selectedImage && (
              <span className="ml-2 text-sm text-gray-500 font-normal">
                (Based on: {selectedImage.name || selectedImage.alt || 'Selected Artwork'})
              </span>
            )}
          </h2>
          <Card className="min-h-96 relative p-6">
            {story ? (
              <div className="whitespace-pre-wrap text-lg text-gray-700">
                {story}
              </div>
            ) : loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center h-full text-purple-600 bg-white/70 backdrop-blur-sm z-10 rounded-xl">
                <div className="animate-pulse">
                  <FiBookOpen className="w-16 h-16 text-pink-500" />
                </div>
                <p className="mt-4 text-xl font-medium">AI is crafting your {settings.genre} story...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 min-h-[500px]">
                <FiBookOpen className="w-16 h-16 mb-4" />
                <p className="text-lg">Your story will appear here after creation.</p>
              </div>
            )}
          </Card>
          
          {story && (
            <div className="flex justify-end space-x-4">
              <GradientButton onClick={handleShare} className="flex items-center space-x-2">
                <FiShare2 />
                <span>Share</span>
              </GradientButton>
              <button onClick={handleExportPdf} className="flex items-center px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                <FiDownload />
                <span>Export Text</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- Section 2: Story Settings and Sample Images --- */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Story Customization & Samples</h2>
        
        {/* FIX: Use 12-column grid for 8/4 split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Story Settings: Span 8/12 width (2/3 width) */}
          <div className="lg:col-span-8">
            <Card className="p-8">
              <StorySettings settings={settings} onSettingChange={handleSettingChange} />
            </Card>
          </div>

          {/* Sample Images: Span 4/12 width (1/3 width) */}
          <div className="lg:col-span-4 flex items-start justify-center pt-8">
            <SampleImages onSelect={setSelectedImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storyteller;