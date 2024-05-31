import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { Wrapper, ContentBlock, ImgBox, LogoWrapper, Box } from '../CompanyFormStyleComponents';
import { DATAEDIT_NOTICE_COMPONENTS, DATAEDIT_TITLES_COMPONENTS } from '../StyleComponents';
import FileButton from '../../StyleComponents/FileButton';
import Button from '../../StyleComponents/Button';
import styled from 'styled-components';

const Image = () => {
  const { data, isLoading, error } = useQuery<ICompanyData, Error>(['company', 'id'], getCompanyData);
  const [logoChange, setLogoChange] = useState(false);
  const [sloganChange, setSloganChange] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [putData, setPutData] = useState({
    logoImageUrl: data ? data?.logoImageUrl : '',
    sloganImageUrl: data ? data?.sloganImageUrl : '',
  });

  useEffect(() => {
    if (data) {
      setPutData({
        logoImageUrl: data.logoImageUrl,
        sloganImageUrl: data.sloganImageUrl,
      });
    }
  }, [data]);

  const handleSaveClick = async () => {
    const formData = new FormData();

    const fileAppend = (file: File, fileName: string) => {
      if (file) {
        formData.append(fileName, file);
      } else {
        console.log(fileName, '이미지 가져오기 실패');
      }
    };

    if (window.confirm('수정하시겠습니까?')) {
      if (logoChange && sloganChange) {
        const logoFile = await urlToFile(putData.logoImageUrl, 'Logo.png');
        const sloganFile = await urlToFile(putData.sloganImageUrl, 'Slogan.png');
        fileAppend(logoFile, 'logoImageUrl');
        fileAppend(sloganFile, 'sloganImageUrl');
        axios
          .put(`${PROMOTION_BASIC_PATH}/api/company/logo&slogan`, formData)
          .then((response) => {
            console.log('Company Images updated:', response);
            alert('수정되었습니다.');
            setEditMode(false);
          })
          .catch((error) => console.error('Error updating company:', error));
      } else if (logoChange) {
        const logoFile = await urlToFile(putData.logoImageUrl, 'Logo.png');
        fileAppend(logoFile, 'logoImageUrl');
        axios
          .put(`${PROMOTION_BASIC_PATH}/api/company/logo`, formData)
          .then((response) => {
            console.log('Company Logo updated:', response);
            alert('수정되었습니다.');
            setEditMode(false);
          })
          .catch((error) => console.error('Error updating company:', error));
      } else if (sloganChange) {
        const sloganFile = await urlToFile(putData.sloganImageUrl, 'Slogan.png');
        fileAppend(sloganFile, 'sloganImageUrl');
        axios
          .put(`${PROMOTION_BASIC_PATH}/api/company/slogan`, formData)
          .then((response) => {
            console.log('Company Slogan updated:', response);
            alert('수정되었습니다.');
            setEditMode(false);
          })
          .catch((error) => console.error('Error updating company:', error));
      }
    }
  };
  const handleLogoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const logoImageUrl = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPutData((prevData) => ({
          ...prevData,
          logoImageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(logoImageUrl);
      setLogoChange(true);
    }
  };

  const handleSloganImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const sloganImageUrl = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPutData((prevData) => ({
          ...prevData,
          sloganImageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(sloganImageUrl);
      setSloganChange(true);
    }
  };

  async function urlToFile(url: string, fileName: string): Promise<File> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      console.log(blob);
      return new File([blob], fileName);
    } catch (error) {
      console.error('Error URL to file:', error);
      throw error;
    }
  }

  if (isLoading) return <>is Loading..</>;
  if (error) return <>{error.message}</>;
  return (
    <>
      <Wrapper>
        {data && (
          <>
            <ContentBlock>
              <InputImgWrapper>
                <Box>
                  {DATAEDIT_TITLES_COMPONENTS.Logo}
                  {editMode && DATAEDIT_NOTICE_COMPONENTS.IMAGE.LOGO}
                  {editMode && DATAEDIT_NOTICE_COMPONENTS.COLOR.LOGO}

                  <LogoWrapper>
                    {editMode && (
                      <FileButton id='logoFile' description='Logo Upload' onChange={handleLogoImageChange} />
                    )}

                    <ImgBox>
                      <img src={putData.logoImageUrl} />
                    </ImgBox>
                  </LogoWrapper>
                </Box>
                <Box>
                  {DATAEDIT_TITLES_COMPONENTS.Slogan}
                  {editMode && DATAEDIT_NOTICE_COMPONENTS.IMAGE.SLOGAN}
                  {editMode && DATAEDIT_NOTICE_COMPONENTS.COLOR.SLOGAN}
                  <LogoWrapper>
                    {editMode && (
                      <FileButton id='sloganFile' description='Slogan Upload' onChange={handleSloganImageChange} />
                    )}
                    <ImgBox>
                      <img src={putData.sloganImageUrl} />
                    </ImgBox>
                  </LogoWrapper>
                </Box>
                <ButtonWrapper>
                  {editMode ? (
                    <Button fontSize={14} width={100} description='저장하기' onClick={handleSaveClick} />
                  ) : (
                    <Button fontSize={14} width={100} description='수정하기' onClick={() => setEditMode(true)} />
                  )}
                </ButtonWrapper>
              </InputImgWrapper>
            </ContentBlock>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Image;

const ButtonWrapper = styled.div`
  background-color: pink;
  position: absolute;
  right: 0px;
`;

const InputImgWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: space-between;
`;
