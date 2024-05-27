import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

type Props = {
  label: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTextAreaChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isEditMode: boolean;
  isFile: boolean;
  mainFile?: string;
};

const ArtworkInput = ({ label, name, value, onChange, onTextAreaChange, isEditMode, isFile, mainFile }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(mainFile || value);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <Container>
      {isFile ? (
        <>
          <LabelWrapper>{label}</LabelWrapper>
          <FileDes>Main Images는 최대 한 개만 지정이 가능합니다.</FileDes>
          {isEditMode ? (
            <>
              <FileWrapper>
                <FileLabel htmlFor='file-upload'>이미지 업로드</FileLabel>
                <FileInput
                  type='file'
                  id='file-upload'
                  accept='image/*'
                  name={name}
                  value={value}
                  onChange={handleFileChange}
                />
                <MainImg src={previewUrl || mainFile} alt='mainFile' />
              </FileWrapper>
            </>
          ) : (
            mainFile && <MainImg src={mainFile} alt='mainFile' />
          )}
        </>
      ) : (
        <TextInputWrapper>
          <TextInputLabelWrapper>{label}</TextInputLabelWrapper>
          {isEditMode ? (
            <textarea name={name} defaultValue={value} onChange={onTextAreaChange} />
          ) : (
            <DetailWrapper>{value}</DetailWrapper>
          )}
        </TextInputWrapper>
      )}
    </Container>
  );
};
export default ArtworkInput;

const Container = styled.div`
  input[type='file'] {
    display: none;
  }
`;

const FileLabel = styled.label`
  background: inherit;
  border-style: none;
  border-radius: 5px;
  height: 30px;
  padding: 5px 10px;

  cursor: pointer;
  font-family: 'pretendard-regular';
  font-size: 15px;
  background-image: none;
  color: #fff;
  background-color: #2b2b2b;

  &:hover {
    background-color: #2b2b2b71;
    transition: all 300ms ease-in-out;
  }
`;
const FileWrapper = styled.div`
  margin-bottom: 15px;
`;
const FileInput = styled.input`
  display: none;
`;
const LabelWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 20px;
  margin-bottom: 15px;
`;

const MainImg = styled.img`
  width: 100%;
  height: 280px;
  object-fit: contain;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const FileDes = styled.div`
  font-family: 'pretendard-light';
  font-size: 15px;
  opacity: 0.8;
  margin-bottom: 15px;
`;

const TextInputWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  height: fit-content;
  align-items: center;

  textarea {
    font-family: 'pretendard-regular';
    font-size: 18px;
    height: fit-content;
    background: inherit;
    border-radius: 5px;
    border-style: none;
    background-color: #f7f7f7f2;
    resize: none; /* 크기 조절 비활성화 */
    display: flex;
    align-items: center;
    width: 90%;
    padding: 10px;
    overflow-y: hidden;
    &:hover {
      background-color: #7e7e7e2c;
      transition: all 300ms ease-in-out;
    }
    &:focus {
      outline: none;
    }
  }
`;
const TextInputLabelWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 20px;
  width: 100px;
`;

const DetailWrapper = styled.div`
  font-family: 'pretendard-regular';
  height: fit-content;
`;
