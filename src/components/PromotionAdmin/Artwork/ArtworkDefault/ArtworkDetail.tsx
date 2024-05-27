import { getArtworkDetail, putArtwork } from '@/apis/PromotionAdmin/artwork';
import { PA_ROUTES } from '@/constants/routerConstants';
import { ArtworkData, UpdateArtwork } from '@/types/PromotionAdmin/artwork';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ArtworkInput from './ArtworkInput';

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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPutData((prevData) => ({
      ...prevData,
      request: {
        ...prevData.request,
        [name]: value,
      },
    }));
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

  async function urlToFile(url: string, fileName: string): Promise<File | null> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const blob = await response.blob();
      return new File([blob], fileName);
    } catch (error) {
      console.error('Error converting URL to file:', error);
      return null;
    }
  }
  const handleSaveClick = async () => {
    const formData = new FormData();

    // 기본 정보 추가
    formData.append(
      'request',
      new Blob(
        [
          JSON.stringify({
            projectId: putData.request.projectId, // putData.request에는 변경된 속성만 있어야 합니다.
            department: putData.request.department,
            category: putData.request.category,
            name: putData.request.name,
            client: putData.request.client,
            date: putData.request.date,
            link: putData.request.link,
            overView: putData.request.overView,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    console.log('넣는 request', putData.request);

    // 이미지를 변경했는지 확인하고 추가
    if (putData.file && putData.file !== artworkData?.mainImg) {
      const file = await urlToFile(putData.file, 'mainImg.png');
      if (file) {
        formData.append('file', file);
      } else {
        console.error('메인 이미지 가져오기 실패');
      }
    } else {
      // 이미지를 변경하지 않은 경우에는 기존의 이미지를 그대로 전송
      if (artworkData?.mainImg) {
        const mainImgBlob = await urlToFile(artworkData.mainImg, 'mainImg.png');
        if (mainImgBlob) {
          formData.append('file', mainImgBlob);
        } else {
          console.error('메인 이미지 가져오기 실패');
        }
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
          if (file) {
            formData.append('files', file);
          } else {
            console.error('프로젝트 이미지 가져오기 실패');
            // 사용자에게 메시지 표시 등, 에러를 graceful하게 처리할 수 있습니다.
          }
        } else {
          // 이미지를 변경하지 않은 경우에는 기존의 이미지를 그대로 전송
          if (projectImage) {
            const imageBlob = await urlToFile(projectImage, 'projectImage.png');
            if (imageBlob) {
              formData.append('files', imageBlob);
            } else {
              console.error('프로젝트 이미지 가져오기 실패');
              // 사용자에게 메시지 표시 등, 에러를 graceful하게 처리할 수 있습니다.
            }
          } else {
            formData.append('files', ''); // 이미지가 없는 경우 빈 값 추가
          }
        }
      }
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
        {!isEditMode && <EditButton onClick={handleEditClick}>수정하기</EditButton>}
        {isEditMode && <EditButton onClick={handleSaveClick}>저장하기</EditButton>}
      </BtnWrapper>
      <ContentWrapper>
        <div>
          <ArtworkInput
            label={'Main Image'}
            mainFile={artworkData?.mainImg}
            onChange={handleImageChange}
            isEditMode={isEditMode}
            isFile={true}
          />
        </div>
        <div>
          <ArtworkInput
            label={'제목'}
            onTextAreaChange={handleChange}
            isEditMode={isEditMode}
            isFile={false}
            name={'name'}
            value={putData.request.name}
          />
        </div>
        <div>
          <ArtworkInput
            label={'클라이언트'}
            onTextAreaChange={handleChange}
            isEditMode={isEditMode}
            isFile={false}
            name={'client'}
            value={putData.request.client}
          />
        </div>
        <div>
          <ArtworkInput
            label={'일시'}
            onTextAreaChange={handleChange}
            isEditMode={isEditMode}
            isFile={false}
            name={'date'}
            value={putData.request.date}
          />
        </div>
        <div>
          <ArtworkInput
            label={'카테고리'}
            onTextAreaChange={handleChange}
            isEditMode={isEditMode}
            isFile={false}
            name={'category'}
            value={putData.request.category}
          />
        </div>
        <div>
          <ArtworkInput
            label={'링크'}
            onTextAreaChange={handleChange}
            isEditMode={isEditMode}
            isFile={false}
            name={'link'}
            value={putData.request.link}
          />
        </div>
        <div>
          <ArtworkInput
            label={'설명'}
            onTextAreaChange={handleChange}
            isEditMode={isEditMode}
            isFile={false}
            name={'overView'}
            value={putData.request.overView}
          />
        </div>
        <LabelWrapper>공개 여부</LabelWrapper>
        <LabelWrapper>프로젝트 타입</LabelWrapper>
        <FileDes>Sub Images는 최대 3개까지 지정 가능합니다.</FileDes>
        <FilesWrapper>
          {isEditMode ? (
            <>
              {[...Array(3)].map((_, index) => (
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
          ) : artworkData?.projectImages && artworkData.projectImages.length > 0 ? (
            <>
              {artworkData?.projectImages.map((i, index) => (
                <FilesImgWrapper key={index}>
                  <img src={i.imageUrlList} alt={`project image ${index + 1}`} />
                </FilesImgWrapper>
              ))}
            </>
          ) : (
            <>사진이 없습니다.</>
          )}
        </FilesWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default ArtworkDetail;

const Container = styled.div`
  background-color: rgba(190, 190, 190, 0.07);
  backdrop-filter: blur(5px);
  height: fit-content;
  width: 800px;
  padding: 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BtnWrapper = styled.div`
  margin-left: auto;
`;
const EditButton = styled.button`
  background-color: inherit;
  outline: none;
  border: none;
  padding: 5px 15px;
  background-color: white;
  font-family: 'pretendard-medium';
  font-size: 15px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: all 300ms ease-in-out;
  }
`;
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
  align-items: center;
  justify-content: start;
  img {
    height: 300px;
    width: 600px;
    object-fit: cover;
    margin-bottom: 15px;
  }
`;

const FilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 40px;
`;
const LabelWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 20px;
  margin-bottom: 15px;
`;
const FileDes = styled.div`
  font-family: 'pretendard-light';
  font-size: 15px;
  opacity: 0.8;
  margin-bottom: 15px;
`;
