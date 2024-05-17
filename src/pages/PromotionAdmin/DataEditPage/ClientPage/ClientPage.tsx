import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Client from '@/components/PromotionAdmin/DataEdit/Client/Client';

function ClientPage() {
  return (
    <Wrapper>
      <Client />
      <Outlet />
    </Wrapper>
  );
}

export default ClientPage;

const Wrapper = styled.div`
  width: 87vw;
  display: flex;
  margin-left: 30px;
`;
