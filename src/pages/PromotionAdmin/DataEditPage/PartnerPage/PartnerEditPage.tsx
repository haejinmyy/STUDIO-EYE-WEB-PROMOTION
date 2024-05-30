import { getPartnersData } from '@/apis/PromotionAdmin/dataEdit';
import { ContentBlock } from '@/components/PromotionAdmin/DataEdit/Company/CompanyFormStyleComponents';
import Button from '@/components/PromotionAdmin/DataEdit/StyleComponents/Button';
import FileButton from '@/components/PromotionAdmin/DataEdit/StyleComponents/FileButton';
import SubTitle from '@/components/PromotionAdmin/DataEdit/StyleComponents/SubTitle';
import Title from '@/components/PromotionAdmin/DataEdit/StyleComponents/Title';
import ToggleSwitch from '@/components/PromotionAdmin/DataEdit/StyleComponents/ToggleSwitch';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import { IPartnersData } from '@/types/PromotionAdmin/dataEdit';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { validateUrl } from './PartnerWritePage';
import { DATAEDIT_NOTICE_COMPONENTS } from '@/components/PromotionAdmin/DataEdit/Company/StyleComponents';

interface IFormData {
  is_main: boolean;
  link: string;
  name: string;
}

function PartnerEditPage() {
  const { data, isLoading, error } = useQuery<IPartnersData[], Error>(['partners', 'id'], getPartnersData);
  const navigator = useNavigate();
  const partnerEditMatch = useMatch(`${PA_ROUTES.DATA_EDIT}/partner/:partnerId`);
  const clickedPartner =
    partnerEditMatch?.params.partnerId &&
    data?.find((p) => String(p.partnerInfo.id) === partnerEditMatch.params.partnerId);
  const [imgChange, setImgChange] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      is_main: clickedPartner ? clickedPartner.partnerInfo.is_main : true,
      link: clickedPartner ? clickedPartner.partnerInfo.link : '',
      name: clickedPartner ? clickedPartner.partnerInfo.name : '',
    },
  });

  const [putData, setPutData] = useState({
    partnerInfo: {
      id: clickedPartner && clickedPartner.partnerInfo.id,
      is_main: clickedPartner && clickedPartner.partnerInfo.is_main,
      link: clickedPartner && clickedPartner.partnerInfo.link,
      name: clickedPartner && clickedPartner.partnerInfo.name,
    },
    logoImg: clickedPartner ? clickedPartner.logoImg : '',
  });

  const [isVisibility, setIsVisibility] = useState(putData.partnerInfo.is_main);

  useEffect(() => {
    if (clickedPartner) {
      reset({
        link: clickedPartner.partnerInfo.link,
        name: clickedPartner.partnerInfo.name,
        is_main: clickedPartner.partnerInfo.is_main,
      });
      setPutData({
        partnerInfo: {
          id: clickedPartner.partnerInfo.id,
          is_main: clickedPartner.partnerInfo.is_main,
          link: clickedPartner.partnerInfo.link,
          name: clickedPartner.partnerInfo.name,
        },
        logoImg: clickedPartner.logoImg,
      });
    }
  }, [partnerEditMatch?.params.partnerId, reset]);

  const onValid = (data: IFormData) => {
    handleSaveClick(data);
  };

  const handleSaveClick = async (data: IFormData) => {
    const formData = new FormData();

    formData.append(
      'partnerInfo',
      new Blob(
        [
          JSON.stringify({
            id: putData.partnerInfo.id,
            is_main: isVisibility,
            link: data.link,
            name: data.name,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    if (window.confirm('수정하시겠습니까?')) {
      if (imgChange) {
        const file = await urlToFile(putData.logoImg, 'Logo.png');
        if (file) {
          formData.append('logoImg', file);
        } else {
          console.error('로고 이미지 가져오기 실패');
        }

        axios
          .put(`${PROMOTION_BASIC_PATH}/api/partners`, formData)
          .then((response) => {
            console.log('Partner updated:', response);
            alert('수정되었습니다.');
            navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_PARTNER}`);
          })
          .catch((error) => console.error('Error updating partner:', error));
      } else {
        axios
          .put(`${PROMOTION_BASIC_PATH}/api/partners/modify`, formData)
          .then((response) => {
            console.log('Partners updated:', response);
            alert('수정되었습니다.');
            navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_PARTNER}`);
          })
          .catch((error) => console.error('Error updating partner:', error));
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const logoImg = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPutData((prevData) => ({
          ...prevData,
          logoImg: reader.result as string,
        }));
      };
      reader.readAsDataURL(logoImg);
      setImgChange(true);
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

  const handleDelete = (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .delete(`${PROMOTION_BASIC_PATH}/api/partners/${id}`)
        .then((response) => {})
        .catch((error) => console.log(error));

      alert('삭제되었습니다.');
      navigator(`${PA_ROUTES.DATA_EDIT}/partner`);
    }
  };

  if (isLoading) return <>is Loading..</>;
  if (error) return <>{error.message}</>;
  return (
    <ContentBlock>
      <TitleWrapper>
        <Title description='Partner 수정' />
      </TitleWrapper>
      {clickedPartner && (
        <FormContainer onSubmit={handleSubmit(onValid)}>
          <LeftContainer>
            <LogoContainer>
              <SubTitle description='Logo' />
              {DATAEDIT_NOTICE_COMPONENTS.IMAGE.LOGO}
              {DATAEDIT_NOTICE_COMPONENTS.COLOR.LOGO}

              <ImgBox>{putData.logoImg && <img src={putData.logoImg} />}</ImgBox>
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
                })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </InputWrapper>
            <VisibilityWrapper>
              공개여부
              <input type='checkbox' id='switch' defaultChecked {...register('is_main')} />
              <ToggleSwitch
                option1='공개'
                option2='비공개'
                selected={clickedPartner.partnerInfo.is_main}
                onToggle={setIsVisibility}
              />
            </VisibilityWrapper>
          </RightContainer>

          <ButtonWrapper>
            <Button description='저장하기' width={100} />
            <Button
              onClick={() => {
                handleDelete(clickedPartner.partnerInfo.id);
              }}
              description='삭제하기'
              width={100}
            />
          </ButtonWrapper>
        </FormContainer>
      )}
    </ContentBlock>
  );
}

export default PartnerEditPage;

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
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: -70px;
  right: -10px;
  width: 210px;
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
    color: ${(props) => props.theme.color.symbol};
  }
`;
