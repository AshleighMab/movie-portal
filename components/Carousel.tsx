import React, { useEffect, useRef } from 'react';
import Flipster from 'react-flipster';

const AutomaticCarousel = ({ images, interval }) => {
  const flipsterRef = useRef(null);

  useEffect(() => {
    let timerId = null;

    const startAutoFlip = () => {
      timerId = setInterval(() => {
        flipsterRef.current.next();
      }, interval);
    };

    const stopAutoFlip = () => {
      clearInterval(timerId);
    };

    startAutoFlip();

    return () => {
      stopAutoFlip();
    };
  }, [interval]);

  return (
    <Flipster ref={flipsterRef}>
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Image ${index}`} />
      ))}
    </Flipster>
  );
};

export default AutomaticCarousel;
