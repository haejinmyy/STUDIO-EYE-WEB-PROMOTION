import { getClientData } from '@/apis/PromotionAdmin/dataEdit';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import { IClientData } from '@/types/PromotionAdmin/dataEdit';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

interface IFormData {
  name: string;
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
    },
  });

  const [putData, setPutData] = useState({
    clientInfo: {
      clientId: clickedClient && clickedClient.clientInfo.id,
      name: clickedClient && clickedClient.clientInfo.name,
    },
    logoImg: clickedClient ? clickedClient.logoImg : '',
  });

  useEffect(() => {
    if (clickedClient) {
      reset({
        name: clickedClient.clientInfo.name,
      });
      setPutData({
        clientInfo: {
          clientId: clickedClient.clientInfo.id,
          name: clickedClient.clientInfo.name,
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
        <Wrapper id={clickedClient.clientInfo.id + ''}>
          {clickedClient && (
            <form onSubmit={handleSubmit(onValid)}>
              <Content>
                <Title>Name</Title>
                <input
                  {...register('name', {
                    required: '이름을 입력해주세요',
                  })}
                  placeholder='이름을 입력해주세요'
                />
              </Content>

              <Content>
                <Title>Logo</Title>
                <LogoWrapper>
                  <img src={putData.logoImg} />
                  <label htmlFor='file'>
                    <div>Logo Upload</div>
                    <input id='file' type='file' accept='image/*' onChange={handleImageChange} />
                  </label>
                </LogoWrapper>
              </Content>
              <button>Submit</button>
              <button
                onClick={() => {
                  handleDelete(clickedClient.clientInfo.id);
                }}
              >
                Delete
              </button>
            </form>
          )}
        </Wrapper>
      )}
    </>
  );
}

export default ClientEditPage;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  font-size: 1.3rem;
`;

const Content = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  position: fixed;
  left: 50vw;
  margin-left: 100px;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.color.white.bold};
  width: 40vw;
  height: 70vh;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
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
    width: 130px;
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
