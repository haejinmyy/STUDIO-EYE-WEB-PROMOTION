import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 배경을 어둡게 처리 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* 다른 요소 위에 표시 */
`;

const Modal = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Text = styled.text`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
`;

const Button = styled.button`
    font-size: 1rem;
    font-weight: 400;
    margin: 1rem 0.25rem;
`;

const Div = styled.div`
   margin: 0.25rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Title = styled.div`
    margin-right: 5%;
    width: 25%;
`;
const Input = styled.input`
    width: 70%;
`;

function AdminModal({onCancel}) {

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
            axios.post(`/user-service/login`, formData)
                .then((response) => {
                    // const accessToken = response.data.accessToken;
                    // axios.defaults.headers.common["Authorization"] =
                    //     "Bearer " + accessToken; // 토큰을 HTTP 헤더에 포함
                    // sessionStorage.setItem("login-token", accessToken);

                    alert("로그인 성공");
                    navigate("/admin");
                })
                .catch((error) => {
                    alert("로그인 실패");
                    if (error.response) {
                        // 서버에서 응답을 받은 경우 (상태 코드가 설정된 경우)
                        console.error('Response Error:', error.response.status, error.response.data);
                    } else if (error.request) {
                        // 서버로 요청이 전송되지 않은 경우
                        console.error('Request Error:', error.request);
                    } else {
                        // 그 외의 에러
                        console.error('Error:', error.message);
                    }
                });
        };


    return (
        <ModalContainer>
            <Modal>
                <Text>정보를 입력하세요</Text>
                <Div>
                    <Title>ID</Title>
                    <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Div>
                <Div>
                    <Title>PW</Title>
                    <Input
                        name="pwd"
                        value={formData.pwd}
                        onChange={handleChange}
                        type="password"
                    />
                </Div>
                <div>
                <Button onClick={() => handleLogin()}>확인</Button>
                <Button onClick={onCancel}>취소</Button>
                </div>
            </Modal>
        </ModalContainer>
    );
}

export default AdminModal;