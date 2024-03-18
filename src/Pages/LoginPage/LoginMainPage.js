import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  height: 100vh;
 
`;

const LoginBox = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 5px 80px;

`;

const LoginForm = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AlignLeft = styled.div`
  align-self: flex-start;
  padding: 8px;
`;

const TitleCenterBox = styled.div`
  display: block;
  justify-items: center;
`;

const InputSize = styled.input`
  border: none;
  border-bottom: 1px solid #000000;
  width: 100%;
  min-width: 288px;
  height: 40px;
  margin: 16px;
  &:focus {
    outline: none;
  }
`;

const Margin16px = styled.div`
  margin: 1rem;
`;

const LoginPageButton = styled.button`
  background-color: #ff530e;
  color: #ffffff;
  width: 100%;
  padding: 8px 20px;
  border: none;
  border-radius: 32px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* 배경색 변화 시 부드러운 전환 효과 */
  margin: 0.5rem;
  height: 44px;
  &:hover {
    background-color: #cccccc;
  }
`;

const WhiteBoxContainer = styled.div`
  padding: 16px 64px 64px 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 2px #e9e9e9;

`;

function LoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        pwd: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = () => {
        axios
            .post("/user-service/login", formData)
            .then((response) => {
                const accessToken = response.data.accessToken;
                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + accessToken; // 토큰을 HTTP 헤더에 포함
                sessionStorage.setItem("login-token", accessToken);

                alert("로그인 성공");
                navigate("/admin");
            })
            .catch((error) => {
                alert("로그인 실패");
                console.error("API 요청 중 오류 발생:", error);
            });
    };

    return (
        <LoginContainer>
            <WhiteBoxContainer>
                <LoginBox>
                    <LoginForm >
                        <AlignLeft>
                            <text>Email</text>
                        </AlignLeft>
                        <InputSize
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <AlignLeft>
                            <text>Password</text>
                        </AlignLeft>
                        <InputSize
                            name="pwd"
                            value={formData.pwd}
                            onChange={handleChange}
                            type="password"
                        />

                        <LoginPageButton onClick={() => handleLogin()}>
                            LOGIN
                        </LoginPageButton>

                    </LoginForm>
                </LoginBox>
            </WhiteBoxContainer>
        </LoginContainer>
    );
}

export default LoginPage;