import { PP_ROUTES_CHILD } from '@/constants/routerConstants';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Circle from '../Circle/Circle';

function WorkWithUs() {
  const navigator = useNavigate();
  return (
    <Container>
      <div>
        <Title>
          LET'S COLLABORATE
          <div>
            <YellowTextWrapper>WORK &nbsp;</YellowTextWrapper> WITH US!
          </div>
        </Title>
        <Link onClick={() => navigator(`/${PP_ROUTES_CHILD.CONTACT}`)}>스튜디오아이에 프로젝트 문의하기 →</Link>
      </div>
      <div>
        <Circle label='CONTACT US' />
      </div>
    </Container>
  );
}

export default WorkWithUs;

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-around;
  margin-top: 50px;
  padding: 20px 60px;
`;

const Title = styled.div`
  font-family: 'pretendard-bold';
  font-size: 96px;
  line-height: normal;
  color: white;
  div {
    display: flex;
  }
  margin-bottom: 35px;
`;
const YellowTextWrapper = styled.div`
  color: #ffa900;
`;

const Link = styled.a`
  font-family: 'pretendard-bold';
  font-size: 28px;
  cursor: pointer;
  color: #d7d7d7;
  &:hover {
    color: #ffa900;
    transition: all 300ms ease-in-out;
  }
`;
