import React, { useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getRequestsData } from '@/apis/PromotionAdmin/request';
import { PA_ROUTES } from '@/constants/routerConstants';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import TextEditor from '@/components/PromotionAdmin/Request/TextEditor';
import { IEditorData, IRequestData } from '../../../types/PromotionAdmin/request';
import draftToHtml from 'draftjs-to-html';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import HoverInfo from '@/components/PromotionAdmin/DataEdit/Company/HoverInfo';
import Pagination from '@/components/PromotionAdmin/FAQ/Pagination';

const RequestDetailPage = () => {
  // pagination 구현에 사용되는 변수
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  const navigator = useNavigate();
  const requestDetailMatch = useMatch(`${PA_ROUTES.REQUEST}/:requestId`);

  const { data, isLoading } = useQuery<IRequestData>(['request', 'id'], getRequestsData);

  const clickedRequest =
    requestDetailMatch?.params.requestId &&
    data &&
    data.find((request: { id: number; }) => String(request.id) === requestDetailMatch.params.requestId);

  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });
  const [blocks, setBlocks] = useState<IEditorData[]>([]);
  const [replyState, setReplyState] = useState('WAITING');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [userInfoExpanded, setUserInfoExpanded] = useState(false);

  const toggleUserInfoExpansion = () => {
    setUserInfoExpanded(!userInfoExpanded);
  };

  const toggleEmailExpansion = (id: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const updateTextDescription = async (editorState: any) => {
    await setEditorState(editorState);
    setBlocks(convertToRaw(editorState.getCurrentContent()).blocks);
  };

  const createDefaultContent = (state: string) => {
    switch (state) {
      case 'DISCUSSING':
        return '논의 중입니다.';
      case 'APPROVED':
        return '승인되었습니다.';
      case 'REJECTED':
        return '거절되었습니다.';
      default:
        return '';
    }
  };

  useEffect(() => {
    const contentState = ContentState.createFromText(createDefaultContent(replyState));
    setEditorState(EditorState.createWithContent(contentState));
  }, [replyState]);

  const replyRequest = (state: string) => {
    if (!clickedRequest) {
      return;
    }

    const formData = {
      answer: draftToHtml(convertToRaw(editorState.getCurrentContent())).replace(/<[^>]*>/g, ''),
      state: state,
    };

    if (window.confirm('답변 메일을 보내시겠습니까?')) {
      axios
        .put(`http://3.36.95.109:8080/api/requests/${clickedRequest.id}/comment`, formData)
        .then((response) => {
          alert('메일 발송이 완료되었습니다.');
          setReplyState(replyState);
          const updatedEmailItems = emailItems.map((email: any) => ({
            ...email,
            state: state.toUpperCase()
          }));
          emailItems(updatedEmailItems);
          navigator(`${PA_ROUTES.REQUEST}/:requestId`);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const updatedEditorState = EditorState.createEmpty();
    setEditorState(updatedEditorState);
  };

  const emailItems = clickedRequest && clickedRequest.answers
    ? clickedRequest.answers.map((answer: { id: any; createdAt: any; text: any; state: any; }) => {

      const createdAtDate = new Date(answer.createdAt);
      const formattedDate = `${createdAtDate.getFullYear()}-${String(createdAtDate.getMonth() + 1).padStart(2, '0')
        }-${String(createdAtDate.getDate()).padStart(2, '0')} ${String(createdAtDate.getHours()).padStart(2, '0')
        }:${String(createdAtDate.getMinutes()).padStart(2, '0')}`;

      return {
        id: answer.id,
        subject: answer.text,
        date: formattedDate,
        content: answer.text,
        state: answer.state,
      };
    })
    : [];

  return (
    <PageWrapper>
      {requestDetailMatch && clickedRequest && (
        <>
          <LeftContainer>
            <Box>
              <Wrapper>
                <TitleWrapper>
                  <Title>{clickedRequest.clientName} 님의 {clickedRequest.category} 의뢰</Title>
                </TitleWrapper>
                <UserInfoWrapper>
                  <UserInfoTitle onClick={toggleUserInfoExpansion}>클라이언트 정보</UserInfoTitle>
                  {userInfoExpanded && (
                    <UserInfoTable>
                      <tbody>
                        <UserInfoRow>
                          <UserInfoLabel>이메일</UserInfoLabel>
                          <UserInfoData>{clickedRequest.email}</UserInfoData>
                        </UserInfoRow>
                        <UserInfoRow>
                          <UserInfoLabel>카테고리</UserInfoLabel>
                          <UserInfoData>{clickedRequest.category}</UserInfoData>
                        </UserInfoRow>
                        <UserInfoRow>
                          <UserInfoLabel>조직</UserInfoLabel>
                          <UserInfoData>{clickedRequest.organization}</UserInfoData>
                        </UserInfoRow>
                        <UserInfoRow>
                          <UserInfoLabel>연락처</UserInfoLabel>
                          <UserInfoData>{clickedRequest.contact}</UserInfoData>
                        </UserInfoRow>
                        <UserInfoRow>
                          <UserInfoLabel>직책</UserInfoLabel>
                          <UserInfoData>{clickedRequest.position}</UserInfoData>
                        </UserInfoRow>
                        <UserInfoRow>
                          <UserInfoLabel>첨부파일</UserInfoLabel>
                          <UserInfoData>
                            <ul>
                              {clickedRequest?.fileUrlList.map((url: string, index: number) => {
                                const fileName = url.split('amazonaws.com/')[1];
                                return (
                                  <li key={index}>
                                    - <Link href={url} target='_blank' rel='noopener noreferrer'>
                                      {fileName}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </UserInfoData>
                        </UserInfoRow>
                      </tbody>
                    </UserInfoTable>
                  )}
                </UserInfoWrapper>
                <Answer className='article' dangerouslySetInnerHTML={{ __html: clickedRequest.description }} />
              </Wrapper>
            </Box>
            <Box>
              <Wrapper>
                <HoverInfo title='' description='논의는 승인할지 거절할지 생각해볼게염 승인은 의뢰 승인 거절은 의뢰 거절' />
                <DropDown onChange={(e) => setReplyState(e.target.value)} value={replyState}>
                  <option value="WAITING" selected disabled hidden>대기</option>
                  <option value="DISCUSSING">논의</option>
                  <option value="APPROVED">승인</option>
                  <option value="REJECTED">거절</option>
                </DropDown>
                <TextEditor editorState={editorState} onEditorStateChange={updateTextDescription} />
              </Wrapper>
              <ButtonWrapper>
                <Button
                  onClick={() => {
                    clickedRequest && replyRequest(replyState);
                  }}
                >
                  답변 보내기
                </Button>
              </ButtonWrapper>
            </Box>
          </LeftContainer>
          <RightContainer>
            <Box>
              <EmailList>
                {emailItems.map((email: { id: number; subject: string; date: string; content: string, state: string }) => (
                  <EmailItem key={email.id} >
                    <StateButton state={email.state}>
                      {email.state === 'DISCUSSING' ? '논의중' :
                        (email.state === 'APPROVED' ? '승인' : '거절')}
                    </StateButton>
                    <EmailSubject onClick={() => toggleEmailExpansion(email.id)}>
                      {email.subject.length > 30 ? `${email.subject.slice(0, 30)}...` : email.subject}
                    </EmailSubject>
                    <EmailDate>{email.date}</EmailDate>
                    {expandedItems.has(email.id) && (
                      <EmailContent>
                        {email.content}
                      </EmailContent>
                    )}
                  </EmailItem>
                ))}
              </EmailList>
              <ButtonWrapper>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={data.length}
                  paginate={setCurrentPage}
                />
              </ButtonWrapper>
            </Box>
          </RightContainer>
        </>
      )}
    </PageWrapper>
  );
};

const UserInfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const UserInfoRow = styled.tr`
  /* border-bottom: 1px solid #eaeaea; */
`;

const UserInfoLabel = styled.td`
  font-weight: bold;
  padding: 0.5rem 1rem;
  width: 20%;
`;

const UserInfoData = styled.td`
  padding: 0.5rem 1rem;
`;


const PageWrapper = styled.div`
  display: flex;
  margin-left: 100px;
  width: 80vw;
  font-family: 'pretendard';
`;

const LeftContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const Box = styled.div`
  flex: 1;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const UserInfoWrapper = styled.div`
  padding: 0rem 0 0rem 1rem;
  align-items: center;
  font-size: 0.9rem;
  width: 90%;
  overflow: hidden;
  word-break: break-word;
`;

const UserInfoTitle = styled.div`
  width: fit-content;
  cursor: pointer;
  color: gray;
  font-weight: bold;
  margin-bottom: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const DropDown = styled.select`
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  padding: 0.4rem 1.4rem;
  margin: 1rem 0;

  border-radius: 0.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Link = styled.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Answer = styled.div`
  border-top: 2px solid #eaeaea;
  margin-top: 20px;
  padding: 20px;
  max-height: 70px;
  overflow-y: auto;
  img {
    max-width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;

const Button = styled.div`
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  padding: 0.5rem 1.4rem;
  border-radius: 0.2rem;
  font-size: 0.9rem;
  font-weight: 900;
  display: flex;
  align-items: center;
`;

const EmailList = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailItem = styled.div`
  border-bottom: 1px solid #eaeaea;
  padding: 1rem;
  justify-content: space-between;
  position: relative;
`;

const StateButton = styled.div<{ state: string }>`
  cursor: default;
  border: none;
  padding: 0.2rem 0.6rem;
  border-radius: 0.2rem;
  font-size: 0.9rem;
  font-weight: bold;
  color: ${(props) => getColorByState(props.state)};
  position: absolute;
  right: 10px;
  top: 25px;
  transform: tra
  nslateY(-50%);
`;
const getColorByState = (state: string) => {
  switch (state) {
    case 'DISCUSSING':
      return 'darkorange';
    case 'APPROVED':
      return 'green';
    case 'REJECTED':
      return 'red';
    default:
      return 'black';
  }
};

const EmailSubject = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  padding-right: 1rem;
  cursor: pointer;

  &:hover {
    color: darkorange;
  }
`;

const EmailDate = styled.div`
  font-size: 0.9rem;
  color: gray;
`;

const EmailContent = styled.div`
  /* background-color: #ffffff7a;
  width: fit-content; */
  margin: 1.2rem 0 0 0;
  white-space: pre-wrap;
  line-height: 1.3;
`;

export default RequestDetailPage;