import { IGetFAQData, getFAQData } from '@/apis/PromotionAdmin/faq';
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { IEditorData, IFAQData } from '../../../types/PromotionAdmin/faq';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { PA_ROUTES } from '@/constants/routerConstants';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { ContentBox } from '@/components/PromotionAdmin/FAQ/ContentBox';
import TextEditor from '@/components/PromotionAdmin/FAQ/TextEditor';

export default function FAQCEditPage() {
  const navigator = useNavigate();
  const faqEditMatch = useMatch(`${PA_ROUTES.FAQ}/write/:faqId`);

  const { data, isLoading } = useQuery<IGetFAQData>(['faq', 'id'], getFAQData);

  const clickedFAQ =
    faqEditMatch?.params.faqId && data?.data.find((faq) => String(faq.id) === faqEditMatch.params.faqId);

  const [editorState, setEditorState] = useState(() => {
    const blocksFromHtml = clickedFAQ && htmlToDraft(clickedFAQ.content);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });

  const [blocks, setBlocks] = useState<IEditorData[]>([]);

  const updateTextDescription = async (state: any) => {
    await setEditorState(state);
    setBlocks(convertToRaw(editorState.getCurrentContent()).blocks);
  };

  const { register, handleSubmit } = useForm<IFAQData>({
    defaultValues: {
      question: clickedFAQ && `${clickedFAQ.title}`,
    },
  });

  const onValid = (data: IFAQData) => {
    const formData = {
      id: clickedFAQ && clickedFAQ.id,
      title: data.question,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    };
    if (window.confirm('수정하시겠습니까?')) {
      axios
        .put(`http://3.35.54.100:8080/api/faq`, formData)
        .then((response) => {
          alert('FAQ가 수정되었습니다.');
        })
        .catch((error) => console.log(error));
      navigator(`${PA_ROUTES.FAQ}/${clickedFAQ && clickedFAQ.id}`);
    }
    // window.location.reload();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .delete(`http://3.35.54.100:8080/api/faq/${id}`)
        .then((response) => {})
        .catch((error) => console.log(error));

      alert('FAQ가 삭제되었습니다.');
      navigator(`${PA_ROUTES.FAQ}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>isLoading...</div>
      ) : (
        <ContentBox>
          <>
            <TitleWrapper>
              <Icon>
                <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <g clip-path='url(#clip0_126_2718)'>
                    <path
                      d='M9.89411 18.8594L5.6084 19.2309L5.97983 14.9451L14.8941 6.08802C15.0272 5.95196 15.1861 5.84385 15.3615 5.77003C15.5368 5.69622 15.7252 5.6582 15.9155 5.6582C16.1058 5.6582 16.2942 5.69622 16.4697 5.77003C16.6451 5.84385 16.8039 5.95196 16.9369 6.08802L18.7512 7.91659C18.8851 8.0494 18.9914 8.2074 19.0639 8.38149C19.1365 8.55557 19.1738 8.74229 19.1738 8.93087C19.1738 9.11946 19.1365 9.30619 19.0639 9.48028C18.9914 9.65436 18.8851 9.81236 18.7512 9.94516L9.89411 18.8594Z'
                      stroke='#FFA900'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M1.20217 5.6742C0.70084 5.58698 0.70084 4.8673 1.20217 4.78009C3.0184 4.4641 4.46294 3.08073 4.85717 1.27987L4.88738 1.14183C4.99584 0.646354 5.70134 0.643269 5.81413 1.13778L5.85081 1.29865C6.25963 3.09102 7.70457 4.4627 9.51576 4.7778C10.0196 4.86546 10.0196 5.58882 9.51576 5.67648C7.70457 5.99158 6.25963 7.36326 5.85081 9.15563L5.81413 9.3165C5.70134 9.81102 4.99584 9.80793 4.88738 9.31245L4.85717 9.17442C4.46294 7.37355 3.0184 5.99018 1.20217 5.6742Z'
                      stroke='#FFA900'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_126_2718'>
                      <rect width='20' height='20' fill='white' />
                    </clipPath>
                  </defs>
                </svg>
              </Icon>
              <Title>FAQ 게시글 수정</Title>
            </TitleWrapper>

            <FormContainer onSubmit={handleSubmit(onValid)}>
              <Content>
                <Title>
                  <QAIcon>Q</QAIcon>
                  Question
                </Title>
                <QuestionInput
                  {...register('question', {
                    required: '질문을 입력해주세요',
                  })}
                  placeholder='질문을 입력해주세요'
                />
              </Content>

              <Content>
                <Title>
                  <QAIcon>A</QAIcon>
                  Answer
                </Title>

                <TextEditor editorState={editorState} onEditorStateChange={updateTextDescription} />

                <ButtonWrapper>
                  <Button
                    onClick={() => {
                      clickedFAQ && handleDelete(clickedFAQ.id);
                    }}
                  >
                    삭제하기
                  </Button>
                  <Button as='button' type='submit'>
                    수정하기
                  </Button>
                </ButtonWrapper>
              </Content>
            </FormContainer>
          </>
        </ContentBox>
      )}
    </>
  );
}

const Wrapper = styled.div`
  border-radius: 1rem;
  background-color: ${(props) => props.theme.color.white.bold};
  border: 0.5px solid ${(props) => props.theme.color.black.light};
  width: 750px;
  min-height: 730px;
`;
const Icon = styled.div`
  padding-left: 1rem;
  padding-right: 0.8rem;
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

const QAIcon = styled.div`
  background-color: ${(props) => props.theme.color.yellow.light};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 100%;
  font-size: 1.1rem;
  margin-right: 0.5rem;
`;

const Content = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
`;

const QuestionInput = styled.input`
  padding-left: 1.3rem;
  border: none;
  width: 100%;
  height: 2rem;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
  justify-content: space-between;
`;

const Button = styled.div`
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
const FormContainer = styled.form``;
