import React, { useEffect } from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
};

const BackDrop = ({ children, isOpen }: Props) => {
  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = 'hidden';
    } else {
      window.document.body.style.overflow = 'auto';
    }

    return () => {
      window.document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <Container className='fixed top-0 left-0 w-full h-full bg-[#00000040] z-100 flex justify-center items-center'>
      {children ?? null}
    </Container>
  );
};

export default BackDrop;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000040;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;
