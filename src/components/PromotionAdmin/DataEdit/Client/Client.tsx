import { getClientData } from '@/apis/PromotionAdmin/dataEdit';
import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import { IClientData } from '@/types/PromotionAdmin/dataEdit';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as AddedIcon } from '@/assets/images/PA/plusIcon.svg';
import { ReactComponent as PublicIcon } from '@/assets/images/PA/public.svg';
import { ReactComponent as PrivateIcon } from '@/assets/images/PA/private.svg';

import Button from '../StyleComponents/Button';
import { DATAEDIT_TITLES_COMPONENTS } from '../Company/StyleComponents';
import { ContentBlock } from '../Company/CompanyFormStyleComponents';
import LogoItemList from '../StyleComponents/LogoListItem';
const Client = () => {
  const { data, isLoading, error } = useQuery<IClientData[], Error>(['client', 'id'], getClientData);
  const navigator = useNavigate();

  if (isLoading) return <>is Loading..</>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Wrapper>
      <ContentBlock>
        <TitleWrapper>
          {DATAEDIT_TITLES_COMPONENTS.Client}
          <Button
            description='Add New Client'
            svgComponent={<AddedIcon width={14} height={14} />}
            onClick={() => {
              navigator(`write`);
            }}
          />
        </TitleWrapper>
        <ListWrapper>
          {data?.length === 0 || data === null || data === undefined ? (
            <NoDataWrapper>😊 클라이언트 데이터가 존재하지 않습니다.</NoDataWrapper>
          ) : (
            <>
              {Array.isArray(data) &&
                data?.map((client) => (
                  <LogoItemList
                    logo={client.logoImg}
                    name={client.clientInfo.name}
                    is_posted={client.clientInfo.visibility}
                    onClick={() =>
                      navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_CLIENT}/${client.clientInfo.id}`)
                    }
                    svgComponent={client.clientInfo.visibility ? <PublicIcon /> : <PrivateIcon />}
                  />
                ))}
            </>
          )}
        </ListWrapper>
      </ContentBlock>
    </Wrapper>
  );
};

export default Client;

const Wrapper = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 20px;
`;

const NoDataWrapper = styled.div`
  font-family: 'pretendard-medium';
  font-size: 17px;
`;

const ListWrapper = styled.div``;
