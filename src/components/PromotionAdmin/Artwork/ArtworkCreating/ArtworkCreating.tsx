import React, { useState } from 'react';
import getArtworkDefaultValue from './ArtworkDefaultValue';
import styled from 'styled-components';
import ArtworkValueLayout from './ArtworkValueLayout';
import { projectType } from '@/types/PromotionAdmin/artwork';
import { backdropState } from '@/recoil/atoms';
import { useRecoilState } from 'recoil';

const ArtworkCreating = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isPosted, setIsPosted] = useState(false);
  const [isTyped, setIsTyped] = useState<projectType>('others');
  const [link, setLink] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [detailImages, setDetailImages] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [customer, setCustomer] = useState('');
  const [producingIsOpend, setProducingIsOpened] = useRecoilState(backdropState);

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
  };

  const handleTogglePosted = () => {
    setIsPosted(!isPosted);
  };

  const handleLinkChange = (newLink: string) => {
    setLink(newLink);
  };

  const handleMainImageChange = (newImage: string | string[]) => {
    setMainImage(Array.isArray(newImage) ? newImage[0] : newImage);
  };

  const handleDetailImageChange = (newImages: string | string[]) => {
    setDetailImages(Array.isArray(newImages) ? newImages : [newImages]);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleCustomerChange = (newCustomer: string) => {
    setCustomer(newCustomer);
  };

  const defaultValue = getArtworkDefaultValue(
    selectedDate,
    handleDateChange,
    setSelectedCategory,
    isPosted,
    handleTogglePosted,
    isTyped,
    setIsTyped,
    handleLinkChange,
    handleMainImageChange,
    handleDetailImageChange,
    handleTitleChange,
    handleCustomerChange,
  );

  return (
    <Container>
      <CloseContainer onClick={() => setProducingIsOpened(false)}>x</CloseContainer>
      <ValueWrapper>
        {defaultValue.map((item: any, index: number) => (
          <ArtworkValueLayout key={index} title={item.title} description={item.description} content={item.content} />
        ))}
      </ValueWrapper>
    </Container>
  );
};

export default ArtworkCreating;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const ValueWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.74);
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  width: fit-content;
  height: 800px;
  overflow-y: scroll;
  padding: 55px 55px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
`;

const CloseContainer = styled.div`
  font-family: 'pretendard-regular';
  font-size: 30px;
  position: absolute;
  top: 10px;
  z-index: 20;
  right: 20px;
  cursor: pointer;
`;
