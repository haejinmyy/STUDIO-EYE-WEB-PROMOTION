import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCEOData, getPartnersData } from '../../../apis/PromotionAdmin/dataEdit';

import IntroPage from './IntroPage';
import WhatWeDoPage from './WhatWeDoPage';

interface IFontStyleProps {
  fontSize?: string;
  fontFamily?: string;
}
interface IContainerStyleProps {
  backgroundColor?: string;
}
interface ICEOInfoData {
  id: number;
  name: string;
  introduction: string;
  imageFileName: string;
  imageUrl: string;
}
interface ICorpInfoData {
  partnerInfo: {
    id: number;
    is_main: boolean;
    link: string;
  };
  logoImg: string;
}

const AboutPage = () => {
  const [CEOData, setCEOData] = useState<ICEOInfoData>({
    id: 0,
    name: '',
    introduction: '',
    imageFileName: '',
    imageUrl: '',
  });
  const [corpInfoData, setCorpInfoData] = useState<ICorpInfoData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [CEODataResponse, corpDataResponse] = await Promise.all([getCEOData(), getPartnersData()]);
        const ceoInfo = CEODataResponse;
        const object1 = {
          id: ceoInfo.id,
          name: ceoInfo.name,
          introduction: ceoInfo.introduction,
          imageFileName: ceoInfo.imageFileName,
          imageUrl: ceoInfo.imageUrl,
        };
        setCEOData(object1);

        const objects2 = corpDataResponse.map((item: any) => ({
          partnerInfo: item.partnerInfo,
          logoImg: item.logoImg,
        }));
        setCorpInfoData(objects2);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollContainer>
      <IntroPage />
      <WhatWeDoPage />
      <Section>
        <RowCoontainer backgroundColor='#1a1a1a'>
          <CeoInfoContainer>
            <CeoInfo fontFamily='Pretendard-SemiBold' fontSize='70px'>
              CEO&nbsp;{CEOData.name}
            </CeoInfo>
            <CeoInfo dangerouslySetInnerHTML={{ __html: CEOData.introduction }}></CeoInfo>
          </CeoInfoContainer>
          <CeoImageContainer>
            <img src={CEOData.imageUrl} alt='CEO Character' style={{ width: '350px', height: 'auto' }} />
          </CeoImageContainer>
        </RowCoontainer>
      </Section>
      <Section>
        <CorpLogoContainer>
          <CorpText>CORP</CorpText>
          <CorpLogoRowContainer>
            {corpInfoData
              .filter((item: any) => item.partnerInfo.is_main === true)
              .map((info) => (
                <img
                  key={info.partnerInfo.id}
                  src={info.logoImg}
                  alt='CORP Logo'
                  style={{ width: '300px', height: '150px', cursor: 'pointer' }}
                  onClick={() => window.open(info.partnerInfo.link, '_blank')}
                />
              ))}
          </CorpLogoRowContainer>
        </CorpLogoContainer>
      </Section>
    </ScrollContainer>
  );
};

export default AboutPage;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Section = styled.div`
  width: 100%;
  display: flex;
  margin-top: 150px;
  margin-bottom: 50px;
  overflow-x: hidden;
`;
const RowCoontainer = styled.div<IContainerStyleProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor || 'black'};
  padding-top: 80px;
  padding-bottom: 80px;
`;

const CeoInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  justify-content: center;
`;
const CeoImageContainer = styled.div`
  padding-left: 70px;
`;
const CeoInfo = styled.div<IFontStyleProps>`
  white-space: pre-line;
  margin-bottom: 30px;
  font-family: ${(props) => props.fontFamily || 'Pretendard-regular'};
  font-size: ${(props) => props.fontSize || '24px'};
  color: #ffffff;
`;

const CorpLogoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CorpLogoRowContainer = styled.a`
  margin-bottom: 80px;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 50px;
  flex-wrap: wrap;
`;
const CorpText = styled.div`
  margin-bottom: 30px;
  font-family: 'pretendard-regular';
  font-size: 120px;
  letter-spacing: 5px;
  opacity: 0.2;
  filter: blur(3px);
  color: '#FFFFFF';
`;
