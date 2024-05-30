import { getClientData } from '@/apis/PromotionAdmin/dataEdit';
import { ContentBlock } from '@/components/PromotionAdmin/DataEdit/Company/CompanyFormStyleComponents';
import { DATAEDIT_NOTICE_COMPONENTS } from '@/components/PromotionAdmin/DataEdit/Company/StyleComponents';
import Button from '@/components/PromotionAdmin/DataEdit/StyleComponents/Button';
import FileButton from '@/components/PromotionAdmin/DataEdit/StyleComponents/FileButton';
import SubTitle from '@/components/PromotionAdmin/DataEdit/StyleComponents/SubTitle';
import Title from '@/components/PromotionAdmin/DataEdit/StyleComponents/Title';
import ToggleSwitch from '@/components/PromotionAdmin/DataEdit/StyleComponents/ToggleSwitch';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import { IClientData } from '@/types/PromotionAdmin/dataEdit';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface IFormData {
  name: string;
  visibility: boolean;
}

function ClientEditPage() {
  const { data, isLoading, error } = useQuery<IClientData[], Error>(['client', 'id'], getClientData);
  const navigator = useNavigate();
  const clientEditMatch = useMatch(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_CLIENT}/:clientId`);
  const clickedClient =
    clientEditMatch?.params.clientId && data?.find((c) => String(c.clientInfo.id) === clientEditMatch.params.clientId);
  const [imgChange, setImgChange] = useState(false);

  const { register, handleSubmit, reset } = useForm<IFormData>({
    defaultValues: {
      name: clickedClient ? clickedClient.clientInfo.name : '',
      visibility: true,
    },
  });

  const [putData, setPutData] = useState({
    clientInfo: {
      clientId: clickedClient && clickedClient.clientInfo.id,
      name: clickedClient && clickedClient.clientInfo.name,
      visibility: clickedClient && clickedClient.clientInfo.visibility,
    },
    logoImg: clickedClient ? clickedClient.logoImg : '',
  });

  const [isVisibility, setIsVisibility] = useState(putData.clientInfo.visibility);

  useEffect(() => {
    if (clickedClient) {
      reset({
        name: clickedClient.clientInfo.name,
      });
      setPutData({
        clientInfo: {
          clientId: clickedClient.clientInfo.id,
          name: clickedClient.clientInfo.name,
          visibility: clickedClient.clientInfo.visibility,
        },
        logoImg: clickedClient.logoImg,
      });
    }
  }, [clientEditMatch?.params.clientId, reset]);

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
            clientId: putData.clientInfo.clientId,
            name: data.name,
            visibility: isVisibility,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    if (window.confirm('수정하시겠습니까?')) {
      if (imgChange) {
        const file = await urlToFile(putData.logoImg, 'ClientLogo.png');
        if (file) {
          formData.append('logoImg', file);
        } else {
          console.error('로고 이미지 가져오기 실패');
        }

        axios
          .put(`${PROMOTION_BASIC_PATH}/api/client`, formData)
          .then((response) => {
            console.log('Client updated:', response);
            alert('수정되었습니다.');
            navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_CLIENT}`);
          })
          .catch((error) => console.error('Error updating client:', error));
      } else {
        console.log('put ', data.visibility);
        axios
          .put(`${PROMOTION_BASIC_PATH}/api/client/modify`, formData)
          .then((response) => {
            console.log('Client updated:', response);
            alert('수정되었습니다.');
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
        .delete(`${PROMOTION_BASIC_PATH}/api/client/${id}`)
        .then((response) => {})
        .catch((error) => console.log(error));

      alert('삭제되었습니다.');
      navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_CLIENT}`);
    }
  };

  if (isLoading) return <>is Loading..</>;
  if (error) return <>{error.message}</>;
  return (
    <>
      {clickedClient && (
        <ContentBlock id={clickedClient.clientInfo.id + ''}>
          <TitleWrapper>
            <Title description='Client 수정' />
          </TitleWrapper>

          {clickedClient && (
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
                <InputWrapper>
                  <SubTitle description='Name' />
                  <input
                    {...register('name', {
                      required: '이름을 입력해주세요',
                    })}
                    placeholder='이름을 입력해주세요'
                  />
                </InputWrapper>
                <VisibilityWrapper>
                  공개여부
                  <input type='checkbox' id='switch' defaultChecked {...register('visibility')} />
                  <ToggleSwitch
                    option1='공개'
                    option2='비공개'
                    selected={clickedClient.clientInfo.visibility}
                    onToggle={setIsVisibility}
                  />
                </VisibilityWrapper>
              </RightContainer>
              <ButtonWrapper>
                <Button description='저장하기' width={100} />
                <Button
                  onClick={() => {
                    handleDelete(clickedClient.clientInfo.id);
                  }}
                  description='삭제하기'
                  width={100}
                  as={'div'}
                />
              </ButtonWrapper>
            </FormContainer>
          )}
        </ContentBlock>
      )}
    </>
  );
}

export default ClientEditPage;

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
  bottom: -110px;
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
