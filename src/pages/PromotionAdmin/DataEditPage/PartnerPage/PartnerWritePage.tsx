import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { ContentBlock } from '@/components/PromotionAdmin/DataEdit/Company/CompanyFormStyleComponents';
import Title from '@/components/PromotionAdmin/DataEdit/StyleComponents/Title';
import Button from '@/components/PromotionAdmin/DataEdit/StyleComponents/Button';
import FileButton from '@/components/PromotionAdmin/DataEdit/StyleComponents/FileButton';
import SubTitle from '@/components/PromotionAdmin/DataEdit/StyleComponents/SubTitle';
import ToggleSwitch from '@/components/PromotionAdmin/DataEdit/StyleComponents/ToggleSwitch';
import { DATAEDIT_NOTICE_COMPONENTS } from '@/components/PromotionAdmin/DataEdit/Company/StyleComponents';

interface IFormData {
  is_main: boolean;
  link: string;
  name: string;
}

// URL 유효성 검사 함수
export const validateUrl = (value: string) => {
  try {
    const url = new URL(value);
    // 허용된 프로토콜 확인
    const allowedProtocols = ['http:', 'https:'];
    if (!allowedProtocols.includes(url.protocol)) {
      return 'URL은 http:// 또는 https://로 시작해야 합니다.';
    }
    // 호스트 존재 확인
    if (!url.hostname) {
      return 'URL에는 도메인 이름이 있어야 합니다 (예: example.com).';
    }
    return true; // 유효한 URL일 경우
  } catch (e) {
    return '올바른 형식의 URL을 입력해주세요. (예: https://www.example.com)';
  }
};

function PartnerWritePage() {
  const navigator = useNavigate();
  const [postData, setPostData] = useState({
    partnerInfo: {
      is_main: true,
      name: '',
      link: '',
    },
    logoImg: '',
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      is_main: true,
      name: '',
    },
  });

  const [isInvalid, setInvalid] = useState(true);

  const onValid = (data: IFormData) => {
    if (postData.logoImg === '') {
      alert('파일을 업로드해주세요');
      return;
    }
    handleSaveClick(data);
  };

  const handleSaveClick = async (data: IFormData) => {
    const formData = new FormData();

    formData.append(
      'partnerInfo',
      new Blob(
        [
          JSON.stringify({
            is_main: data.is_main,
            link: data.link,
            name: data.name,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    const file = await urlToFile(postData.logoImg, 'PartnerLogo.png');
    formData.append('logoImg', file);

    if (window.confirm('등록하시겠습니까?')) {
      axios
        .post(`${PROMOTION_BASIC_PATH}/api/partners`, formData)
        .then((response) => {
          console.log('Partenr posted:', response);
          alert('등록되었습니다.');
          navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_PARTNER}`);
        })
        .catch((error) => console.error('Error updating partner:', error));
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
      // console.log(blob);
      return new File([blob], fileName);
    } catch (error) {
      console.error('Error URL to file:', error);
      throw error;
    }
  }

  return (
    <ContentBlock height={380}>
      <TitleWrapper>
        <Title description='Partner 등록' />
      </TitleWrapper>

      <FormContainer onSubmit={handleSubmit(onValid)}>
        <LeftContainer>
          <LogoContainer>
            <SubTitle description='Logo' />
            {DATAEDIT_NOTICE_COMPONENTS.IMAGE.LOGO}
            {DATAEDIT_NOTICE_COMPONENTS.COLOR.LOGO}

            <ImgBox>{postData.logoImg && <img src={postData.logoImg} />}</ImgBox>
            <FileButton description='Logo Upload' id='file' width={230} onChange={handleImageChange} />
          </LogoContainer>
        </LeftContainer>

        <RightContainer>
          <SubTitle description='Link' />
          <InputWrapper>
            <input
              {...register('link', {
                required: '링크를 입력해주세요',
                validate: validateUrl,
              })}
            />
            {errors.link && <p>{errors.link.message}</p>}

            <SubTitle description='Name' />

            <input
              {...register('name', {
                required: '이름을 입력해주세요',
                validate: (value) => value.trim().length > 0 || '공백만으로는 이름을 입력할 수 없습니다.',
              })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </InputWrapper>
          <VisibilityWrapper>
            공개여부
            <input type='checkbox' id='switch' defaultChecked {...register('is_main')} />
            <ToggleSwitch option1='공개' option2='비공개' selected={true} />
          </VisibilityWrapper>
        </RightContainer>
      </FormContainer>
      <ButtonWrapper>
        <Button onClick={handleSubmit(onValid)} description='등록하기' width={100} />
      </ButtonWrapper>
    </ContentBlock>
  );
}

export default PartnerWritePage;

const RightContainer = styled.div`
  margin-left: 20px;
`;
const LeftContainer = styled.div``;
const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
`;

const VisibilityWrapper = styled.div`
  #switch {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .switch_label {
    display: flex;
    border-radius: 5px;
    cursor: pointer;
  }
  input {
    margin-top: 20px;
  }
`;

const TitleWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
`;

const ImgBox = styled.div`
  background-color: ${(props) => props.theme.color.background};
  width: 230px;
  border-radius: 4px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 90%;
    height: 90%;
    object-fit: contain;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 15px;
`;

const FormContainer = styled.form`
  display: flex;
  position: relative;
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  input {
    margin-top: 10px;
    margin-bottom: 15px;
    width: 100%;
    outline: none;
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    height: 40px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  input:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }

  p {
    font-size: 14px;
    color: ${(props) => props.theme.color.symbol};
  }
`;
