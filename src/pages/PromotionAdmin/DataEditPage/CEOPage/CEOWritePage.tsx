import { getCEOData } from '@/apis/PromotionAdmin/dataEdit';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { ICEOData } from '@/types/PromotionAdmin/dataEdit';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

function CEOWritePage() {
  const { data, isLoading, refetch } = useQuery<ICEOData>(['ceo', 'id'], getCEOData);
  const [putData, setPutData] = useState({
    request: {
      name: data?.name,
      introduction: data?.introduction,
    },
    file: data?.imageUrl,
  });

  useEffect(() => {
    refetch();
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

  const [isInvalid, setInvalid] = useState(false);

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

    if (putData.request.name === undefined) {
      alert('이름을 입력해주세요');
      setInvalid(true);
    } else if (putData.request.introduction === undefined) {
      alert('소개를 입력해주세요');
      setInvalid(true);
    } else if (putData.file === undefined) {
      alert('파일을 업로드해주세요');
      setInvalid(true);
    } else {
      setInvalid(false);
    }

    if (!isInvalid) {
      if (window.confirm('등록하시겠습니까?')) {
        axios
          .post(`${PROMOTION_BASIC_PATH}/api/ceo`, formData)
          .then((response) => {
            console.log('CEO posted:', response);
            alert('등록되었습니다.');
          })
          .catch((error) => console.error('Error updating ceo:', error));
      }
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

  if (isLoading) return <div>is Loading...</div>;
  return (
    <Wrapper>
      <EditComponent>
        <Content>
          <Title>Name</Title>
          <input name='name' value={putData.request.name} onChange={handleChange} placeholder='이름' />
        </Content>

        <Content>
          <Title>Introduction</Title>
          <textarea
            name='introduction'
            value={putData.request.introduction}
            onChange={handleChange}
            placeholder='소개'
          />
        </Content>

        <Content>
          <Title>Logo</Title>
          <input type='file' accept='image/*' onChange={handleImageChange} />
          <img src={putData.file} />
        </Content>

        <ButtonWrapper>
          <Button onClick={handleSaveClick}>등록하기</Button>
        </ButtonWrapper>
      </EditComponent>
    </Wrapper>
  );
}

export default CEOWritePage;

const Wrapper = styled.div`
  left: 25rem;
  top: 10rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.color.white.bold};
  width: 800px;
  min-height: 600px;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
`;

const EditComponent = styled.div`
  background-color: ${(props) => props.theme.color.white.bold};
  padding: 20px;
`;

const Title = styled.div`
  font-weight: 800;
  display: flex;
  align-items: center;
  height: 4rem;
  font-size: 1.3rem;
`;

const Content = styled.div`
  margin-bottom: 40px;
  img {
    width: 100px;
  }

  textarea {
    border: none;
    padding: 10px 20px;
    height: 200px;
    width: 700px;
    font-size: 16px;
  }

  input {
    border: none;
    font-size: 16px;
    padding: 10px 20px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  padding: 0.4rem 1.4rem;
  border-radius: 0.2rem;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light}; /* 버튼 호버 시 색상 조정 */
  }
`;
