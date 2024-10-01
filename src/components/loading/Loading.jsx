import React, { useEffect, useState } from 'react';

const Loading = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100; // Stop at 100%
        }
        return prev + 1; // Increment by 1
      });
    }, 30); // Adjust the speed of loading (higher = faster)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="loading-container flex items-center justify-center h-screen relative overflow-hidden">
      <div className="box">
        <div className="percent">
          <div className="percentNum" id="count">{percentage}</div>
          <div className="percentB">%</div>
        </div>
        <div id="water" className="water" style={{ height: `${percentage}%` }}>
          <svg viewBox="0 0 560 20" className="water_wave water_wave_back">
            <defs>
              <path
                id="wave"
                d="M0 10 C 40 0, 80 20, 120 10 S 200 0, 240 10 S 320 20, 360 10 S 440 0, 480 10 S 560 20, 600 10"
              />
            </defs>
            <use xlinkHref="#wave" />
          </svg>
          <svg viewBox="0 0 560 20" className="water_wave water_wave_front">
            <use xlinkHref="#wave" />
          </svg>
        </div>
      </div>

      {/* Bubbles Animation */}
      <div className="bubbles">
        <div className="bubble2"></div>
        <div className="bubble2"></div>
        <div className="bubble2"></div>
        <div className="bubble2"></div>
      </div>
    </div>
  );
};

export default Loading;
