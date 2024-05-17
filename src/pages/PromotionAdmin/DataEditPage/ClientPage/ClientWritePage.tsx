import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';

interface IFormData {
  name: string;
}

function ClientWritePage() {
  const navigator = useNavigate();
  const [postData, setPostData] = useState({
    clientInfo: {
      name: '',
    },
    logoImg: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const [isInvalid, setInvalid] = useState(true);

  const onValid = (data: IFormData) => {
    handleSaveClick(data);
  };

  const handleSaveClick = async (data: IFormData) => {
    const formData = new FormData();

    formData.append(
      'clientInfo',
      new Blob(
        [
          JSON.stringify({
            name: data.name,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    // 이미지를 변경했는지 확인하고 추가
    const file = await urlToFile(postData.logoImg, 'ClientLogo.png');
    formData.append('logoImg', file);

    if (postData.logoImg === '') {
      alert('파일을 업로드해주세요');
      setInvalid(true);
    } else {
      setInvalid(false);
    }

    if (!isInvalid) {
      if (window.confirm('등록하시겠습니까?')) {
        axios
          .post(`${PROMOTION_BASIC_PATH}/api/client`, formData)
          .then((response) => {
            console.log('Client posted:', response);
            alert('등록되었습니다.');
            navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_CLIENT}`);
          })
          .catch((error) => console.error('Error updating client:', error));
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const logoImg = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData((prevData) => ({
          ...prevData,
          logoImg: reader.result as string,
        }));
      };
      reader.readAsDataURL(logoImg);
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

  return (
    <Wrapper>
      <TitleWrapper>
        <Icon>
          <svg width='20' height='20' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M5 12.2399L0.5 13.4999L1.76 8.9999L10 0.799898C10.0931 0.704652 10.2044 0.628973 10.3271 0.577306C10.4499 0.525638 10.5818 0.499023 10.715 0.499023C10.8482 0.499023 10.9801 0.525638 11.1029 0.577306C11.2256 0.628973 11.3369 0.704652 11.43 0.799898L13.2 2.5799C13.2937 2.67286 13.3681 2.78347 13.4189 2.90532C13.4697 3.02718 13.4958 3.15789 13.4958 3.2899C13.4958 3.42191 13.4697 3.55262 13.4189 3.67448C13.3681 3.79634 13.2937 3.90694 13.2 3.9999L5 12.2399Z'
              stroke='#FFA900'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Icon>
        <Title>Client 등록</Title>
      </TitleWrapper>

      <FormContainer onSubmit={handleSubmit(onValid)}>
        <Content>
          <Title>Logo</Title>
          <LogoWrapper>
            <img src={postData.logoImg} />
            <label htmlFor='file'>
              <div>File Upload</div>
              <input id='file' type='file' accept='image/*' onChange={handleImageChange} />
            </label>
          </LogoWrapper>
        </Content>

        <Content>
          <Title>Name</Title>
          <LinkInput
            {...register('name', {
              required: '이름을 입력해주세요',
            })}
            placeholder='이름을 입력해주세요'
          />
          {errors.name && <p>{errors.name.message}</p>}
        </Content>

        <ButtonWrapper>
          <Button>등록하기</Button>
        </ButtonWrapper>
      </FormContainer>
    </Wrapper>
  );
}

export default ClientWritePage;

const Wrapper = styled.div`
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px ${(props) => props.theme.color.black.pale};
  width: 40vw;
  min-height: 600px;
  overflow: auto;
`;
const Icon = styled.div`
  padding-left: 1rem;
  padding-right: 0.8rem;
`;
const TitleWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #f1f1f1;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  font-size: 1.3rem;
  font-weight: 700;
`;

const Content = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
`;

const LinkInput = styled.input`
  padding: 0.5rem;
  border: none;
  width: 100%;
  height: 2rem;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
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
`;
const FormContainer = styled.form``;

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
    width: 200px;
    margin-bottom: 10px;
  }
`;
