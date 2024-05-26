import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

interface FaqData {
  id: number;
  question: string;
  answer: string;
  visibility: boolean;
}

const FaqPage = () => {
  const [data, setData] = useState([]);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [searchData, setSearchData] = useState<FaqData[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [searchToggleStates, setSearchToggleStates] = useState(Array(searchData.length).fill(false));

  useEffect(() => {
    axios
      .get(`http://3.36.95.109:8080/api/faq`)
      .then((response) => {
        const filteredData = response.data.data.filter((item: any) => item.visibility === true);
        const objects = filteredData.map((item: any) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
          visibility: item.visibility,
        }));
        setData(objects);
        initiate(objects);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const initiate = (data: any) => {
    const initData: any = [];
    if (data.length === 0) {
      setSearchData([]);
      setSearchResult('none');
      return;
    }
    for (let i = 0; i < data.length; i++) {
      initData.push({
        index: i,
        question: data[i].question,
        answer: data[i].answer,
        visibility: data[i].visibility,
      });
    }
    setSearchData(initData);
    setSearchResult('success');
  };

  const handleTextAreaDataChange = (e: any) => {
    refreshToggleItem();
    setFaqQuestion(e.target.value);
    searchQuestion(e.target.value, data);
  };

  const searchQuestion = (searchTerm: string, data: any) => {
    const searchTermLower = searchTerm.toLowerCase();
    const searchResults: any = [];
    if (data.length === 0) {
      setSearchData([]);
      setSearchResult('none');
      return;
    }
    for (let i = 0; i < data.length; i++) {
      const questionLower = data[i].question.toLowerCase();
      if (questionLower.includes(searchTermLower)) {
        searchResults.push({
          index: i,
          question: data[i].question,
          answer: data[i].answer,
          visibility: data[i].visibility,
        });
      }
    }
    setSearchData(searchResults.length > 0 ? searchResults : []);
    setSearchResult(searchResults.length > 0 ? 'success' : 'fail');
  };

  const searchToggleItem = (index: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const refreshToggleItem = () => {
    const newSearchToggleStates = searchToggleStates.map(() => false);
    setSearchToggleStates(newSearchToggleStates);
  };

  return (
    <Container>
      <GradientOverlayTopLeft />
      <GradientOverlayBottomRight />
      <Header>
        <Title>
          <AnimatedSpan delay={0.1}>F</AnimatedSpan>requently
          <AnimatedSpan delay={0.3}> A</AnimatedSpan>sked
          <AnimatedSpan delay={0.5}> Q</AnimatedSpan>uestions
        </Title>
        <SubContent>이곳에 자주 묻는 질문들에 대한 답변을 모아 놓았습니다.</SubContent>
      </Header>
      <Content>
        <InputWrapper>
          {faqQuestion.length === 0 ? (
            <SearchFaqQuestion
              placeholder='컨텐츠 문의, 회사 위치 등의 검색어를 입력해 주세요.'
              autoComplete='off'
              name='searchingfaqquestion'
              value={faqQuestion}
              onChange={handleTextAreaDataChange}
            />
          ) : (
            <>
              <SearchFaqQuestion autoComplete='off' name='searchingfaqquestion' onChange={handleTextAreaDataChange} />
            </>
          )}
        </InputWrapper>
        {searchResult === 'fail' ? (
          <NoResults>검색 결과가 없습니다.</NoResults>
        ) : (
          searchData.map((item: any, i: number) => (
            <FaqDetailButton
              key={i}
              initial={{ height: 30, opacity: 0.5, scale: 0.9 }}
              animate={
                expandedItems.has(i)
                  ? { height: 'auto', opacity: 1, scale: 1 }
                  : { height: 30, opacity: 0.5, scale: 0.9 }
              }
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              onClick={() => searchToggleItem(i)}
            >
              <FaqBrief>
                <FaqBriefQuestion>
                  {item.question.length >= 100 ? item.question.substring(0, 70) + '...' : item.question}
                </FaqBriefQuestion>
              </FaqBrief>
              {expandedItems.has(i) && (
                <FaqDetailBox>
                  <FaqDetailAnswer dangerouslySetInnerHTML={{ __html: item.answer }} />
                </FaqDetailBox>
              )}
            </FaqDetailButton>
          ))
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  font-family: 'Pretendard';
  min-height: 100vh;
  overflow-y: auto;
  max-height: 'fit-content';
  scroll-snap-type: y mandatory;
  background-color: black;
  color: white;
`;

const GradientOverlayTopLeft = styled.div`
  position: absolute;
  top: 0%;
  left: 00%;
  width: 50%;
  height: 50%;
  background-image: radial-gradient(circle at top left, rgba(255, 169, 0, 0.3), transparent);
  filter: blur(50px);
  z-index: 0;
`;

const GradientOverlayBottomRight = styled.div`
  position: absolute;
  bottom: 0%;
  right: 0%;
  width: 80%;
  height: 80%;
  background-image: radial-gradient(circle at bottom right, rgba(255, 169, 0, 0.3), transparent);
  filter: blur(50px);
  z-index: 0;
`;

const Header = styled.div`
  position: relative;
  text-align: center;
  margin-top: 8rem;
`;

const slideIn = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 600;
  color: white;
`;

interface AnimatedSpanProps {
  delay?: number;
}

const AnimatedSpan = styled.span<AnimatedSpanProps>`
  color: #ffa900;
  animation: ${slideIn} 1.2s ease-out;
  animation-delay: ${(props) => props.delay || 0}s;
`;

const SubContent = styled.p`
  font-size: 1.2rem;

  margin-top: 2rem;
  color: white;
`;

const Content = styled.div`
  padding-top: 5rem;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const InputWrapper = styled.div`
  padding: 10px 30px;
  border: 2px solid gray;
  background-color: transparent;
  width: 80%;
  text-align: center;
  margin-bottom: 2rem;
`;

const SearchFaqQuestion = styled.input`
  all: unset;
  height: 30px;
  width: 100%;
  font-size: 18px;
  color: white;
  text-align: center;
`;

const FaqDetailButton = styled(motion.div)`
  border-top: 2px solid gray;
  border-bottom: 2px solid gray;

  margin-bottom: 1rem;
  padding: 30px;
  width: 80%;
  overflow: hidden;
  cursor: pointer;
`;

const FaqBrief = styled.div`
  display: flex;
  justify-content: left;
`;

const FaqBriefQuestion = styled.h2`
  font-weight: 800;
  font-size: 2rem;
  color: #ffa900;

  transition: all 0.3s ease;
  &:hover {
    color: white;
  }
`;

const FaqDetailBox = styled.div`
  padding: 40px 40px 0 40px;
`;

const FaqDetailAnswer = styled.p`
  font-size: 1.4rem;
  line-height: 30px;
  font-weight: 400;
  text-align: justify;
  color: white;
`;

const NoResults = styled.div`
  font-size: 1rem;
  color: gray;
  text-align: center;
  margin-top: 2rem;
`;

export default FaqPage;
