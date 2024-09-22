import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface NewsCardProps {
  id: number;
  title: string;
  source: string;
  mainImg?: string;
  category: string;
  content: string;
  onClick?: () => void;
}

const NewsBoardPage: React.FC = () => {

  const navigator = useNavigate();

  const handleCardClick = (news: NewsCardProps) => {
    navigator(`/news/${news.id}`, { state: { news } });
  };

  const dummyData: NewsCardProps[] = [
    {
      id: 1,
      title: '에디터 추천',
      source: '트렌드',
      mainImg: 'https://via.placeholder.com/150',
      category: '가구',
      content: '20세기 동안 몽유의 시대가 도래하면서 가정용 가구에 대한 사람들의 관점도 점차 달라졌다. 20세기 동안 몽유의 시대가 도래하면서 가정용 가구에 대한 사람들의 관점도 점차 달라졌다.20세기 동안 몽유의 시대가 도래하면서 가정용 가구에 대한 사람들의 관점도 점차 달라졌다. 20세기 동안 몽유의 시대가 도래하면서 가정용 가구에 대한 사람들의 관점도 점차 달라졌다.20세기 동안 몽유의 시대가 도래하면서 가정용 가구에 대한 사람들의 관점도 점차 달라졌다.',
    },
    {
      id: 2,
      title: '편집디자인 트렌드 리포트',
      source: '편집 매거진',
      category: '디자인',
      content: '누가 뭐래도 지금은 철저히 모바일 시대이지만, 인쇄물이라는 매체는 여전히 산업과 예술, 그리고 일상의 많은 부분을 차지하고 있다.',
    },
    {
      id: 3,
      title: 'Amazing Ideas on Graffiti Art',
      source: '편집 매거진',
      mainImg: 'https://via.placeholder.com/150',
      category: '예술',
      content: '누군가에겐 눈살을 찌푸리게 하는 낙서일 수도 있지만, 그래피티는 정차 \'거리의 예술\'로서 나름의 영역을 구축해가고 있다.',
    },
    {
      id: 4,
      title: '5 Things You Need to Know about...',
      source: '편집 매거진',
      category: '문화',
      content: '브로그에서 리플처럼 메시지를 명확하게 전달하는 것이 무엇보다 중요하다.',
    },
  ];

  return (
    <Container>
      <Content>
        <Title>최근 소식 어쩌구</Title>
        <CardContainer>
          {dummyData.map((news) => (
            <NewsCard key={news.id} onClick={() => handleCardClick(news)} {...news} />
          ))}
        </CardContainer>
      </Content>
    </Container>
  );
};

const NewsCard: React.FC<NewsCardProps> = ({ title, source, mainImg, content, onClick }) => {
  return (
    <Card onClick={onClick}>
      <TextContent>
        <TitleWrapper>{title}</TitleWrapper>
        <Client>{source}</Client>
        <ContentPreview>{content.slice(0, 100)}...</ContentPreview>
      </TextContent>
      {mainImg ? (
        <ImageWrapper>
          <img src={mainImg} alt={title} />
        </ImageWrapper>
      ) : (
        <TextImage>{content.slice(0, 40)}...</TextImage>
      )}
    </Card>
  );
};

const Container = styled.div`
  font-family: 'Pretendard';
  min-height: 100vh;
  background-color: black;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding-top: 5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 700;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;

const TextContent = styled.div`
  flex: 1;
  padding-right: 20px;
`;

const TitleWrapper = styled.h2`
  font-size: 1.5rem;
  font-family: 'Pretendard-bold';
  color: black;
  margin-bottom: 10px;
`;

const Client = styled.p`
  font-size: 14px;
  font-family: 'Pretendard';
  font-weight: 600;
  color: #777;
  margin-bottom: 10px;
`;

const ContentPreview = styled.p`
  font-size: 16px;
  font-family: 'Pretendard';
  font-weight: 500;
  color: #555;
`;

// 이미지가 있을 때
const ImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

// 메인이미지가 없을 때 텍스트로 대체
const TextImage = styled.div`
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  background-color: #e0e0e0;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Pretendard';
  font-weight: 500;
  line-height: 1.2;
`;

export default NewsBoardPage;
