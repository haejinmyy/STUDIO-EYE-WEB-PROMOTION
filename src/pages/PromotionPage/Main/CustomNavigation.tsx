import React from 'react';
import styled from 'styled-components';

const NavigationContainer = styled.div`
  position: fixed;
  z-index: 10;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`;

const NavigationBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const NavigationLink = styled.a<{ isActive: boolean }>`
  font-weight: ${({ isActive }) => (isActive ? '800' : '400')};
  color: black;
  font-size: 20px;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease;
  padding: 10px;
`;

const CustomNavigation = ({ activeSection }: { activeSection: string }) => {
  console.log("Active Section in CustomNavigation:", activeSection);

  const sections = ['top', 'intro', 'artworkList', 'outro'];

  return (
    <NavigationContainer>
      <NavigationBar>
        {sections.map((section, index) => (
          <NavigationLink
            key={section}
            href={`#${section}`}
            isActive={activeSection === section}
            >
            {index + 1}
          </NavigationLink>
        ))}
      </NavigationBar>
    </NavigationContainer>
  );
};

export default CustomNavigation;
