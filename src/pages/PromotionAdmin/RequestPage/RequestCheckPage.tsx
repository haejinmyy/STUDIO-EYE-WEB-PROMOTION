import React, { useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { Request } from '@/types/request';
import { IGetRequestData, getRequestsData } from '@/apis/PromotionAdmin/request';
import { ContentBox } from '@/components/PromotionAdmin/Request/Components';
import { PA_ROUTES } from '@/constants/routerConstants';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import TextEditor from '@/components/PromotionAdmin/Request/TextEditor';
import { IEditorData } from '../../../types/PromotionAdmin/request';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState } from 'draft-js';

const RequestDetailPage = () => {
  const navigator = useNavigate();
  const requestDetailMatch = useMatch(`${PA_ROUTES.REQUEST}/:requestId`);

  const { data, isLoading } = useQuery<IGetRequestData>(['request', 'id'], getRequestsData);

  const clickedRequest =
    requestDetailMatch?.params.requestId &&
    data?.data.find((request) => String(request.id) === requestDetailMatch.params.requestId);

  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });
  const [blocks, setBlocks] = useState<IEditorData[]>([]);

  const updateTextDescription = async (state: any) => {
    await setEditorState(state);
    setBlocks(convertToRaw(editorState.getCurrentContent()).blocks);
  };

  const replyRequest = (state: number) => {
    if (!clickedRequest) {
      return;
    }
    let answerText = '';
    // if (state === 1 && !editorState.getCurrentContent().hasText()) {
    //   answerText = clickedRequest.clientName + '님의 의뢰가 승인되었습니다.';
    // }
    // else if (state === 2 && !editorState.getCurrentContent().hasText()) {
    //   answerText =
    //     clickedRequest.clientName +
    //     '님의 의뢰를 거절하게 되어 죄송합니다. 더 발전된 Studio-EYE가 되어 더욱 많은 의뢰를 진행할 수 있도록 노력하겠습니다.';
    // }
    if (state === 3 && !editorState.getCurrentContent().hasText()) {
      answerText = clickedRequest.clientName + '님의 의뢰가 완료되었습니다.';
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
          navigator(`${PA_ROUTES.REQUEST}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // const { id } = useParams<{ id: string }>();
  // const [request, setRequest] = useState<Request | null>(null);

  // useEffect(() => {
  //   console.log(id);
  //   const fetchData = async () => {
  //     try {
  //       const requestData = await fetchRequests({ requestId: Number(id) }); // 요청 데이터 가져오기
  //       setRequest(requestData);
  //       console.log('request : ', request);
  //     } catch (error) {
  //       console.error('Error fetching request:', error);
  //     }
  //   };

  //   fetchData();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id]);

  return (
    // <>
    //   {isLoading ? (
    //     <div> is Loading... </div>
    //   ) : (
    <>
      {requestDetailMatch ? (
        <>
          {clickedRequest && (
            <ContentBox>
              <Wrapper>
                <TitleWrapper>
                  <FromToIcon>From</FromToIcon>
                  <Title>{clickedRequest.clientName} </Title>
                </TitleWrapper>
                <UserInfo>이메일 : {clickedRequest.email}</UserInfo>
                <UserInfo>카테고리 : {clickedRequest.category}</UserInfo>
                <UserInfo>소속 : {clickedRequest.organization}</UserInfo>
                <UserInfo>연락처 : {clickedRequest.contact}</UserInfo>
                <UserInfo>지위 : {clickedRequest.position}</UserInfo>
                <UserInfo>
                  첨부파일 :&nbsp;
                  {clickedRequest.fileUrlList.map((url, index) => (
                    <React.Fragment key={index}>
                      <a href={url} target='_blank' rel='noopener noreferrer'>
                        {url}
                      </a>
                      {index !== clickedRequest.fileUrlList.length - 1 && ', '}
                    </React.Fragment>
                  ))}
                </UserInfo>
                <Answer className='article' dangerouslySetInnerHTML={{ __html: clickedRequest.description }} />
              </Wrapper>
              <Wrapper>
                <TitleWrapper>
                  <FromToIcon>To</FromToIcon>
                  <Title>{clickedRequest.clientName} </Title>
                </TitleWrapper>
                <TextEditor editorState={editorState} onEditorStateChange={updateTextDescription} />
              </Wrapper>
              <ButtonWrapper>
                <Button
                  onClick={() => {
                    clickedRequest && replyRequest(1);
                  }}
                >
                  답변 보내기
                </Button>
                {/* <Button
                  onClick={() => {
                    clickedRequest && replyRequest(2);
                  }}
                >
                  거절하기
                </Button> */}
                <Button
                  onClick={() => {
                    clickedRequest && replyRequest(3);
                  }}
                >
                  의뢰 완료하기
                </Button>
              </ButtonWrapper>
            </ContentBox>
          )}
        </>
      ) : null}
    </>
  );
};
//   </>
// );
// };

const Wrapper = styled.div`
  position: relative;
`;
const TitleWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #f1f1f1;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  font-size: 1.3rem;
`;

const FromToIcon = styled.div`
  background-color: ${(props) => props.theme.color.yellow.light};
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 10px 20px;
  height: 2.5rem;
  border-radius: 10%;
  display: flex;
  align-items: center;
  font-size: 1.3rem;
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
export default RequestDetailPage;
