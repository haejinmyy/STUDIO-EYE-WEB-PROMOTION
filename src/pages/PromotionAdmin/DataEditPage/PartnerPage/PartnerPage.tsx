import { getPartnersData } from '@/apis/PromotionAdmin/dataEdit';
import { DATAEDIT_PATH } from '@/components/PromotionAdmin/DataEdit/DetailNavigator';
import { ContentBox } from '@/components/PromotionAdmin/FAQ/Components';
import { PA_ROUTES } from '@/constants/routerConstants';
import { theme } from '@/styles/theme';
import { IPartnersData } from '@/types/PromotionAdmin/dataEdit';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function PartnerPage() {
  const { data, isLoading } = useQuery<IPartnersData[]>(['partners', 'id'], getPartnersData);
  const navigator = useNavigate();
  const location = useLocation();

  const path = location.pathname.split('/')[location.pathname.split('/').length - 1];
  const [select, setSelect] = useState<null | number>(Number(path));

  if (isLoading) return <>is Loading..</>;
  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <Title>
            <Icon>
              <svg width='20' height='20' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M11.7692 1H4.07692C3.66889 1 3.27758 1.16209 2.98906 1.4506C2.70055 1.73912 2.53846 2.13043 2.53846 2.53846V16.3846L1 21L7.15385 19.4615H19.4615C19.8695 19.4615 20.2609 19.2994 20.5494 19.0109C20.8378 18.7225 21 18.3311 21 17.9231V10.2308'
                  stroke='#FFA900'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M13.0973 12.7486L8.48193 13.5793L9.25116 8.9024L16.5281 1.65625C16.6711 1.51205 16.8412 1.39759 17.0288 1.31949C17.2161 1.24138 17.4172 1.20117 17.6205 1.20117C17.8235 1.20117 18.0246 1.24138 18.212 1.31949C18.3995 1.39759 18.5697 1.51205 18.7128 1.65625L20.3435 3.28701C20.4877 3.43003 20.6021 3.6002 20.6803 3.78767C20.7583 3.97514 20.7986 4.17623 20.7986 4.37932C20.7986 4.58241 20.7583 4.7835 20.6803 4.97098C20.6021 5.15846 20.4877 5.32861 20.3435 5.47163L13.0973 12.7486Z'
                  stroke='#FFA900'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Icon>
            협력사 로고 관리
            <Info>등록된 협력사 로고 {data?.length}건</Info>
          </Title>

          <ButtonWrapper>
            <Button
              onClick={() => {
                navigator(`${PA_ROUTES.DATA_EDIT}/partner/write?${DATAEDIT_PATH.PARTNER}`);
              }}
            >
              <div>
                <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <g clipPath='url(#clip0_2_61)'>
                    <path d='M7.11328 4.10742V10.1074' stroke='black' strokeLinecap='round' strokeLinejoin='round' />
                    <path d='M4.11328 7.10742H10.1133' stroke='black' strokeLinecap='round' strokeLinejoin='round' />
                    <path
                      d='M10.6133 0.607422H3.61328C1.95643 0.607422 0.613281 1.95057 0.613281 3.60742V10.6074C0.613281 12.2643 1.95643 13.6074 3.61328 13.6074H10.6133C12.2702 13.6074 13.6133 12.2643 13.6133 10.6074V3.60742C13.6133 1.95057 12.2702 0.607422 10.6133 0.607422Z'
                      stroke='black'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_2_61'>
                      <rect width='14' height='14' fill='white' transform='translate(0.113281 0.107422)' />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              Partner 등록
            </Button>
          </ButtonWrapper>
        </TitleWrapper>
        {data && (
          <PartnerCardWrapper>
            {data.map((partner) => (
              <PartnerCard
                onClick={() => {
                  navigator(`${partner.partnerInfo.id}?${DATAEDIT_PATH.PARTNER}`);
                  setSelect(partner.partnerInfo.id);
                  window.location.reload();
                }}
                selected={select === partner.partnerInfo.id ? true : false}
              >
                <img src={partner.logoImg} />
              </PartnerCard>
            ))}
          </PartnerCardWrapper>
        )}
      </Wrapper>
      <Outlet />
    </>
  );
}

export default PartnerPage;

const Wrapper = styled.div`
  padding: 20px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px ${(props) => props.theme.color.black.pale};
  width: 40vw;
  height: 80vh;
  overflow: auto;
`;

const PartnerCardWrapper = styled.div`
  padding-top: 30px;
`;

const PartnerCard = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.color.black.bold};
  margin-bottom: 20px;
  border-radius: 10px;
  width: 600px;
  background-color: ${({ selected }) => (selected ? theme.color.yellow.bold : 'none')};

  img {
    height: 100px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 110px;
  height: 30px;
  align-items: center;
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  border-radius: 0.2rem;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light}; /* 버튼 호버 시 색상 조정 */
  }
`;

const Icon = styled.div`
  padding-right: 0.8rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  font-size: 1.3rem;
`;

const Info = styled.div`
  height: 20px;
  display: flex;
  align-items: end;
  padding-left: 8px;
  font-size: 10px;
  color: gray;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f1;
  align-items: center;
  background-color: ${(props) => props.theme.color.white.bold};
`;
