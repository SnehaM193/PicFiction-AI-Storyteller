import React from 'react';
// Fixing the import error: LuSliders is replaced with LuSettings
import { LuImage, LuSettings, LuZap, LuShare2 } from 'react-icons/lu';

const steps = [
  {
    icon: LuImage,
    title: "Step 1: Upload Image",
    description: "Choose an image from your device or select from our samples.",
    color: "text-purple-600",
    bg: "bg-gradient-to-br from-purple-100 to-pink-100",
    iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    icon: LuSettings, // Changed from LuSliders to LuSettings to fix the export error
    title: "Step 2: Customize",
    description: "Select your preferred genre and story length.",
    color: "text-orange-600",
    bg: "bg-gradient-to-br from-pink-100 to-orange-100",
    iconBg: "bg-gradient-to-br from-red-500 to-orange-500",
  },
  {
    icon: LuZap,
    title: "Step 3: Generate",
    description: "Let AI create a unique story based on your image.",
    color: "text-yellow-600",
    bg: "bg-gradient-to-br from-orange-100 to-yellow-100",
    iconBg: "bg-gradient-to-br from-orange-400 to-yellow-400",
  },
  {
    icon: LuShare2,
    title: "Step 4: Enjoy & Share",
    description: "Listen, rate, export, or share your personalized story.",
    color: "text-blue-600",
    bg: "bg-gradient-to-br from-blue-100 to-indigo-100",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-500",
  },
];

const HowToUse = () => {
  return (
    <section 
      id="how-to-use" 
      // Using a subtle gradient background to match the overall feel
      className="py-16 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-pink-500 text-center tracking-tight mb-2">
          How It Works ✨
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Four simple steps to create your story
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-xl border border-gray-100 transition-all duration-500 transform hover:shadow-2xl"
            >
              {/* Icon Container with Gradient Background */}
              <div 
                className={`flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-md text-white ${step.iconBg}`}
              >
                {/* Dynamically rendered icon component */}
                <step.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        
        {/* Features callout, similar to the screenshot's footer */}
        <div className="text-center mt-16 text-gray-500 text-sm font-medium">
          <p className="inline-block py-1 px-3 rounded-full border border-gray-200 bg-white shadow-sm">
            <span className="text-pink-500 mr-1">Built with</span> React, Tailwind CSS &  AI✨
          </p>
        </div>

      </div>
    </section>
  );
};

export default HowToUse;