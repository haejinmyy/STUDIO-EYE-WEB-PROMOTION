import { getArtworkDetail, putArtwork } from '@/apis/PromotionAdmin/artwork';
import { PA_ROUTES } from '@/constants/routerConstants';
import { ArtworkData, UpdateArtwork } from '@/types/PromotionAdmin/artwork';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const ArtworkDetail = () => {
  const { artworkId } = useParams();
  const [artworkData, setArtworkData] = useState<ArtworkData>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const navigator = useNavigate();
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
    },
    file: '',
    files: [],
  });

  useEffect(() => {
    fetchArtworkDetails();
  }, [artworkId]);

  const fetchArtworkDetails = async () => {
    try {
      const data = await getArtworkDetail(Number(artworkId));
      setArtworkData(data);
      setPutData({
        request: {
          projectId: data.id,
          department: data.department,
          category: data.category,
          name: data.name,
          client: data.client,
          date: data.date,
          link: data.link,
          overView: data.overView,
        },
        file: data.mainImg,
        files: data.projectImages.map((image: { imageUrlList: string }) => image.imageUrlList),
      });
      console.log(putData);
    } catch (error) {
      console.error('Error fetching artwork details:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPutData((prevData) => ({
      ...prevData,
      request: {
        ...prevData.request,
        [name]: value,
      },
    }));
    console.log('onChange', putData);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = [...putData.files];
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        newFiles[index] = reader.result as string;
        setPutData((prevData) => ({
          ...prevData,
          files: newFiles,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPutData((prevData) => ({
          ...prevData,
          file: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  async function urlToFile(url: string, fileName: string): Promise<File> {
    // const slicedUrl = url.substring(url.lastIndexOf('/') + 1);
    // console.log(slicedUrl);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], fileName);
    } catch (error) {
      console.error('Errordddddddhing URL to file:', error);
      throw error;
    }
  }
  const handleSaveClick = async () => {
    const formData = new FormData();

    // 기본 정보 추가
    formData.append('request', new Blob([JSON.stringify(putData.request)], { type: 'application/json' }));
    console.log('넣는 request', putData.request);

    // 이미지를 변경했는지 확인하고 추가
    if (putData.file && putData.file !== artworkData?.mainImg) {
      const file = await urlToFile(putData.file, 'mainImg.png');
      formData.append('file', file);
    } else {
      // 이미지를 변경하지 않은 경우에는 기존의 이미지를 그대로 전송
      if (artworkData?.mainImg) {
        const mainImgBlob = await urlToFile(artworkData.mainImg, 'mainImg.png');
        formData.append('file', mainImgBlob);
      } else {
        formData.append('file', ''); // 이미지가 없는 경우 빈 값 추가
      }
    }

    // 기타 이미지들 추가
    if (putData.files && putData.files.length > 0) {
      for (const projectImage of putData.files) {
        let isImageChanged = true;
        // 이미지를 변경했는지 확인
        if (artworkData && artworkData.projectImages) {
          for (const image of artworkData.projectImages) {
            if (projectImage === image.imageUrlList) {
              isImageChanged = false;
              break;
            }
          }
        }
        if (isImageChanged) {
          const file = await urlToFile(projectImage, 'projectImage.png');
          formData.append('files', file);
        } else {
          // 이미지를 변경하지 않은 경우에는 기존의 이미지를 그대로 전송
          if (projectImage) {
            const imageBlob = await urlToFile(projectImage, 'projectImage.png');
            formData.append('files', imageBlob);
          } else {
            formData.append('files', ''); // 이미지가 없는 경우 빈 값 추가
          }
        }
      }
    } else {
      // 이미지 목록이 없는 경우에도 빈 배열 추가
      formData.append('files', new Blob());
    }

    if (window.confirm('수정하시겠습니까?')) {
      try {
        const response = await putArtwork(formData);
        console.log('Artwork updated:', response);
        await fetchArtworkDetails();
        setIsEditMode(false);
        window.alert('수정되었습니다.');
      } catch (error) {
        console.error('Error updating artwork:', error);
      }
      navigator(`${PA_ROUTES.ARTWORK}/${artworkData?.id}`);
    }
  };
  const handleRemoveFile = (indexToRemove: number) => {
    setPutData((prevData) => {
      const updatedFiles = prevData.files.filter((_, index) => index !== indexToRemove);
      return {
        ...prevData,
        files: updatedFiles,
      };
    });
  };
  return (
    <Container>
      <BtnWrapper>
        {!isEditMode && <button onClick={handleEditClick}>수정하기</button>}
        {isEditMode && <button onClick={handleSaveClick}>저장하기</button>}
      </BtnWrapper>
      <ContentWrapper>
        <div>
          <h1>메인 썸네일 이미지</h1>
          <MainImgWrapper>
            {isEditMode ? (
              <>
                <input type='file' accept='image/*' onChange={handleImageChange} />
                <img src={putData.file} alt='main img' />
              </>
            ) : (
              <img src={artworkData?.mainImg} alt='main img' />
            )}
          </MainImgWrapper>
        </div>
        <InputWrapper>
          <InputHeader>제목</InputHeader>
          {isEditMode ? (
            <input name='name' value={putData.request.name} onChange={handleChange} />
          ) : (
            <div>{artworkData?.name}</div>
          )}
        </InputWrapper>
        <InputWrapper>
          <InputHeader>고객</InputHeader>
          {isEditMode ? (
            <input name='client' value={putData.request.client} onChange={handleChange} />
          ) : (
            <div>{artworkData?.client}</div>
          )}
        </InputWrapper>
        <InputWrapper>
          <InputHeader>날짜</InputHeader>
          {isEditMode ? (
            <input name='date' value={putData.request.date} onChange={handleChange} />
          ) : (
            <div>{artworkData?.date}</div>
          )}
        </InputWrapper>
        <InputWrapper>
          <InputHeader>카테고리</InputHeader>
          {isEditMode ? (
            <input name='category' value={putData.request.category} onChange={handleChange} />
          ) : (
            <div>{artworkData?.category}</div>
          )}
        </InputWrapper>
        <InputWrapper>
          <InputHeader>링크</InputHeader>
          {isEditMode ? (
            <input name='link' value={putData.request.link} onChange={handleChange} />
          ) : (
            <div>{artworkData?.link}</div>
          )}
        </InputWrapper>
        {isEditMode ? (
          <>
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                {putData.files[index] ? (
                  <>
                    <input type='file' accept='image/*' onChange={(e) => handleFileChange(e, index)} />
                    <FilesImgWrapper>
                      <img src={putData.files[index]} alt={`project image ${index + 1}`} />
                      <button onClick={() => handleRemoveFile(index)}>지우기</button> {/* 파일 지우기 버튼 */}
                    </FilesImgWrapper>
                  </>
                ) : (
                  <input type='file' accept='image/*' onChange={(e) => handleFileChange(e, index)} />
                )}
              </div>
            ))}
          </>
        ) : (
          artworkData?.projectImages.map((i, index) => (
            <FilesImgWrapper key={index}>
              <img src={i.imageUrlList} alt={`project image ${index + 1}`} />
            </FilesImgWrapper>
          ))
        )}
      </ContentWrapper>
    </Container>
  );
};

export default ArtworkDetail;

const Container = styled.div`
  background-color: rgba(190, 190, 190, 0.07);
  backdrop-filter: blur(5px);
  height: 600px;
  width: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BtnWrapper = styled.div``;

const ContentWrapper = styled.div`
  h1 {
    font-family: 'pretendard-bold';
    font-size: 18px;
    color: #393939;
  }
`;

const MainImgWrapper = styled.div`
  img {
    height: 250px;
    width: 400px;
    object-fit: cover;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  input {
    background: inherit;
    border-style: none;
    background-color: white;
    padding: 5px 10px;
    border-radius: 5px;
    width: 350px;
    height: 30px;
    &:hover {
    }
    &:focus {
      outline: none;
    }
  }
  margin-bottom: 15px;
`;

const InputHeader = styled.div`
  font-family: 'pretendard-bold';
  font-size: 18px;
  color: #393939;
  width: 100px;
  text-align: center;
  margin-right: 15px;
`;

const FilesImgWrapper = styled.div`
  display: flex;

  img {
    height: 150px;
    width: 150px;
    object-fit: cover;
  }
`;
