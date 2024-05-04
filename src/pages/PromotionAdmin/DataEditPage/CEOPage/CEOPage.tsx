import { getCEOData } from '@/apis/PromotionAdmin/dataEdit';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { ICEOData } from '@/types/PromotionAdmin/dataEdit';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CEOWritePage from './CEOWritePage';
import { DATAEDIT_PATH } from '@/components/PromotionAdmin/DataEdit/DetailNavigator';
import { theme } from '@/styles/theme';

function CEOPage() {
  const { data, isLoading, refetch } = useQuery<ICEOData>(['ceo', 'id'], getCEOData);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const newText = data?.introduction.split('\n').map((item, index) => <p key={index}>{item}</p>);
  const navigator = useNavigate();
  const [putData, setPutData] = useState({
    request: {
      name: data?.name,
      introduction: data?.introduction,
    },
    file: data?.imageUrl,
  });

  useEffect(() => {
    refetch();
    navigator(`?${DATAEDIT_PATH.CEO}`);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPutData((prevData) => ({
      ...prevData,
      request: {
        ...prevData.request,
        [name]: value,
      },
    }));
  };

  const handleSaveClick = async () => {
    const formData = new FormData();

    // 기본 정보 추가
    formData.append('request', new Blob([JSON.stringify(putData.request)], { type: 'application/json' }));
    console.log('넣는 request', putData.request);

    // 이미지를 변경했는지 확인하고 추가
    if (putData.file && putData.file !== data?.imageUrl) {
      const file = await urlToFile(putData.file, 'CEOLogo.png');
      formData.append('file', file);
    } else {
      // 이미지를 변경하지 않은 경우에는 기존의 이미지를 그대로 전송
      if (data?.imageUrl) {
        const mainImgBlob = await urlToFile(data.imageUrl, 'CEOLogo.png');
        formData.append('file', mainImgBlob);
      } else {
        formData.append('file', ''); // 이미지가 없는 경우 빈 값 추가
      }
    }

    if (window.confirm('수정하시겠습니까?')) {
      axios
        .put(`${PROMOTION_BASIC_PATH}/api/ceo`, formData)
        .then((response) => {
          console.log('CEO updated:', response);
          setEditMode(false);
          alert('수정되었습니다.');
        })
        .catch((error) => console.error('Error updating artwork:', error));
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

  const handleDelete = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .delete(`${PROMOTION_BASIC_PATH}/api/ceo`)
        .then((response) => {})
        .catch((error) => console.log(error));

      alert('삭제되었습니다.');
    }
  };

  if (isLoading) return <div>is Loading...</div>;
  if (data === null) return <CEOWritePage />;

  return (
    <Wrapper>
      {data && (
        <>
          <CEOWrapper>
            <InfoWrapper>
              <Name>CEO {data.name}</Name>
              <Introduction>{newText}</Introduction>
            </InfoWrapper>

            <Logo src={data.imageUrl} />
          </CEOWrapper>

          {isEditMode && (
            <EditComponent>
              <Content>
                <Title>Name</Title>
                <input name='name' value={putData.request.name} onChange={handleChange} defaultValue={data.name} />
              </Content>

              <Content>
                <Title>Introduction</Title>
                <textarea
                  name='introduction'
                  value={putData.request.introduction}
                  onChange={handleChange}
                  defaultValue={data.introduction}
                />
              </Content>

              <Content>
                <Title>Logo</Title>
                <Container>
                  <LogoWrapper>
                    <img src={putData.file} alt={data.imageFileName} />
                    <label htmlFor='file'>
                      <div>File Upload</div>
                      <input
                        id='file'
                        className='file_input'
                        type='file'
                        accept='image/*'
                        onChange={handleImageChange}
                        alt={data.imageFileName}
                      />
                    </label>
                  </LogoWrapper>
                  <ButtonWrapper>
                    <Button deleted={false} onClick={handleSaveClick}>
                      저장
                    </Button>
                    <Button deleted={true} onClick={handleDelete}>
                      삭제
                    </Button>
                  </ButtonWrapper>
                </Container>
              </Content>
            </EditComponent>
          )}
        </>
      )}
      {!isEditMode && (
        <Button
          deleted={false}
          onClick={() => {
            setEditMode(true);
          }}
        >
          수정
        </Button>
      )}
    </Wrapper>
  );
}

export default CEOPage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 90vw;
  min-height: 500px;

  button {
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CEOWrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
`;

const InfoWrapper = styled.div`
  text-align: right;
`;

const Name = styled.div`
  padding-bottom: 30px;
  font-size: 67px;
  font-weight: 700;
  color: ${(props) => props.theme.color.white.bold};
`;

const Introduction = styled.div`
  color: ${(props) => props.theme.color.white.bold};
  font-weight: 100;
  line-height: 22px;
  font-size: 20px;
`;

const Logo = styled.img`
  width: 300px;
  padding-left: 60px;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  div {
    cursor: pointer;
    border: none;
    background-color: ${(props) => props.theme.color.white.bold};
    box-shadow: 1px 1px 4px 0.1px #c6c6c6;
    padding: 0.4rem 1.4rem;
    border-radius: 0.2rem;
    transition: 0.2s;
    width: 90px;
    display: flex;
    justify-content: center;
    font-weight: 700;
    margin-right: 20px;

    &:hover {
      background-color: ${(props) => props.theme.color.yellow.light};
    }
  }

  input {
    display: none;
  }

  img {
    margin-bottom: 10px;
  }
`;

const EditComponent = styled.div`
  background-color: ${(props) => props.theme.color.white.bold};
  width: 25%;
  padding: 0 20px;

  textarea {
    font-size: 16px;
    width: 100%;
    height: 100px;
  }
`;

const Title = styled.div`
  font-weight: 800;
  display: flex;
  align-items: center;
  height: 4rem;
  font-size: 1.3rem;
`;

const Content = styled.div`
  margin-bottom: 20px;
  img {
    width: 100px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: end;
  align-self: flex-end;
  height: 30px;
`;

const Button = styled.button<{ deleted: boolean }>`
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  padding: 0.4rem 1.4rem;
  border-radius: 0.2rem;
  transition: 0.2s;
  margin-right: 10px;

  &:hover {
    background-color: ${({ deleted }) => (deleted ? '#fae9e9' : theme.color.yellow.light)};
  }
`;
