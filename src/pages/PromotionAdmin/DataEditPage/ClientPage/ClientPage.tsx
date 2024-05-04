import { getClientData } from '@/apis/PromotionAdmin/dataEdit';
import { IClientData } from '@/types/PromotionAdmin/dataEdit';
import { useQuery } from 'react-query';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { DATAEDIT_PATH } from '@/components/PromotionAdmin/DataEdit/DetailNavigator';
import { useState } from 'react';
import { theme } from '@/styles/theme';

export default function ClientPage() {
  const { data, isLoading } = useQuery<IClientData[]>(['client', 'id'], getClientData);
  const navigator = useNavigate();
  const location = useLocation();

  const path = location.pathname.split('/')[location.pathname.split('/').length - 1];
  const [select, setSelect] = useState<null | number>(Number(path));

  if (isLoading) return <div>is Loading...</div>;
  return (
    <Wrapper>
      {data && (
        <>
          <ClientWrapper>
            {data.map((client) => (
              <ClientCardWrapper>
                <ClientCard
                  onClick={() => {
                    navigator(`${client.clientInfo.id}?${DATAEDIT_PATH.CLIENT}`);
                    setSelect(client.clientInfo.id);
                    window.location.reload();
                  }}
                  selected={select === client.clientInfo.id ? true : false}
                >
                  <img src={client.logoImg} />
                </ClientCard>
                <Name>{client.clientInfo.name}</Name>
              </ClientCardWrapper>
            ))}
          </ClientWrapper>
        </>
      )}
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 87vw;
  display: flex;
  margin-left: 30px;
`;

const ClientWrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 33px;
`;

const ClientCard = styled.div<{ selected: boolean }>`
  cursor: pointer;
  background-color: ${(props) => props.theme.color.black.bold};
  height: 200px;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  img {
    width: 150px;
  }
  box-shadow: 1px 2px 10px 0.5px #c6c6c6;
  background-color: ${({ selected }) => (selected ? theme.color.yellow.bold : 'none')};
`;

const Name = styled.div`
  justify-content: center;
  display: flex;
  font-size: 18px;
  padding-top: 10px;
`;

const ClientCardWrapper = styled(motion.div)``;
