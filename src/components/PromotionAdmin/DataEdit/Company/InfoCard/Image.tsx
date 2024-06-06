import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { Wrapper, ContentBlock, ImgBox, LogoWrapper, Box } from '../CompanyFormStyleComponents';
import { DATAEDIT_TITLES_COMPONENTS } from '../StyleComponents';
import Button from '../../StyleComponents/Button';
import styled from 'styled-components';
import { MSG } from '@/constants/messages';

interface IImageProps {
  setEditImage: (editMode: boolean) => void;
}

const Image = ({ setEditImage }: IImageProps) => {
  const { data, isLoading, error } = useQuery<ICompanyData, Error>(['company', 'id'], getCompanyData);
  const [putData, setPutData] = useState({
    logoImageUrl: '',
    sloganImageUrl: '',
  });

  useEffect(() => {
    if (data) {
      setPutData({
        logoImageUrl: data.logoImageUrl,
        sloganImageUrl: data.sloganImageUrl,
      });
    }
  }, [data]);

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

                  <LogoWrapper>
                    <ImgBox>
                      <img src={`${putData.logoImageUrl}?timestamp=${Date.now()}`} />
                    </ImgBox>
                  </LogoWrapper>
                </Box>
                <Box>
                  {DATAEDIT_TITLES_COMPONENTS.Slogan}

                  <LogoWrapper>
                    <ImgBox>
                      <img src={`${putData.sloganImageUrl}?timestamp=${Date.now()}`} />
                    </ImgBox>
                  </LogoWrapper>
                </Box>
                <ButtonWrapper>
                  <Button
                    fontSize={14}
                    width={100}
                    description={MSG.BUTTON_MSG.MODIFY}
                    onClick={() => setEditImage(true)}
                  />
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
