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
    width: 35%;
`;
const Input = styled.input`
    width: 60%;
`;

const CategorySelect = styled.select`
  width: 60%;
  padding: 5px;
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

function PlusArtworkModal({ onSave, onCancel }) {
    const [imageList, setImageList] = useState([]);

    const onImageHandler = (event) => {
        setImageList([...imageList, ...event.target.files]);

    };

    const [data, setData] = useState({
        department: "",
        category: "Entertainment",
        name: "",
        client: "",
        date: "",
        link: "",
        overView: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = () => {

        for (const key in data) {
            if (data[key].trim() === "") {
                alert(`${key}을(를) 작성해주세요!`);
                return;
            }
        }

        if(imageList.length === 0){
            alert(`이미지를 지정해주세요!`);
            return;
        }

        const formData = new FormData();
        formData.append("request", new Blob([JSON.stringify(data)], {type: "application/json"}));
        imageList.forEach(image => {
            formData.append('files', image);
        });

        axios
            .post(` https://port-0-promoationpage-server-12fhqa2blnlum4de.sel5.cloudtype.app/api/projects`, formData)
            .then((response) => {
                console.log('등록되었습니다.', response);
                onSave()
                onCancel(); // 삭제가 완료되면 취소 함수를 호출하여 모달을 닫습니다.
                // 입력값 초기화
                setData({
                    department: "",
                    category: "",
                    name: "",
                    client: "",
                    date: "",
                    link: "",
                    overView: "",});

                //fetchData();
                ;
            })
            .catch((error) => {
                console.error('등록 중 오류가 발생했습니다.', error);
            });

    };

    const [categories, setCategories] = useState([
        "Entertainment",
        "Drama",
        "Documentary",
        "Channel Operating",
        "Branded",
        "Motion Graphic",
        "Animation",
        "Live Commerce",
    ]);

    return (
        <ModalContainer>
        <Modal>
            <Text>Artwork 생성</Text>
            <Div>
                <Title>부서</Title>
                <Input
                    type="text"
                    name="department"
                    value={data.department}
                    onChange={handleChange}
                />
            </Div>
            <Div>
                <Title>카테고리</Title>
                <CategorySelect
                    name="category"
                    value={data.category}
                    onChange={handleChange}
                    defaultValue="Entertainment"
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </CategorySelect>
            </Div>
            <Div>
                <Title>프로젝트 이름</Title>
                <Input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                />
            </Div>
            <Div>
                <Title>고객사</Title>
                <Input
                    type="text"
                    name="client"
                    value={data.client}
                    onChange={handleChange}
                />
            </Div>
            <Div>
                <Title>연도</Title>
                <Input
                    type="text"
                    name="date"
                    value={data.date}
                    onChange={handleChange}
                />
            </Div>
            <Div>
                <Title>상세 설명</Title>
                <Input
                    type="text"
                    name="overView"
                    value={data.overView}
                    onChange={handleChange}
                />
            </Div>
            <Div>
                <Title>동영상 링크</Title>
                <Input
                    type="text"
                    name="link"
                    value={data.link}
                    onChange={handleChange}
                />
            </Div>
            <Div>
                <Title>이미지</Title>
                <Input type="file" accept='image/*' multiple onChange={onImageHandler} />
            </Div>
            <StyledButton onClick={handleSubmit}>저장</StyledButton>
            <StyledButton onClick={onCancel}>취소</StyledButton>
        </Modal>
        </ModalContainer>
    );
}


export default PlusArtworkModal;