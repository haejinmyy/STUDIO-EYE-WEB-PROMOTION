import React, { useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getRequestsData } from '@/apis/PromotionAdmin/request';
import { PA_ROUTES } from '@/constants/routerConstants';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import TextEditor from '@/components/PromotionAdmin/Request/TextEditor';
import { IEditorData, IRequestData } from '../../../types/PromotionAdmin/request';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';

const RequestDetailPage = () => {
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
  const [replyState, setReplyState] = useState('DISCUSSING');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

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

  const updateTextDescription = async (state: any) => {
    await setEditorState(state);
    setBlocks(convertToRaw(editorState.getCurrentContent()).blocks);
  };

  const replyRequest = (state: string) => {
    if (!clickedRequest) {
      return;
    }
    let answerText = '';
    let requestState = 'WAITING'; // 요청 상태 기본값 설정

    if (state === 'APPROVED' && !editorState.getCurrentContent().hasText()) {
      answerText = clickedRequest.clientName + '님의 의뢰가 완료되었습니다.';
      requestState = 'APPROVED'; // 승인 상태로 변경
    } else {
      answerText = draftToHtml(convertToRaw(editorState.getCurrentContent())).replace(/<[^>]*>/g, '');
    }
    const formData = {
      answer: answerText,
      state: state,
    };
    if (window.confirm('답변 메일을 보내시겠습니까?')) {
      axios
        .put(`http://3.36.95.109:8080/api/requests/${clickedRequest.id}/comment`, formData)
        .then((response) => {
          alert('메일 발송이 완료되었습니다.');
          // 요청 상태 변경
          setReplyState(requestState);
          // 각 이메일 항목의 상태 변경
          const updatedEmailItems = emailItems.map((email: any) => ({
            ...email,
            state: state.toUpperCase() // 이메일 상태를 드롭다운에서 선택한 값으로 변경
          }));
          emailItems(updatedEmailItems); // 상태 업데이트
          navigator(`${PA_ROUTES.REQUEST}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);

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
                  <Title>{clickedRequest.clientName} </Title>
                </TitleWrapper>
                <UserInfo>이메일 : {clickedRequest.email}</UserInfo>
                <UserInfo>카테고리 : {clickedRequest.category}</UserInfo>
                <UserInfo>소속 : {clickedRequest.organization}</UserInfo>
                <UserInfo>연락처 : {clickedRequest.contact}</UserInfo>
                <UserInfo>지위 : {clickedRequest.position}</UserInfo>
                <UserInfo>
                  첨부파일 &nbsp;
                  {clickedRequest?.fileUrlList.map((url: string, index: number) => (
                    <React.Fragment key={index}>
                      <a href={url} target='_blank' rel='noopener noreferrer'>
                        {url}
                      </a>
                      {index !== (clickedRequest?.fileUrlList.length ?? 0) - 1 && ', '}
                    </React.Fragment>
                  ))}
                </UserInfo>
                <Answer className='article' dangerouslySetInnerHTML={{ __html: clickedRequest.description }} />
              </Wrapper>
            </Box>
            <Box>
              <Wrapper>
                <DropDown onChange={(e) => setReplyState(e.target.value)} value={replyState}>
                  <option value="DISCUSSING">논의</option>
                  <option value="APPROVED">승인</option>
                  <option value="REJECTED">거절</option>
                </DropDown>
                <TitleWrapper>
                  <Title>{clickedRequest.clientName} </Title>
                </TitleWrapper>
                <TextEditor editorState={editorState} onEditorStateChange={updateTextDescription} />
              </Wrapper>
              <ButtonWrapper>
                <Button
                  onClick={() => {
                    clickedRequest && replyRequest('WAITING');
                  }}
                >
                  답변 보내기
                </Button>
                {/* <Button
                  onClick={() => {
                    clickedRequest && replyRequest('APPROVED');
                  }}
                >
                  의뢰 완료하기
                </Button> */}
              </ButtonWrapper>
            </Box>
          </LeftContainer>
          <RightContainer>
            <EmailList>
              {emailItems.map((email: { id: number; subject: string; date: string; content: string, state: string }) => (
                <EmailItem key={email.id} onClick={() => toggleEmailExpansion(email.id)}>
                  <StateButton className={email.state.toLowerCase()}>{email.state}</StateButton>
                  <EmailSubject>{email.subject}</EmailSubject>
                  <EmailDate>{email.date}</EmailDate>
                  {expandedItems.has(email.id) && (
                    <EmailContent>
                      {email.content}
                    </EmailContent>
                  )}
                </EmailItem>
              ))}
            </EmailList>

          </RightContainer>
        </>
      )}
    </PageWrapper>
  );
};

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

const DropDown = styled.select`
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  padding: 0.4rem 1.4rem;
  border-radius: 0.2rem;
  font-size: 13px;
  font-weight: 900;
  display: flex;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #f1f1f1;
  align-items: center;
  margin-left: 10px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  font-size: 1.5rem;
  font-weight: 600;
`;


const UserInfo = styled.div`
  padding-top: 1rem;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const Answer = styled.div`
  border-top: 2px solid #eaeaea;
  border-bottom: 2px solid #eaeaea;
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
  padding: 1rem;
  justify-content: space-between;
`;

const Button = styled.div`
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  padding: 0.4rem 1.4rem;
  border-radius: 0.2rem;
  font-size: 13px;
  font-weight: 900;
  display: flex;
  align-items: center;
`;

const EmailList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const EmailItem = styled.div`
  border-bottom: 1px solid #eaeaea;
  padding: 10px 10px 20px 10px;
  cursor: pointer;
  justify-content: space-between;
  position: relative;
`;


const StateButton = styled.div`
  cursor: default;
  border: none;
  padding: 0.2rem 0.6rem;
  border-radius: 0.2rem;
  font-size: 12px;
  font-weight: bold;
  color: darkorange;
  position: absolute;
  right: 10px;
  top: 25px;
  transform: translateY(-50%);

  &.rejected {
    color: red;
  }

  &.approved {
    color: green;
  }

  &.discussing {
    color: blue;
  }
`;

const EmailSubject = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  padding-right: 30px;
`;

const EmailDate = styled.div`
  font-size: 0.9rem;
  color: gray;
`;

const EmailContent = styled.div`
  margin: 20px 0 20px 0;
  white-space: pre-wrap;
`;

export default RequestDetailPage;
