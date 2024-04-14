import { login } from '@/apis/PromotionAdmin/login';
import { authState } from '@/recoil/atoms';
import { loginType } from '@/types/PromotionAdmin/login';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const setAuth = useSetRecoilState(authState);

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response: loginType = await login(email, pwd);
      console.log('response', response);
      if (response.role === 'ADMIN') {
        setAuth({ accessToken: response.accessToken, userId: response.id });
        window.alert('로그인 성공');
        navigate('/pa-test/home');
      } else {
        window.alert('관리자만 로그인 할 수 있음');
      }
    } catch (error) {
      window.alert('이것은 에러');
      console.log('Login 실패', error);
    }
  };
  return (
    <div>
      <input type='text' placeholder='Username' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type='password' placeholder='Password' value={pwd} onChange={(e) => setPwd(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
