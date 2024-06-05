import { getCEOData } from '@/apis/PromotionAdmin/dataEdit';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { ICEOData } from '@/types/PromotionAdmin/dataEdit';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import FileButton from '@/components/PromotionAdmin/DataEdit/StyleComponents/FileButton';
import {
  DATAEDIT_NOTICE_COMPONENTS,
  DATAEDIT_TITLES_COMPONENTS,
} from '../../../../components/PromotionAdmin/DataEdit/Company/StyleComponents';

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
  }, [data, refetch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'name' && value.length > 30) {
      processedValue = value.slice(0, 30);
    }

    if (name === 'introduction') {
      const lines = value.split('\n').length;
      if (lines > 5) {
        const linesArray = value.split('\n');
        processedValue = linesArray.slice(0, 5).join('\n');
      }
      if (value.length > 200) {
        processedValue = value.slice(0, 200);
      }
    }
    setPutData((prevData) => ({
      ...prevData,
      request: {
        ...prevData.request,
        [name]: processedValue,
      },
    }));
  };

  const [isInvalid, setInvalid] = useState(true);

  const handleSaveClick = async () => {
    const formData = new FormData();
    // 기본 정보 추가
    formData.append(
      'request',
      new Blob(
        [
          JSON.stringify({
            name: putData.request.name,
            introduction: putData.request.introduction,
          }),
        ],
        { type: 'application/json' },
      ),
    );
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
      <ContentBlock>
        {DATAEDIT_TITLES_COMPONENTS.CEO}
        <InputWrapper>
          <InputTitle>
            <p>Name</p>
          </InputTitle>
          <input name='name' value={putData.request.name} onChange={handleChange} placeholder='이름' />
          <InputTitle>
            <p>Introduction</p>
          </InputTitle>
          <textarea
            name='introduction'
            value={putData.request.introduction}
            onChange={handleChange}
            placeholder='CEO 소개 (5줄, 200자 내로 작성해 주세요.)'
          />
          <InputImgWrapper>
            <Box>
              <InputTitle>{DATAEDIT_TITLES_COMPONENTS.CEOIMG}</InputTitle>
              {DATAEDIT_NOTICE_COMPONENTS.IMAGE.CEOIMG}
              {DATAEDIT_NOTICE_COMPONENTS.COLOR.CEOIMG}
              <LogoWrapper>
                <FileButton id='CEOImgFile' description='CEO Image Upload' onChange={handleImageChange} />
                <ImgBox>
                  <img src={putData.file} alt='' />
                </ImgBox>
              </LogoWrapper>
            </Box>
          </InputImgWrapper>
          <ButtonWrapper>
            <Button onClick={handleSaveClick}>등록하기</Button>
          </ButtonWrapper>
        </InputWrapper>
      </ContentBlock>
    </Wrapper>
  );
}

export default CEOWritePage;

export const Wrapper = styled.div`
  display: flex;
  input,
  textarea {
    outline: none;
  }
  input:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }
  ,
  textarea {
    outline: none;
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    padding: 10px;
    width: 70%;
    min-height: 200px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    resize: none;
  }
  textarea:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }
`;

export const ContentBlock = styled.div<{ width?: number; height?: number }>`
  padding: 25px;
  background-color: ${(props) => props.theme.color.white.pale};
  position: relative;
  box-shadow: 2px 2px 5px 0.3px ${(props) => props.theme.color.black.pale};
  margin-bottom: 30px;
  margin-right: 30px;

  border-radius: 4px;
  width: ${(props) => (props.width ? props.width + 'px;' : '40vw;')};
  height: ${(props) => (props.height ? props.height + 'px;' : 'fit-content;')};
`;

export const InputWrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.color.white.light};
  flex-direction: column;
  font-family: ${(props) => props.theme.font.regular};
  p {
    font-size: 18px;
    padding-top: 7px;
    padding-bottom: 3px;
  }
  input {
    outline: none;
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    padding-left: 10px;
    width: 30%;
    height: 30px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  input:focus,
  textarea:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }
`;

export const InputImgWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const InputTitle = styled.div`
  display: flex;
  padding-top: 20px;
  align-items: center;
  height: 40px;
  svg {
    cursor: pointer;
    margin-right: 10px;
  }
`;
export const Box = styled.div`
  width: 100%;
`;

export const ImgBox = styled.div`
  display: flex;
  height: 200px;
  width: 80%;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
  border-radius: 5px;
  margin-top: 15px;
`;
export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  input {
    display: none;
  }

  img {
    max-width: 300px;
    max-height: 150px;
    margin-bottom: 10px;
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
  box-shadow: 1px 1px 4px 0.5px #c6c6c6;
  padding: 0.4rem 1.4rem;
  border-radius: 0.2rem;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light}; /* 버튼 호버 시 색상 조정 */
  }
`;
