import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as InfoIcon } from '@/assets/images/PA/infoIcon.svg';

interface HoverInfoProps {
  title: string;
  description: string;
}

const HoverInfo = ({ title, description }: HoverInfoProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const INFO_ICON_SIZE = 18;
  const descriptionLines = description.split('\n');

  return (
    <Wrapper>
      <Title>
        <InfoIcon
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          width={INFO_ICON_SIZE}
          height={INFO_ICON_SIZE}
        />
        {title}
      </Title>
      {isHovered && (
        <HoverBox>
          {descriptionLines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </HoverBox>
      )}
    </Wrapper>
  );
};

export default HoverInfo;

const Wrapper = styled.div``;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-family: ${(props) => props.theme.font.semiBold};
  color: #494845;
  width: 300px;
  margin-bottom: 10px;

  svg {
    cursor: pointer;
    padding-right: 7px;
    stroke: #595959;
  }
`;

const HoverBox = styled.div`
  font-size: 12px;
  font-family: ${(props) => props.theme.font.regular};
  background-color: #f4f4f4;
  padding: 10px;
  margin-top: 10px;
  width: fit-content;
  line-height: 20px;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 3px 6px,
    rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;
