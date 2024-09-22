import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

interface NewsCardProps {
  id: number;
  title: string;
  source: string;
  mainImg?: string;
  category: string;
  content: string;
}

const NewsDetailPage: React.FC = () => {
  const location = useLocation();
  const newsItem = location.state?.news as NewsCardProps;

  return (
    <PageContainer>
      <Header>
        <Overlay>
          <Title>{newsItem.title}</Title>
          <Source>{newsItem.source}</Source>
        </Overlay>
      </Header>
      <Content>
        {newsItem.mainImg && (
          <ImageWrapper>
            <img src={newsItem.mainImg} alt={newsItem.title} />
          </ImageWrapper>
        )}
        <Description>{newsItem.content}</Description>
      </Content>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  font-family: 'Pretendard';
  min-height: 100vh;
  padding-bottom: 10vh;
  margin-bottom: -19.5vh;
  background-color: white;
  color: black;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  background-image: url('/path-to-your-image.png');
  background-size: cover;
  background-position: center;
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto; /* 수직 방향으로 여백을 주고, 수평 방향으로 가운데 정렬 */
  display: flex; /* flexbox 사용 */
  justify-content: center; /* 내부 요소를 수평 중앙 정렬 */
  img {
    max-width: 100%; /* 이미지의 최대 너비를 컨테이너의 너비에 맞춤 */
    height: auto; /* 이미지 비율 유지 */
    border-radius: 10px;
  }
`;


const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Source = styled.p`
  font-size: 1.2rem;
`;

const Content = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 40px auto;
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: black;
`;

export default NewsDetailPage;
