import { deleteArtwork, getArtworkDetail, postArtwork, putArtwork } from '@/apis/PromotionAdmin/artwork';
import { backdropState } from '@/recoil/atoms';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import getArtworkDefaultValue, { DefaultValueItem } from '../ArtworkCreating/ArtworkDefaultValue';
import { ArtworkData, projectType, UpdateArtwork } from '@/types/PromotionAdmin/artwork';
import styled from 'styled-components';
import ArtworkValueLayout from '../ArtworkCreating/ArtworkValueLayout';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ScrollToTop from '@/hooks/useScrollToTop';
import { PA_ROUTES } from '@/constants/routerConstants';

const ArtworkDetail = () => {
  const [getModeMainImg, setGetModeMainImg] = useState('');
  const [getModeDetailImgs, setGetModeDetailImgs] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isProjectOpened, setIsProjectOpened] = useState<boolean>(false);
  const [projectType, setProjectType] = useState<projectType>('others');
  const [link, setLink] = useState('');
  const [mainImage, setMainImage] = useState<File>();
  const [detailImages, setDetailImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [customer, setCustomer] = useState('');
  const [overview, setOverview] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { artworkId } = useParams();
  const [artworkData, setArtworkData] = useState<ArtworkData>();
  const [isGetMode, setIsGetMode] = useState<boolean>(true);
  const navigate = useNavigate();
  const [isTopMainArtwork, setIsTopMainArtwork] = useState(false);

  const [putData, setPutData] = useState<UpdateArtwork>({
    request: {
      projectId: 0,
      department: '',
      category: '',
      name: '',
      client: '',
      date: '',
      link: '',
      overView: '',
      deletedImageId: [],
    },
    file: '',
    files: [],
  });

  useEffect(() => {
    setSubmitButtonDisabled(
      !selectedDate ||
        selectedCategory === '' ||
        projectType === null ||
        link === '' ||
        !mainImage ||
        !detailImages ||
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
  useEffect(() => {
    fetchArtworkDetails();
    setIsGetMode(true);
    console.log('읭', mainImage);
    console.log('초기에 넣은 putData', putData);
  }, [artworkId]);
  useEffect(() => {
    if (projectType === 'top' || projectType === 'main') {
      setIsTopMainArtwork(true);
    } else {
      setIsTopMainArtwork(false);
    }
    console.log('바뀜', isTopMainArtwork);
  }, [projectType]);
  async function urlToFile(url: string, fileName: string): Promise<File> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      console.log(blob);
      return new File([blob], fileName);
    } catch (error) {
      console.error('Error URL to file:', error);
      throw error;
    }
  }

  // fetchArtworkDetails 함수 내에서 ArtworkData를 받아와서 state에 설정하는 부분
  const fetchArtworkDetails = async () => {
    try {
      const data = await getArtworkDetail(Number(artworkId));
      setArtworkData(data);
      setTitle(data.name);
      setSelectedDate(data.date);
      setSelectedCategory(data.category);
      setIsProjectOpened(data.isPosted);
      setProjectType(data.projectType);
      setLink(data.link);
      setPutData({
        request: {
          projectId: data.id,
          department: '',
          category: data.category,
          name: data.name,
          client: data.client,
          date: data.date,
          link: data.link,
          overView: data.overView,
          deletedImageId: [],
        },
        file: data.mainImg,
        files: [],
      });
      if (data.projectType === 'top' || data.projectType === 'main') {
        setIsTopMainArtwork(true);
      } else {
        setIsTopMainArtwork(false);
      }
      if (data.mainImg) {
        setGetModeMainImg(data.mainImg);
        try {
          const mainImgFile = await urlToFile(data.mainImg + '?t=' + Date.now(), `${data.mainimg}.png`);
          setMainImage(mainImgFile);
          console.log(mainImgFile, 'main ImgFile Blob');
        } catch (error) {
          console.error('Error fetching artwork details:', error);
        }
      }
      if (data.projectImages && data.projectImages.length > 0) {
        try {
          const detailImageFiles = await Promise.all(
            data.projectImages.map(async (image: { imageUrlList: string }) => {
              const detailImgFile = await urlToFile(image.imageUrlList, `${image.imageUrlList}.png`);
              console.log(detailImgFile);
              return detailImgFile;
            }),
          );
          setDetailImages(detailImageFiles);
          console.log(detailImageFiles, 'detailImageFiles  Blob');
          setPutData((prevState) => ({
            ...prevState,
            files: detailImageFiles,
          }));
        } catch (error) {
          console.error('Error fetching artwork details:', error);
        }
        setGetModeDetailImgs(data.projectImages.map((image: { imageUrlList: string }) => image.imageUrlList));
      }
      setCustomer(data.client);
      setOverview(data.overView);
    } catch (error) {
      console.error('Error fetching artwork details', error);
    }
  };

  const handleEditClick = () => {
    setIsGetMode(false);
  };

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
      projectId: artworkData?.id,
      category: selectedCategory,
      name: title,
      client: customer,
      department: '',
      date: selectedDate,
      link: link,
      overView: overview,
      isPosted: isProjectOpened,
      projectType: projectType,
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

    try {
      const response = await putArtwork(formData);
      if (response.code === 400 && response.data === null && response.message) {
        setErrorMessage(response.message);
        return;
      }
      alert('아트워크 수정 성공'); // * TODO alert component 변경
      await fetchArtworkDetails();
      setIsGetMode(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      console.log('Error creating artwork:', error);
    }
  };

  const handleArtworkDelete = async () => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        // 삭제 API 호출
        await deleteArtwork(Number(artworkId));
        alert('아트워크가 성공적으로 삭제되었습니다.');
        navigate(`${PA_ROUTES.ARTWORK}`);
      } catch (error) {
        console.error('Error deleting artwork:', error);
        // 삭제 실패 시 처리
      }
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
    isGetMode,
    getModeMainImg,
    getModeDetailImgs,
    isTopMainArtwork,
  );

  return (
    <Container>
      <ScrollToTop />
      <ValueWrapper>
        {defaultValue.map((item: DefaultValueItem, index: number) => (
          <div key={index}>
            {errorMessage && !isGetMode && item.name === 'artworkType' && (
              <ErrorMessage> ⚠ {errorMessage}</ErrorMessage>
            )}
            <ArtworkValueLayout valueTitle={item.title} description={item.description} content={item.content} />
          </div>
        ))}
        <div />
        {!isGetMode && (
          <SubmitBtn
            title={submitButtonDisabled ? '모든 항목을 다 입력해주세요!' : ''}
            disabled={submitButtonDisabled}
            onClick={() => handleSubmit()}
          >
            저장하기
          </SubmitBtn>
        )}
        {isGetMode && <SubmitBtn onClick={handleEditClick}>수정하기</SubmitBtn>}
      </ValueWrapper>{' '}
      <DeleteWrapper onClick={handleArtworkDelete}>삭제하기</DeleteWrapper>
    </Container>
  );
};

export default ArtworkDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 110%;
  position: relative;
`;

const ValueWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.74);
  border-radius: 10px;
  backdrop-filter: blur(5px);
  box-sizing: border-box;
  width: 100%;
  padding: 55px 55px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
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

const DeleteWrapper = styled.div`
  font-family: 'pretendard-semibold';
  font-size: 17px;
  background-color: #c0c0c0;
  text-align: center;
  width: 150px;
  text-align: center;
  color: white;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  padding: 10px 20px;
  margin-left: auto;
  margin-top: 20px;

  &:hover {
    background-color: #ca0505c5;
  }
`;
