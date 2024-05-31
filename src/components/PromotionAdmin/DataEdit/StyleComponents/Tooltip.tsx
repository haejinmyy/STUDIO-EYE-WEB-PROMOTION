import React from 'react';
import { ReactElement, useState } from 'react';
import styled from 'styled-components';

type TooltipType = {
  fontSize?: number;
  description: string;
  svgComponent?: ReactElement;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
};

const Tooltip = (props: TooltipType) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <TooltipStyle description={props.description} as={props.as}>
      {props.svgComponent &&
        React.cloneElement(props.svgComponent, {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
        })}
      {isHovered && (
        <Description description={props.description} fontSize={props.fontSize}>
          {props.description}
        </Description>
      )}
    </TooltipStyle>
  );
};

export default Tooltip;

const TooltipStyle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding-right: 10px;
`;

const Description = styled.div<TooltipType>`
  z-index: 99;
  position: absolute;
  width: max-content;
  background-color: #f4f4f4;
  padding: 10px 20px;
  white-space: pre-wrap;
  top: 30px;
  line-height: 20px;
  font-size: ${(props) => (props.fontSize ? props.fontSize + 'px;' : '14px;')};
  font-family: ${(props) => props.theme.font.light};
`;
