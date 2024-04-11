import { IGetFAQData, getFAQData } from '@/apis/PromotionAdmin/faq';
import { ContentBox } from '@/components/PromotionAdmin/FAQ/ContentBox';
import { PA_ROUTES } from '@/constants/routerConstants';
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function FAQCheckPage() {
  const navigator = useNavigate();
  const faqDetailMatch = useMatch(`${PA_ROUTES.FAQ}/:faqId`);

  const { data, isLoading } = useQuery<IGetFAQData>(['faq', 'id'], getFAQData);

  const clickedFAQ =
    faqDetailMatch?.params.faqId && data?.data.find((faq) => String(faq.id) === faqDetailMatch.params.faqId);

  return (
    <>
      {isLoading ? (
        <div> is Loading... </div>
      ) : (
        <>
          {faqDetailMatch ? (
            <>
              {clickedFAQ && (
                <ContentBox>
                  <Wrapper>
                    <TitleWrapper>
                      <QAIcon>Q</QAIcon>
                      <Title>{clickedFAQ.title} </Title>
                    </TitleWrapper>
                    <QAIcon>A</QAIcon>
                    <Answer className='article' dangerouslySetInnerHTML={{ __html: clickedFAQ.content }} />
                    <ButtonWrapper>
                      <Button
                        onClick={() => {
                          navigator(`${PA_ROUTES.FAQ}/write/${clickedFAQ.id}`);
                        }}
                      >
                        수정하기
                      </Button>
                    </ButtonWrapper>
                  </Wrapper>
                </ContentBox>
              )}
            </>
          ) : null}
        </>
      )}
    </>
  );
}

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

const Answer = styled.div`
  img {
    max-width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const Button = styled.button`
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  padding: 0.4rem 1.4rem;
  border-radius: 0.2rem;
`;
