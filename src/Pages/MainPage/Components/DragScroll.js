import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;

  img {
    width: 300px;
    pointer-events: none;
  }
`;

const Scroll = styled.div`
  display: flex;
  width: max-content;
  cursor: grab;

  width: 100%;
  overflow-y: hidden;
  overflow-x: scroll;
  padding-bottom: 21px;

  &::-webkit-scrollbar {
    width: 9px;
  }
  &::-webkit-scrollbar-thumb {
    width: 248px;
    height: 9px;
    border-radius: 100px;
    background: #d9d9d9;
  }
`;

const DragScroll = ({images}) => {
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - e.currentTarget.offsetLeft);
        setScrollLeft(e.currentTarget.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDown(false);
    };

    const handleMouseUp = () => {
        setIsDown(false);
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - e.currentTarget.offsetLeft;
        const walk = x - startX;
        e.currentTarget.scrollLeft = scrollLeft - walk;
    };

    return (
        <Container>
        <Scroll
            className="items"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                />
            ))}
        </Scroll>
        </Container>
    );
};

export default DragScroll;
