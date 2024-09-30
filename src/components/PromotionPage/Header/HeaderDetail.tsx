import { PP_ROUTES } from '@/constants/routerConstants';
import React from 'react';
import styled from 'styled-components';
import NavBtn from './NavBtn';
import { motion } from 'framer-motion';

const linksData = [
  { path: PP_ROUTES.MAIN, pathName: 'MAIN' },
  {
    path: PP_ROUTES.ABOUT,
    pathName: 'ABOUT',
  },
  { path: PP_ROUTES.ARTWORK, pathName: 'ARTWORK' },
  { path: PP_ROUTES.CONTACT, pathName: 'CONTACT' },
  { path: PP_ROUTES.FAQ, pathName: 'FAQ' },
  { path: PP_ROUTES.RECRUITMENT, pathName: 'RECRUITMENT' },
];

const HeaderDetail = () => {
  return (
    <div>
      <NavWrapper>
        {linksData.map((link, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0.5, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0.5, x: 100 }}
            transition={{ delay: index * 0.15, ease: 'easeIn' }}
          >
            <span>
              <NavBtn path={link.path} pathName={link.pathName} />
            </span>
          </motion.li>
        ))}
      </NavWrapper>
    </div>
  );
};

export default HeaderDetail;

const NavWrapper = styled.div`
  span {
    position: relative;
    z-index: 1;
  }
  li {
    list-style: none;
    position: relative;
    margin-bottom: 15px;
    line-height: normal;
    color: #fff;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 35%;
      width: 0;
      height: 20px;
      background-color: #ffa900;
      transition: width 0.5s ease-in-out;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;
