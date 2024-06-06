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
import { MSG } from '@/constants/messages';

interface IImageProps {
  setEditImage: (editMode: boolean) => void;
}

const Image = ({ setEditImage }: IImageProps) => {
  const { data, isLoading, error, refetch } = useQuery<ICompanyData, Error>(['company', 'id'], getCompanyData);
  const [logoChange, setLogoChange] = useState(false);
  const [sloganChange, setSloganChange] = useState(false);
  const [putData, setPutData] = useState({
    logoImageUrl: '',
    sloganImageUrl: '',
  });
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [previewSlogan, setPreviewSlogan] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setPutData({
        logoImageUrl: data.logoImageUrl,
        sloganImageUrl: data.sloganImageUrl,
      });
      setPreviewLogo(null);
      setPreviewSlogan(null);
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

    if (window.confirm(MSG.CONFIRM_MSG.SAVE)) {
      try {
        if (logoChange && sloganChange) {
          const logoFile = await urlToFile(putData.logoImageUrl, 'Logo.png');
          const sloganFile = await urlToFile(putData.sloganImageUrl, 'Slogan.png');
          fileAppend(logoFile, 'logoImageUrl');
          fileAppend(sloganFile, 'sloganImageUrl');
          await axios.put(`${PROMOTION_BASIC_PATH}/api/company/logo&slogan`, formData);
        } else if (logoChange) {
          const logoFile = await urlToFile(putData.logoImageUrl, 'Logo.png');
          fileAppend(logoFile, 'logoImageUrl');
          await axios.put(`${PROMOTION_BASIC_PATH}/api/company/logo`, formData);
        } else if (sloganChange) {
          const sloganFile = await urlToFile(putData.sloganImageUrl, 'Slogan.png');
          fileAppend(sloganFile, 'sloganImageUrl');
          await axios.put(`${PROMOTION_BASIC_PATH}/api/company/slogan`, formData);
        }

        alert(MSG.ALERT_MSG.SAVE);
        setEditImage(false);
        setLogoChange(false);
        setSloganChange(false);
        refetch(); // Refetch the data to get the updated image URLs
      } catch (error) {
        console.error('Error updating company:', error);
      }
    }
  };

  const handleLogoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const logoImageUrl = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result as string);
      };
      reader.readAsDataURL(logoImageUrl);
      setPutData((prevData) => ({
        ...prevData,
        logoImageUrl: URL.createObjectURL(logoImageUrl),
      }));
      setLogoChange(true);
    }
  };

  const handleSloganImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const sloganImageUrl = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSlogan(reader.result as string);
      };
      reader.readAsDataURL(sloganImageUrl);
      setPutData((prevData) => ({
        ...prevData,
        sloganImageUrl: URL.createObjectURL(sloganImageUrl),
      }));
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
            <ContentBlock isFocused={true}>
              <InputImgWrapper>
                <Box>
                  {DATAEDIT_TITLES_COMPONENTS.Logo}
                  {DATAEDIT_NOTICE_COMPONENTS.IMAGE.LOGO}
                  {DATAEDIT_NOTICE_COMPONENTS.COLOR.LOGO}

                  <LogoWrapper>
                    <FileButton
                      id='logoFile'
                      description={MSG.BUTTON_MSG.UPLOAD.LOGO}
                      onChange={handleLogoImageChange}
                    />

                    <ImgBox>
                      <img src={previewLogo || `${putData.logoImageUrl}?timestamp=${Date.now()}`} />
                    </ImgBox>
                  </LogoWrapper>
                </Box>
                <Box>
                  {DATAEDIT_TITLES_COMPONENTS.Slogan}
                  {DATAEDIT_NOTICE_COMPONENTS.IMAGE.SLOGAN}
                  {DATAEDIT_NOTICE_COMPONENTS.COLOR.SLOGAN}
                  <LogoWrapper>
                    <FileButton
                      id='sloganFile'
                      description={MSG.BUTTON_MSG.UPLOAD.SLOGAN}
                      onChange={handleSloganImageChange}
                    />

                    <ImgBox>
                      <img src={previewSlogan || `${putData.sloganImageUrl}?timestamp=${Date.now()}`} />
                    </ImgBox>
                  </LogoWrapper>
                </Box>
                <ButtonWrapper>
                  <Button fontSize={14} width={100} description={MSG.BUTTON_MSG.SAVE} onClick={handleSaveClick} />
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
  position: absolute;
  right: 0px;
`;

const InputImgWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: space-between;
`;
