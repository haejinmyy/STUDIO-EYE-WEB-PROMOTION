import React, { useEffect, useRef } from 'react';
import defaultLogo from '@/assets/images/PP-Header/defaultLogo.png';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { ppHeaderState } from '@/recoil/atoms';
import { NavLink } from 'react-router-dom';
import HeaderDetail from './HeaderDetail';
import Menubar from './Menubar';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(ppHeaderState);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const disableScroll = () => {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };
    disableScroll();
  }, [isMenuOpen]);

  return (
    <>
      <Container ref={headerRef}>
        <HeaderContainer>
          <HomeLinkWrapper to={'/'}>
            <LogoImg src={defaultLogo} alt='logo' />
          </HomeLinkWrapper>
          <Menubar />
        </HeaderContainer>
        <AnimatePresence>
          {isMenuOpen && (
            <HeaderDetailContainer
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%', transition: { duration: 0.8 } }}
              transition={{ delay: 0.2, ease: 'easeInOut' }}
            >
              <LinkWrapper>
                <HeaderDetail />
              </LinkWrapper>
            </HeaderDetailContainer>
          )}
        </AnimatePresence>
      </Container>
    </>
  );
};

export default Header;

const Container = styled.div`
  width: 100vw;
  height: 80px;
  padding: 15px 40px;

  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);
  position: fixed;
  z-index: 100;
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 101;
`;
const HeaderDetailContainer = styled(motion.div)`
  width: 521px;
  height: 100vh;
  background-color: black;
  backdrop-filter: blur(30px);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 110;
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const HomeLinkWrapper = styled(NavLink)``;
const LinkWrapper = styled.div``;
const LogoImg = styled.img`
  width: 172px;
  height: 55px;
  object-fit: cover;
`;
