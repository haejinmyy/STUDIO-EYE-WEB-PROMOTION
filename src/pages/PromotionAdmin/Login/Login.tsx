import { login } from '@/apis/PromotionAdmin/login';
import { authState } from '@/recoil/atoms';
import { loginType } from '@/types/PromotionAdmin/login';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import LoginComponent from '@/components/PromotionPage/Login/Login';
import { PA_ROUTES } from '@/constants/routerConstants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const setAuth = useSetRecoilState(authState);
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const formData = { email, pwd };
      console.log('보내는 데이터', formData);
      const response = await login(formData);
      setAuth({ accessToken: response.accessToken, userId: response.id });
      window.alert('로그인 성공');
      if (auth.userId) {
        navigate(PA_ROUTES.HOME);
      }
    } catch (error) {
      const errorMessage = '로그인에 실패했습니다. 다시 시도해주세요.';
      window.alert(errorMessage);
      console.log('Login 실패', error);
    }
  };
  return (
    <Container>
      <YellowCircle top='70%' left='10%' />
      <LoginComponent email={email} setEmail={setEmail} pwd={pwd} setPwd={setPwd} handleLogin={handleLogin} />
      <YellowCircle top='30%' left='80%' />
    </Container>
  );
};

export default Login;

interface YellowCircleProps {
  top: string;
  left: string;
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const YellowCircle = styled.div<YellowCircleProps>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  border-radius: 50%;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 169, 0, 0.1943);
  box-shadow: 0 0 250px 240px rgba(255, 169, 0, 0.2);
`;
