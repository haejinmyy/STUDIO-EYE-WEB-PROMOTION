import { getClientData } from '@/apis/PromotionAdmin/dataEdit';
import { IClientData } from '@/types/PromotionAdmin/dataEdit';
import { useQuery } from 'react-query';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import axios from 'axios';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { useForm } from 'react-hook-form';
import { PA_ROUTES } from '@/constants/routerConstants';
import { useEffect } from 'react';

type IFormData = {
  errors: {
    name: {
      message: string;
    };
  };
  name: string;
  logoImg: string;
};

export default function ClientEditPage() {
  const { data, isLoading, refetch } = useQuery<IClientData[]>(['client', 'id'], getClientData);
  const navigator = useNavigate();

  const clientEditMatch = useMatch(`${PA_ROUTES.DATA_EDIT}/client/:clientId`);
  const clickedClient =
    clientEditMatch?.params.clientId && data?.find((c) => String(c.clientInfo.id) === clientEditMatch.params.clientId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      name: clickedClient && clickedClient.clientInfo.name,
      logoImg: clickedClient && clickedClient.logoImg,
    },
  });
  const onValid = (data: IFormData) => {
    const formData = {
      clientInfo: {
        clientId: clickedClient && clickedClient.clientInfo.id,
        name: data.name,
      },
      // logoImg: data.logoImg
      logoImg:
        'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/65da5a50-7695-48b4-8d99-4918687710ca.png',
    };

    console.log(formData);
    if (window.confirm('수정하시겠습니까?')) {
      axios
        .put(`${PROMOTION_BASIC_PATH}/api/client`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response);
          alert('수정되었습니다.');
        })
        .catch((error) => console.log(error));
      navigator(``);
    }

    console.log(data);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .delete(`${PROMOTION_BASIC_PATH}/api/client/${id}`)
        .then((response) => {})
        .catch((error) => console.log(error));

      alert('삭제되었습니다.');
      navigator('');
    }
  };

  if (isLoading) return <div>is Loading...</div>;
  return (
    <Wrapper>
      <EditComponent>
        {clickedClient && (
          <form onSubmit={handleSubmit(onValid)}>
            <ImgWrapper>
              <img src={clickedClient.logoImg} alt='main img' />
            </ImgWrapper>

            <input
              {...register('name', {
                required: true,
              })}
              placeholder='name'
              defaultValue={clickedClient.clientInfo.name}
            />
            <input {...register('logoImg', { required: true })} placeholder='logo' />
            <button type='submit'>저장</button>
            <button onClick={() => handleDelete(clickedClient.clientInfo.id)}>삭제</button>
          </form>
        )}
      </EditComponent>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-left: 100px;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.color.white.bold};
  width: 40vw;
  height: 70vh;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
`;

const Button = styled.div`
  cursor: pointer;
  position: absolute;
  right: -5px;
  top: -5px;
  display: flex;
  background-color: ${(props) => props.theme.color.yellow.bold};
  width: 25px;
  height: 25px;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  color: ${(props) => props.theme.color.white.bold};
`;

const EditComponent = styled(motion.div)`
  position: relative;

  margin: auto;
  margin-bottom: 50px;

  img {
    width: 10vw;
  }
`;

const ImgWrapper = styled.div`
  background-color: ${(props) => props.theme.color.black.bold};
  margin-top: 20px;
  width: 100%;
  height: 300px;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  justify-content: center;
  display: flex;
  font-size: 18px;
  padding-top: 10px;
`;

const ClientCardWrapper = styled(motion.div)``;
