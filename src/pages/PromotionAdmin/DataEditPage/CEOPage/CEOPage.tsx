import { getCEOData } from '@/apis/PromotionAdmin/dataEdit';
import { ICEOData } from '@/types/PromotionAdmin/dataEdit';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CEOWritePage from './CEOWritePage';

function CEOPage2() {
  const { data, isLoading } = useQuery<ICEOData>(['ceo', 'id'], getCEOData);
  const navigator = useNavigate();

  if (isLoading) return <div>is Loading...</div>;
  if (data === null) return <CEOWritePage />;

  return (
    <Wrapper>
      <button onClick={() => navigator('edit')}>수정하기</button>

      <ContentWrapper>
        <Title>name</Title>
        <Value> {data?.name}</Value>
      </ContentWrapper>
      <ContentWrapper>
        <Title>introduction</Title>
        <Value dangerouslySetInnerHTML={{ __html: data?.introduction ?? '' }} />
      </ContentWrapper>
      <ContentWrapper>
        <Title>logo</Title>
        <img src={data?.imageUrl} />
      </ContentWrapper>
    </Wrapper>
  );
}

export default CEOPage2;

const Wrapper = styled.div`
  img {
    width: 300px;
  }
`;

const Title = styled.div`
  font-family: ${(props) => props.theme.font.bold};
  font-size: 20px;
`;

const ContentWrapper = styled.div`
  min-height: 50px;
  padding: 20px;
`;

const Value = styled.div`
  font-family: ${(props) => props.theme.font.light};
`;
