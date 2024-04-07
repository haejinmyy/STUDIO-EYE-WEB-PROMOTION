import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimateSharedLayout } from 'framer-motion';

const menuItems = ['Lorem', 'ipsum', 'dolor', 'sit'];

const MenuItemWrapper = styled(motion.div)`
  cursor: pointer;
  opacity: ${props => (props.selected ? 1 : 0.5)};
  position: relative;
  margin: 10px;
`;

const MenuItemText = styled.div`
  z-index: 2;
`;

const Underline = styled(motion.div)`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: blue;
`;

const MenuItem = ({ text, selected, onClick }) => (
  <MenuItemWrapper
    className="menu-item"
    onClick={onClick}
    animate={{ opacity: selected ? 1 : 0.5 }}
    selected={selected}
    layoutId="menuItem"
  >
    <MenuItemText>{text}</MenuItemText>
    {selected && <Underline layoutId="underline" />}
  </MenuItemWrapper>
);

const UnderlinedMenu = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="underlined-menu">
      <div className="wrapper">
        <AnimateSharedLayout>
          {menuItems.map((el, i) => (
            <MenuItem
              text={el}
              key={i}
              selected={selected === i}
              onClick={() => setSelected(i)}
            />
          ))}
        </AnimateSharedLayout>
      </div>
    </div>
  );
};

export default UnderlinedMenu;
