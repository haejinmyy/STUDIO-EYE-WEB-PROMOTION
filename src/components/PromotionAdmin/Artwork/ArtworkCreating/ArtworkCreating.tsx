import React, { useEffect, useState } from 'react';
import getArtworkDefaultValue, { DefaultValueItem } from './ArtworkDefaultValue';
import styled from 'styled-components';
import ArtworkValueLayout from './ArtworkValueLayout';
import { projectType } from '@/types/PromotionAdmin/artwork';
import { backdropState } from '@/recoil/atoms';
import { useRecoilState } from 'recoil';
import { postArtwork } from '@/apis/PromotionAdmin/artwork';

const ArtworkCreating = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isProjectOpened, setIsProjectOpened] = useState<boolean>(false);
  const [projectType, setProjectType] = useState<projectType>('others');
  const [link, setLink] = useState('');
  const [mainImage, setMainImage] = useState<File>();
  const [detailImages, setDetailImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [customer, setCustomer] = useState('');
  const [producingIsOpend, setProducingIsOpened] = useRecoilState(backdropState);
  const [overview, setOverview] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    setSubmitButtonDisabled(
      !selectedDate ||
        selectedCategory === '' ||
        projectType === null ||
        link === '' ||
        mainImage === null ||
        detailImages.length === 0 ||
        title === '' ||
        customer === '' ||
        overview === '',
    );
  }, [
    selectedDate,
    selectedCategory,
    isProjectOpened,
    projectType,
    link,
    mainImage,
    detailImages,
    title,
    customer,
    overview,
  ]);
  const handleOverviewChange = (newOverview: string) => {
    setOverview(newOverview);
  };

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
  };

  const handleTogglePosted = () => {
    setIsProjectOpened(!isProjectOpened);
  };

  const handleLinkChange = (newLink: string) => {
    setLink(newLink);
  };

  const handleMainImageChange = (newImage: File | File[]) => {
    setMainImage(Array.isArray(newImage) ? newImage[0] : newImage);
  };

  const handleDetailImageChange = (newImages: File | File[]) => {
    setDetailImages(Array.isArray(newImages) ? newImages : [newImages]);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleCustomerChange = (newCustomer: string) => {
    setCustomer(newCustomer);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const requestData = {
      category: selectedCategory,
      name: title,
      client: customer,
      department: '',
      date: selectedDate ? selectedDate.toISOString() : '',
      link: link,
      projectType: projectType,
      isPosted: isProjectOpened,
      overView: overview,
    };
    formData.append('request', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));

    if (mainImage) {
      formData.append('file', mainImage);
    }
    if (detailImages) {
      detailImages.forEach((file, index) => {
        formData.append('files', file);
      });
    }
    console.log(formData);
    try {
      const response = await postArtwork(formData);
      if (response.code === 400 && response.data === null && response.message) {
        setErrorMessage(response.message);
        return;
      }
      alert('아트워크 등록 성공'); // * TODO alert component 변경
      setProducingIsOpened(false);
    } catch (error: any) {
      console.log('Error creating artwork:', error);
    }
  };
  const defaultValue = getArtworkDefaultValue(
    selectedDate,
    handleDateChange,
    selectedCategory,
    setSelectedCategory,
    isProjectOpened,
    handleTogglePosted,
    projectType,
    setProjectType,
    link,
    handleLinkChange,
    mainImage,
    handleMainImageChange,
    detailImages,
    handleDetailImageChange,
    title,
    handleTitleChange,
    customer,
    handleCustomerChange,
    overview,
    handleOverviewChange,
  );

  return (
    <Container>
      {' '}
      <CloseContainer onClick={() => setProducingIsOpened(false)}>x</CloseContainer>
      <ValueWrapper>
        {defaultValue.map((item: DefaultValueItem, index: number) => (
          <div key={index}>
            {errorMessage && item.name === 'artworkType' && <ErrorMessage> ⚠ {errorMessage}</ErrorMessage>}
            <ArtworkValueLayout valueTitle={item.title} description={item.description} content={item.content} />
          </div>
        ))}
        <div />
        <SubmitBtn
          title={submitButtonDisabled ? '모든 항목을 다 입력해주세요!' : ''}
          disabled={submitButtonDisabled}
          onClick={() => handleSubmit()}
        >
          저장하기
        </SubmitBtn>
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
  border-radius: 10px;
  backdrop-filter: blur(5px);
  box-sizing: border-box;
  width: fit-content;
  height: 800px;
  overflow-y: scroll;
  padding: 55px 55px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
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

const SubmitBtn = styled.button`
  border: none;
  outline-style: none;
  font-family: 'pretendard-semibold';
  font-size: 17px;
  background-color: #6c757d;
  width: 150px;
  text-align: center;
  color: white;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  padding: 10px 20px;
  margin-left: auto;
  margin-top: 20px;
  &:disabled {
    opacity: 0.5;
    cursor: default;
    &:hover {
      background-color: #6c757d;
    }
  }
  &:hover {
    background-color: #5a6268;
  }
`;

const ErrorMessage = styled.div`
  font-family: 'pretendard-bold';
  background-color: #ca0505c5;
  color: #e7e7e7;
  padding: 10px;
  border-radius: 5px;
  width: fit-content;
  margin-bottom: 15px;
`;
