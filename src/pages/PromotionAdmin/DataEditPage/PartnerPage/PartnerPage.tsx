import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Partner from '@/components/PromotionAdmin/DataEdit/Partner/Partner';

function PartnerPage() {
  return (
    <Wrapper>
      <Partner />
      <Outlet />
    </Wrapper>
  );
}

export default PartnerPage;

const Wrapper = styled.div`
  display: flex;
`;
