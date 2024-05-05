import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseHover = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseHover);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <CursorWrapper className={'custom-cursor'} style={{ left: cursorPosition.x, top: cursorPosition.y }} />
    </>
  );
};

export default CustomCursor;

const CursorWrapper = styled.div`
  position: fixed;
  width: 3rem;
  height: 3rem;
  border: 2px solid white;
  background-color: white;
  opacity: 0.7;
  border-radius: 50%;
  pointer-events: none;

  z-index: 9999;
`;
