import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';

import IntroPage from './IntroPage';
import WhatWeDoPage from './WhatWeDoPage';

interface IFontStyleProps {
  fontSize?: string;
  fontFamily?: string;
}
interface IContainerStyleProps {
  backgroundColor?: string;
}

const chunkArray = (array: any, size: any) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size); // 배열을 size 만큼 나누기
    chunks.push(chunk);
  }
  return chunks; // 배열의 부분들을 배열로 반환
};

const AboutPage = () => {
  const [data, setData] = useState({ id: '', name: '', introduction: '', imageFileName: '', imageUrl: '' });
  const [corpLogo, setCorpLogo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios.get('http://3.36.95.109:8080/api/ceo'), // 첫 번째 요청
          axios.get('http://3.36.95.109:8080/api/partners/logoImgList'), // 두 번째 요청
        ]);

        const ceoInfo = response1.data.data;
        const object = {
          id: ceoInfo.id,
          name: ceoInfo.name,
          introduction: ceoInfo.introduction,
          imageFileName: ceoInfo.imageFileName,
          imageUrl: ceoInfo.imageUrl,
        };
        setData(object);

        console.log(response2);
        setCorpLogo(response2.data.data);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };

    fetchData();
  }, []);

  const dataChunks = chunkArray(corpLogo, 3);

  return (
    <ScrollContainer>
      <IntroPage />
      <WhatWeDoPage />
      <Section>
        <RowCoontainer backgroundColor='#1a1a1a'>
          <CeoInfoContainer>
            <CeoInfo fontFamily='Pretendard-SemiBold' fontSize='70px'>
              CEO&nbsp;{data.name}
            </CeoInfo>
            <CeoInfo dangerouslySetInnerHTML={{ __html: data.introduction }}></CeoInfo>
          </CeoInfoContainer>
          <CeoImageContainer>
            <img src={data.imageUrl} alt='CEO Character' style={{ width: '350px', height: 'auto' }} />
          </CeoImageContainer>
        </RowCoontainer>
      </Section>
      <Section>
        <CorpLogoContainer>
          <CorpText>CORP</CorpText>
          {dataChunks.map((chunk, index) => (
            <CorpLogoRowContainer target='_blank' href={'/'} key={index}>
              {chunk.map((item: any, subIndex: any) => (
                <div key={subIndex}>
                  <img src={item} alt='CORP Logo' style={{ width: '300px', height: 'auto' }} />
                </div>
              ))}
            </CorpLogoRowContainer>
          ))}
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
