import React, { useState, useEffect, useRef } from 'react';

const VideoBox = ({ openDialogBox, setopenDialogBox, urls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  
  // Convert single string to array if needed
  const videoUrls = Array.isArray(urls) ? urls : [urls];
  
  // Reset video and state when dialog opens or when urls change
  useEffect(() => {
    if (openDialogBox) {
      setCurrentIndex(0);
      setIsPlaying(false);
      
      // Reset the video element when opened
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        
        // Force video element to reload source
        videoRef.current.load();
      }
    }
  }, [openDialogBox, urls]);

  // Handle video switching
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      
      // Force video element to reload source
      videoRef.current.load();
    }
  }, [currentIndex]);

  // Handle next and previous navigation
  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videoUrls.length) % videoUrls.length);
  };

  if (!openDialogBox) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-gray-900 rounded-xl shadow-2xl w-11/12 max-w-5xl h-5/6 flex flex-col overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="bg-gray-800 py-3 px-6 flex justify-between items-center border-b border-gray-700">
          <h3 className="text-white font-medium">
            Video {currentIndex + 1} of {videoUrls.length}
          </h3>
          <button 
            onClick={() => setopenDialogBox(false)}
            className="text-gray-400 hover:text-white text-xl"
          >
            ×
          </button>
        </div>
        
        {/* Dialog Body */}
        <div className="flex-1 p-4 flex items-center justify-center bg-black overflow-hidden">
          {videoUrls && videoUrls.length > 0 ? (
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  className="max-h-full max-w-full object-contain"
                  controls
                  autoPlay={false}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  key={`video-${currentIndex}-${openDialogBox}`} // Adding a key helps force re-render
                >
                  <source src={videoUrls[currentIndex]} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              {/* Carousel Controls - only show if multiple videos */}
              {videoUrls.length > 1 && (
                <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex items-center justify-between px-4 pointer-events-none">
                  <button 
                    onClick={prevVideo}
                    className="bg-black bg-opacity-60 text-white rounded-full w-12 h-12 flex items-center justify-center pointer-events-auto hover:bg-opacity-80 transition-all"
                  >
                    &lt;
                  </button>
                  <button 
                    onClick={nextVideo}
                    className="bg-black bg-opacity-60 text-white rounded-full w-12 h-12 flex items-center justify-center pointer-events-auto hover:bg-opacity-80 transition-all"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-white text-center">No videos to display</p>
          )}
        </div>
        
        {/* Thumbnail Navigation */}
        {videoUrls.length > 1 && (
          <div className="bg-gray-800 p-3 flex items-center justify-center gap-2 overflow-x-auto">
            {videoUrls.map((url, index) => (
              <div 
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-16 h-16 flex-shrink-0 cursor-pointer rounded overflow-hidden border-2 ${
                  currentIndex === index ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-xs text-white">Video {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Dialog Footer */}
        <div className="p-4 flex justify-center bg-gray-800 border-t border-gray-700">
          <button
            onClick={() => setopenDialogBox(false)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoBox;