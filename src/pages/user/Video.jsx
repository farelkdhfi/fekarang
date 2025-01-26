import React, { useState } from 'react';
import videoSource from '../../assets/videoprofil.mp4';

const Video = () => {
  const [showLink, setShowLink] = useState(false);

  const handleVideoEnd = () => {
    setShowLink(true);
  };

  return (
    <div className="relative w-full h-auto bg-white">
      {/* Video Section */}
      <video
        autoPlay
        loop={false} // Jangan loop agar bisa mendeteksi akhir video
        playsInline
        className="w-full h-full object-cover mt-24"
        onEnded={handleVideoEnd}
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>


      {/* Show Link After Video Ends */}
      {showLink && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70">
          <a
            href="https://youtu.be/z330wa2ND6A?si=dPRSDJNWJdaRD_65"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300"
          >
            Watch Full on YouTube
          </a>
        </div>
      )}
    </div>
  );
};

export default Video;
