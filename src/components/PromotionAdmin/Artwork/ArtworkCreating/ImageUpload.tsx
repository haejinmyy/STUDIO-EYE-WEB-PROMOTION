import React, { useState } from 'react';
import styled from 'styled-components';

type ImageUploadProps = {
  type: 'main' | 'detail';
  onChange: (newImage: string | string[]) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ type, onChange }) => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      let selectedFiles;
      if (type === 'detail') {
        selectedFiles = Array.from(event.target.files).slice(0, 3);
      } else {
        selectedFiles = [event.target.files[0]];
      }

      const newImages = selectedFiles.map((file) => {
        const reader = new FileReader();
        return new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newImages).then((newImageData) => {
        if (type === 'main') {
          setImages(newImageData);
          onChange(newImageData[0]);
        } else {
          setImages(newImageData);
          onChange(newImageData);
        }
      });
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <>
      <ImageUploadContainer>
        <UploadLabel htmlFor={`${type}-image-upload`}>{type === 'main' ? '메인' : '디테일'} 이미지 업로드</UploadLabel>
        <input
          id={`${type}-image-upload`}
          type='file'
          accept='image/*'
          multiple={type === 'detail'}
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </ImageUploadContainer>
      <ImagesPreviewContainer>
        {images.map((image, index) => (
          <ImagePreviewWrapper key={index}>
            <ImagePreview src={image} alt={`${type === 'main' ? 'Main' : 'Detail'} Image ${index + 1}`} />
            <DeleteButton onClick={() => handleDeleteImage(index)}>삭제하기</DeleteButton>
          </ImagePreviewWrapper>
        ))}
      </ImagesPreviewContainer>
    </>
  );
};

export default ImageUpload;

const ImageUploadContainer = styled.div`
  display: flex;
  font-family: 'pretendard-regular';
`;

const UploadLabel = styled.label`
  cursor: pointer;
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border-radius: 5px;
  margin-bottom: 10px;

  &:hover {
    background-color: #5a6268;
  }
`;

const ImagesPreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
  display: inline-block;
  max-width: 100%;
  max-height: 200px;

  &:hover button {
    display: block;
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 5px;
  margin-top: 5px;
`;

const DeleteButton = styled.button`
  display: none;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'pretendard-regular';

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
