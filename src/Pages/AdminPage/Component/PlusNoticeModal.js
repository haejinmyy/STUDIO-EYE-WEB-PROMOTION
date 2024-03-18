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
`;

const Text = styled.text`
    font-size: 2rem;
    font-weight: 600;
     margin: 0.5rem 0;
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

const StyledButton = styled.button`
  background-color: #FFA900;
  color: #fff;
  padding: 4px 8px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #FFD500;
  }
`;

function PlusNoticeModal({onCancel}) {

    const createNoticeBoardRequestDto = {
        title: " "

    }

    const [item, setItem] = useState(createNoticeBoardRequestDto);
    const [image, setImage] = useState();

    const onImageHandler = (event) => {
        setImage(()=>event.target.files[0]);

    };


    const AddNotice = () => {

        console.log(item);
        console.log(image);
        const formData = new FormData();
        formData.append(
            "createNoticeBoardRequestDto",
            new Blob([JSON.stringify(item)], { type: "application/json" })
        );
        formData.append('file', image);

        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

            axios
                .post(`https://port-0-promoationpage-server-12fhqa2blnlum4de.sel5.cloudtype.app/api/notice-board`, formData)
                .then((response) => {
                    console.log('등록되었습니다.', response);
                    onCancel(); // 삭제가 완료되면 취소 함수를 호출하여 모달을 닫습니다.
                })
                .catch((error) => {
                    console.error('등록 중 오류가 발생했습니다.', error);
                });

    };



    return (
        <ModalContainer>
            <Modal>
                <Text>공지사항 추가</Text>
                <Div>
                    <Title>제목</Title>
                    <Input
                        type="text"
                        onChange={(e) => setItem({ ...item, title: e.target.value })}
                    />
                </Div>
                <Div>
                    <Title>이미지</Title>
                    <Input type="file" accept='image/*' onChange={onImageHandler} />
                </Div>
                <div>
                <StyledButton onClick={AddNotice}>저장</StyledButton>
                <StyledButton onClick={onCancel}>취소</StyledButton>
                </div>
            </Modal>
        </ModalContainer>
    );
}

export default PlusNoticeModal;