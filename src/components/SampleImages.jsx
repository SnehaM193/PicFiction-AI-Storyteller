import React from 'react';

const SAMPLE_IMAGES = [
  { id: 1, src: 'samples/compass.jpeg', alt: 'A mystical compass pointing towards a hidden castle.' },
  { id: 2, src: 'samples/the castle.jpeg', alt: 'A brooding, gothic castle under a stormy sky.' },
  { id: 3, src: 'samples/download.jpeg', alt: 'A futuristic cityscape at night.' },
  { id: 4, src: 'samples/himalayas.jpeg', alt: 'An enchanted forest with glowing plants and magical creatures.' },
];

const SampleImages = ({ onSelect }) => {
  
  const handleSelect = (image) => {
    onSelect(image);
  };

  return (
    <div className="flex flex-col items-center w-full"> 
      <h3 className="text-lg font-semibold text-black mb-4">Sample Images ✨</h3> {/* Changed to white for Dark Mode contrast */}
      
      {/* 💥 MODIFICATION: Increased max-width for each image container 💥 */}
      <div className="grid grid-cols-2 gap-4 justify-items-center">
        {SAMPLE_IMAGES.map((img) => (
          <div
            key={img.id}
            onClick={() => handleSelect(img)}
            // Increased the fixed size to make them larger
            className="relative w-full h-auto cursor-pointer rounded-xl overflow-hidden shadow-xl border border-gray-700 transition-transform hover:scale-[1.05] hover:shadow-2xl"
            // Set a larger max width for a bigger overall presentation
            style={{ maxWidth: '200px', aspectRatio: '3/4' }} 
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            <span className="absolute bottom-2 right-2 text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full font-medium">
              Use
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleImages;