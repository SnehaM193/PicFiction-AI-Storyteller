import React from 'react';
import Storyteller from './components/Storyteller';
import HowToUse from './components/HowToUse';
import Footer from './components/Footer';

function App() {
  return (
    // Applied a subtle background gradient to the entire app body
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-pink-50/50 font-inter">
      
      {/* Main Content Area: Storyteller will go here */}
      <main className="flex-grow pt-8 pb-16">
        <Storyteller />
      </main>
      
      {/* New UI Sections */}
      <HowToUse />
      <Footer />
    </div>
  );
}

export default App;

