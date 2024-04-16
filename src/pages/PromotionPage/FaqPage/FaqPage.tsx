import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Body from '../../../comp/Common/Body';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const FaqPage = (e: any) => {
  const [data, setData] = useState([]);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [searchToggleStates, setSearchToggleStates] = useState(Array(searchData.length).fill(false));
  // const [showAllFaq, setShowAllFaq] = useState(false);
  const [toggleStates, setToggleStates] = useState(Array(data.length).fill(false));
  // const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://3.35.54.100:8080/api/faq`)
      .then((response) => {
        const data = response.data;
        console.log('faq Data : ', data);
        const objects: any = [];

        for (let i = data.data.length - 1; i >= 0; i--) {
          const obj = {
            id: data.data[i].id,
            question: data.data[i].question,
            answer: data.data[i].answer,
          };
          objects.push(obj);
        }
        setData(objects);
        console.log('dataLength : ', data.data.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleTextAreaDataChange = (e: any) => {
    setFaqQuestion(e.target.value);
  };
  const searchQuestion = (searchTerm: string, data: any) => {
    const searchTermLower = searchTerm.toLowerCase();
    const searchResults: any = [];
    if (data.length === 0) {
      setSearchData([]);
      setSearchResult('fail');
      console.log('searchData : ', searchData);
      return;
    }
    for (let i = 0; i < data.length; i++) {
      const questionLower = data[i].question.toLowerCase();
      if (questionLower.includes(searchTermLower)) {
        searchResults.push({
          index: i,
          question: data[i].question,
          answer: data[i].answer,
        });
      }
    }
    console.log('searchResult : ', searchResults);
    console.log('searchResultLength : ', searchResults.length);
    setSearchData(searchResults.length > 0 ? searchResults : []);
    setSearchResult(searchResults.length > 0 ? 'success' : 'fail');
  };
  // const goToDetail = (id: number) => {
  //   navigate(`/faq/detail/${id}`);
  // };
  // const handleShowAllFaq = () => {
  //   setShowAllFaq(!showAllFaq);
  // };
  const searchToggleItem = (index: number) => {
    console.log(searchToggleStates);
    const newSearchToggleStates = [...searchToggleStates];
    newSearchToggleStates[index] = !newSearchToggleStates[index];
    setSearchToggleStates(newSearchToggleStates);
  };

  const toggleItem = (index: number) => {
    const newToggleStates = [...toggleStates]; // 상태 배열 복사
    newToggleStates[index] = !newToggleStates[index];
    setToggleStates(newToggleStates);
  };

  return (
    <Body>
      <Wrapper>
        <Title>FAQ</Title>
        <SubContent>이곳에 자주 묻는 질문들에 대한 답변을 모아 놓았어요.</SubContent>
        <InputWrapper>
          <Label>자주 묻는 질문 검색</Label>
          <SearchWrapper>
            {faqQuestion === '' ? (
              <SearchFaqQuestion
                placeholder='검색 예시: 컨텐츠 문의, 회사 위치 등'
                autoComplete='off'
                name='searchingfaqquestion'
                value={faqQuestion}
                onChange={handleTextAreaDataChange}
              />
            ) : (
              <>
                <SearchFaqQuestion
                  autoComplete='off'
                  name='searchingfaqquestion'
                  onChange={handleTextAreaDataChange}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      searchQuestion(faqQuestion, data);
                    }
                  }}
                />
                <SearchButton
                  whileHover={{ scale: 1.04 }}
                  transition={{ ease: 'easeInOut', stiffness: 200, damping: 5 }}
                  onClick={() => searchQuestion(faqQuestion, data)}
                >
                  <FaSearch size={24} />
                </SearchButton>
              </>
            )}
          </SearchWrapper>
          {searchResult === 'success' ? (
            <SearchResultBox>
              {searchData.map((item: any) => (
                <FaqDetailButton
                  key={item.index}
                  whileHover={{ scale: 1.02 }}
                  transition={{ ease: 'easeInOut', stiffness: 200, damping: 5 }}
                  onClick={() => searchToggleItem(item.index)}
                >
                  <FaqBrief>
                    <FaqBriefIndex>Q{item.index + 1}</FaqBriefIndex>
                    <FaqBriefQuestion>
                      {item.question.length >= 100 ? item.question.substring(0, 70) + '...' : item.question}
                    </FaqBriefQuestion>
                  </FaqBrief>
                  {searchToggleStates[item.index] && (
                    <FaqDetailBox>
                      <FaqDetailQuestion>Q. {item.question}</FaqDetailQuestion>
                      <FaqDetailAnswer>A. {item.answer.replace(/<[^>]*>/g, '')}</FaqDetailAnswer>
                    </FaqDetailBox>
                  )}
                </FaqDetailButton>
              ))}
            </SearchResultBox>
          ) : searchResult === 'fail' ? (
            <SearchFailed>검색 조건에 맞는 결과를 찾지 못했습니다.</SearchFailed>
          ) : (
            <></>
          )}
        </InputWrapper>
        <InputWrapper>
          <FaqList>
            {data.map((item: any, index: number) => (
              <FaqDetailButton
                key={item.id}
                whileHover={{ scale: 1.02 }}
                transition={{ ease: 'easeInOut', stiffness: 200, damping: 5 }}
                onClick={() => toggleItem(index)}
              >
                <FaqBrief>
                  <FaqBriefIndex>Q{index + 1}</FaqBriefIndex>
                  <FaqBriefQuestion>
                    {item.question.length >= 100 ? item.question.substring(0, 70) + '...' : item.question}
                  </FaqBriefQuestion>
                </FaqBrief>
                {toggleStates[index] && (
                  <FaqDetailBox>
                    <FaqDetailQuestion>Q. {item.question}</FaqDetailQuestion>
                    <FaqDetailAnswer>A. {item.answer.replace(/<[^>]*>/g, '')}</FaqDetailAnswer>
                  </FaqDetailBox>
                )}
              </FaqDetailButton>
            ))}
            {/* {data.slice(0, showAllFaq === false ? 4 : undefined).map((item: any) => (
              <FaqDetailButton
                key={item.id}
                whileHover={{ scale: 1.04 }}
                transition={{ ease: 'easeInOut', stiffness: 200, damping: 5 }}
                onClick={() => goToDetail(item.id)}
              >
                <FaqDetailQuestion>{item.question}</FaqDetailQuestion>
                <FaqDetailAnswer>
                  {item.answer.length >= 100
                    ? item.answer.replace(/<[^>]*>/g, '').substring(0, 70) + '...'
                    : item.answer.replace(/<[^>]*>/g, '')}
                </FaqDetailAnswer>
              </FaqDetailButton>
            ))} */}
          </FaqList>
        </InputWrapper>
        {/* <ShowAllFaqButton
          whileHover={{ scale: 1.04 }}
          transition={{ ease: 'easeInOut', stiffness: 200, damping: 5 }}
          onClick={handleShowAllFaq}
        >
          <SubTitle>모두 보기</SubTitle>
        </ShowAllFaqButton> */}
      </Wrapper>
    </Body>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.div`
  font-size: 54px;
  font-weight: 750;
  color: #ff530e;
  letter-spacing: 2px;
  margin-top: 100px;
  margin-bottom: 50px;
  text-align: center;
`;
// const SubTitle = styled.div`
//   font-size: 25px;
//   font-weight: bold;
//   color: #ffa900;
//   margin-bottom: 7px;
// `;
const SubContent = styled.div`
  font-size: 23px;
  font-weight: bold;
  color: black;
  white-space: pre-line;
  text-align: center;
  margin-bottom: 20px;
`;
const InputWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  width: 80%;
  flex-direction: column;
`;
const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 50px;
  border: 1px solid black;
  border-radius: 30px;
  background-color: #eaeaea;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 30px;
`;
const SearchResultBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: transparent;
  padding-top: 0px;
  padding: 30px;
  flex-direction: column;
  align-items: center;
  border-bottom: 2px solid black;
`;
const SearchFailed = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: #ff0000;
`;
const FaqList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 100px;
`;
// const FaqDetailQuestion = styled.div`
//   font-size: 20px;
//   font-weight: 700;
//   color: #000000;
//   margin-bottom: 10px;
// `;
// const FaqDetailAnswer = styled.div`
//   font-size: 16px;
//   font-weight: 500;
//   color: #000000;
// `;
const FaqBrief = styled.div`
  display: flex;
  flex-direction: row;
`;
const FaqBriefIndex = styled.div`
  width: 10%;
  height: 50px;
  align-content: center;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  background-color: #d5d5d5;
  border-radius: 10px 0 0 10px;
`;
const FaqBriefQuestion = styled.div`
  width: 90%;
  height: 50px;
  align-content: center;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  background-color: #eaeaea;
  border-radius: 0 10px 10px 0;
`;
const FaqDetailBox = styled.div`
  display: flex;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: transparent;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
`;
const FaqDetailQuestion = styled.div`
  font-size: 45px;
  font-weight: 700;
  color: #000000;
  letter-spacing: 2px;
  margin-bottom: 60px;
`;
const FaqDetailAnswer = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #303030;
  white-space: pre-line;
  text-align: justify;
`;
const Label = styled.label`
  margin-bottom: 20px;
  padding-left: 15px;
  font-weight: bold;
  font-size: 18px;
  color: black;
`;
const SearchFaqQuestion = styled.input`
  all: unset;
  outline: none;
  align-content: center;
  height: 50px;
  width: 100%;
  font-size: 20px;
  line-height: 30px;
  font-weight: bold;
  overflow-wrap: break-word;
`;
const SearchButton = styled(motion.button)`
  background-color: transparent;
  border: none;
  color: #ffa900;
  cursor: pointer;
  &:hover {
    color: #ffffff;
  }
`;
// const FaqDetailButton = styled(motion.button)`
//   width: 270px;
//   height: 270px;
//   margin: 10px;
//   margin-bottom: 0px;
//   margin-top: 5px;
//   background-color: #d5d5d5;
//   border: none;
//   cursor: pointer;
//   &:hover {
//     background-color: #eaeaea;
//   }
//   padding: 10px;
//   text-align: justify;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;
const FaqDetailButton = styled(motion.button)`
  width: 100%;
  margin-bottom: 10px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
`;
// const ShowAllFaqButton = styled(motion.button)`
//   width: 400px;
//   height: 40px;
//   margin: 5px;
//   background-color: #eaeaea;
//   border: none;
//   border-radius: 20px;
//   cursor: pointer;
//   &:hover {
//     background-color: #f6f6f6;
//   }
//   margin-bottom: 50px;
//   margin-top: 30px;
//   font-size: 20px;
// `;

export default FaqPage;
