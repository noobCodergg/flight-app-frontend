import React, { useEffect, useState } from 'react';
import image from '../Media/regimg.jpg';

function RegistrationImage() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation when the component mounts
    setTimeout(() => setAnimate(true), 200); // Adjust the delay if needed
  }, []);

  return (
    <div
      className={`h-auto w-1/2 hidden md:flex items-center justify-center
        transform transition-transform duration-700 overflow-hidden${
          animate ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <img src={image} alt="Registration" className='h-full '/>
    </div>
  );
}

export default RegistrationImage;

