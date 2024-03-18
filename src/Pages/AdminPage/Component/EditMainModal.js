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
`;

const Label = styled.label`
    margin-right: 5%;
    width: 60%;
`;

const Select = styled.select`
    width: 35%;
`;
const Div = styled.div`
    margin: 0.5rem 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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



function EditNoticeModal({ item, onCancel}) {

    const [selectedOption, setSelectedOption] = useState(false);

    const handleOptionChange = (e) => {
        console.log(e.target.value);
        if(e.target.value==="true"){
            setSelectedOption(true);
        }
        else{
            setSelectedOption(false);
        }
    };

    const postOverView = () => {
        console.log(item);
        console.log(item.id);
        console.log(selectedOption);

        const id = item.id;
        const option = selectedOption;

        const update = {
            projectId: id,
            isPosted: option
        };

        console.log(update);

            axios
                .post(`https://port-0-promoationpage-server-12fhqa2blnlum4de.sel5.cloudtype.app/api/projects/is-posted`, update)
                .then((response) => {
                    console.log('변경되었습니다.', response);
                    onCancel(); // 삭제가 완료되면 취소 함수를 호출하여 모달을 닫습니다.
                })
                .catch((error) => {
                    console.error('변경 중 오류가 발생했습니다.', error);
                });

    };



    return (
        <ModalContainer>
            <Modal>
                <Text>게시여부 변경</Text>
                <Div>
                    <Label>옵션 선택</Label>
                    <Select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
                        <option value="false">X</option>
                        <option value="true">O</option>
                    </Select>
                </Div>
                <div>
                    <StyledButton onClick={postOverView}>변경</StyledButton>
                    <StyledButton onClick={onCancel}>취소</StyledButton>
                </div>
            </Modal>
        </ModalContainer>
    );
}

export default EditNoticeModal;