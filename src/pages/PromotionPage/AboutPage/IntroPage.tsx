import styled from 'styled-components';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Circle from '../../../components/PromotionPage/Circle/ArrowCircle';
import MissionLabel from '../../../assets/images/Mission.png';
import { getCompanyData } from '../../../apis/PromotionAdmin/dataEdit';

interface IFontStyleProps {
  color?: string;
}

function IntroPage() {
  const aboutRef = useRef(null);
  const missionRef = useRef(null);

  const aboutInView = useInView(aboutRef);
  const missionInView = useInView(missionRef);

  const [companyIntroData, setCompanyIntroData] = useState('');
  const [sloganImageUrl, setSloganImageUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyData();
        setCompanyIntroData(data.introduction);
        setSloganImageUrl(data.sloganImageUrl);
      } catch (error) {
        console.error('Error fetching company data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <InitContainer>
        <div>
          <InitTitleWrapper>
            <InitTitle>WHAT</InitTitle>
            <InitTitle color='#ffa900'>WE</InitTitle>
            <InitTitle>DO</InitTitle>
          </InitTitleWrapper>
        </div>
        <Circle />
        <BlurryCircle style={{ top: '50%', left: '-5%' }} />
        <BlurryCircle style={{ top: '10%', left: '85%' }} />
      </InitContainer>

      <IntroContainer>
        <AboutWrapper ref={aboutRef}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 100 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <BackgroundText>ABOUT</BackgroundText>
            <AboutText dangerouslySetInnerHTML={{ __html: companyIntroData }} />
          </motion.div>
        </AboutWrapper>
        <MissionWrapper ref={missionRef}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ opacity: missionInView ? 1 : 0, y: missionInView ? 0 : 100 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <BackgroundText> MISSION</BackgroundText>
            {sloganImageUrl !== '' ? (
              <img
                src={sloganImageUrl}
                alt='SloganLabel'
                style={{ width: '50%', height: '130px', objectFit: 'contain' }}
              />
            ) : (
              <img src={MissionLabel} alt='MissionLabel' style={{ width: '50%', objectFit: 'contain' }} />
            )}
          </motion.div>
        </MissionWrapper>
      </IntroContainer>
    </Container>
  );
}

export default IntroPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 210vh;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-bottom: 100px;
`;

const InitContainer = styled.div`
  margin-top: 40px;
  height: 100vh; // 전체 화면 높이
  background-color: black;
  position: relative; // 구형 도형의 위치 지정
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BlurryCircle = styled.div`
  position: absolute;
  background-color: rgba(255, 169, 0, 0.3);
  border-radius: 50%;
  width: 450px;
  height: 450px;
  filter: blur(40px);
`;
const InitTitleWrapper = styled.div`
  display: flex;
  flex-directrion: 'row';
  gap: 20px;
  margin-bottom: 70px;
`;
const InitTitle = styled.div<IFontStyleProps>`
  font-family: 'Pretendard-Bold';
  font-size: 120px;
  color: ${(props) => props.color || '#ffffff'};
`;

const IntroContainer = styled.div`
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
`;
const BackgroundText = styled.div`
  font-family: 'pretendard-bold';
  font-size: 11vw;
  letter-spacing: 10px;
  opacity: 0.2;
  filter: blur(5px);
  color: '#FFFFFF';
  user-select: none;
`;
const AboutWrapper = styled.div`
  text-align: left;
  margin-bottom: 100px;
`;
const RowTextContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const AboutText = styled.div<IFontStyleProps>`
  font-family: 'pretendard-medium';
  font-size: 36px;
  color: ${(props) => props.color || '#ffffff'};
  margin-bottom: 15px;
  padding: 10px;
  max-width: 80%;
  word-wrap: break-word;
`;
const MissionWrapper = styled.div`
  text-align: right;
`;
