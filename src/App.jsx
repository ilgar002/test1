import React, { useEffect, useState } from 'react';

const ShakeDetection = () => {
  const [isShaking, setIsShaking] = useState(false);
  let lastAcceleration = null;

  const handleOrientation = (event) => {
    const { x, y, z } = event.acceleration || event.accelerationIncludingGravity; // Check for both properties

    if (lastAcceleration) {
      const accelerationChange = Math.abs(x - lastAcceleration.x) + Math.abs(y - lastAcceleration.y) + Math.abs(z - lastAcceleration.z);

      if (accelerationChange > THRESHOLD) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), DEBOUNCE_TIME); // Reset shake state after a delay
      }
    }

    lastAcceleration = { x, y, z };
  };

  useEffect(() => {
    window.addEventListener('deviceorientation', handleOrientation);

    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return (
    <div>
      {isShaking ? <p>Shaking!</p>  :<p>no</p> }
      {/* Your component JSX */}
    </div>
  );
};

export default ShakeDetection;
