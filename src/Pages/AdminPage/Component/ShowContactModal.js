import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  height: 80%;
  overflow-y: auto;
`;

const Div = styled.div`
    height: 40%;
    padding: 2%;
    overflow: auto;
    margin: 1% 0;
    border: 0.5px solid black;
`;

const FileDiv = styled.div`
    height: 20%;
    padding: 2%;
    overflow: auto;
    margin: 1% 0;
    border: 0.5px solid black;
`;

const StyledButton = styled.button`
    background-color: #FFA900;
    color: #fff;
    padding: 10px 15px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
        background-color: #FFD500;
    }
`;

const ButtonContainer = styled.div`
    text-align: right;
    margin-top: 10px;  // 버튼과의 간격 조절을 위해 추가
`;

function ShowContactModal({ item, onClose, onDelete }) {
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (item.fileUrlList && item.fileUrlList.length > 0) {
            setFileList(item.fileUrlList);
        }
    }, [item.fileUrlList]);

    const downloadFile = (url) => {
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.target = '_blank';

        const fileName = url.substring(url.lastIndexOf('/') + 1);

        anchor.download = fileName;

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };

    const deleteContact = () => {
        const shouldDelete = window.confirm("정말 삭제하시겠습니까?");

        if (shouldDelete) {
            axios.delete(`https://port-0-promoationpage-server-12fhqa2blnlum4de.sel5.cloudtype.app/api/requests/${item.id}`)
                .then((response) => {
                    onDelete(item.id);
                    onClose();
                    alert("삭제되었습니다.");
                })
                .catch((error) => {
                    console.error('Error deleting contact:', error);
                });
        }
    };

    return (
        <ModalBackground>
            <ModalContent>
                <h2>문의사항</h2>
                <Div>
                    <p>{item.description}</p>
                </Div>
                <FileDiv>
                    {fileList.map((file, index) => (
                        <div key={index}>
                            {file.toLowerCase().endsWith('.png') && (
                                <div>
                                    <img src={file} alt={`Image ${index}`} />
                                </div>
                            )}
                            <div>
                                <a href={file} target="_blank" rel="noreferrer">
                                    {file.substring(file.lastIndexOf('/') + 1)}
                                </a>
                                <button onClick={() => downloadFile(file)}>Download</button>
                            </div>
                        </div>
                    ))}
                </FileDiv>
                <ButtonContainer>
                    <StyledButton onClick={deleteContact}>삭제</StyledButton>
                    <StyledButton onClick={onClose}>닫기</StyledButton>
                </ButtonContainer>
            </ModalContent>
        </ModalBackground>
    );
}

export default ShowContactModal;
