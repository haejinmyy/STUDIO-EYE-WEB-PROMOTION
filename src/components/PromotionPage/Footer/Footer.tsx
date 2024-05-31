import { getCompanyBasic, getCompanyLogo } from '@/apis/PromotionPage/company';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import defaultFooterLogo from '@/assets/images/PP/defaultFooterLogo.png';

type ICompanyBasic = {
  address: string;
  phone: string;
  fax: string;
};

const Footer = () => {
  const { data: companyBasicData } = useQuery<ICompanyBasic>(['getCompanyBasic'], getCompanyBasic, {
    staleTime: 1000 * 60 * 10,
  });
  const { data: companyLogoData, error } = useQuery<string>(['getCompanyLogo'], getCompanyLogo, {
    staleTime: 1000 * 60 * 10,
  });

  const addressData = companyBasicData ? companyBasicData.address : '서울시 성동구 광나루로 162 BS성수타워 5층';
  const phoneData = companyBasicData ? companyBasicData.phone : '02-2038-2663';
  const faxData = companyBasicData ? companyBasicData.fax : '070-7549-2443';
  const notValidAddress = (address: string) => address.length > 80;
  const notValidString = (info: string) => info.length > 18;

  return (
    <Container>
      <BasicInfoWrapper>
        <div>
          {notValidAddress(addressData) ? <h1>서울시 성동구 광나루로 162 BS성수타워 5층</h1> : <h1>{addressData}</h1>}
        </div>
        <div>
          {notValidString(phoneData) ? <h2>T. 02-2038-2663</h2> : <h2>T. {phoneData}</h2>}
          {notValidString(faxData) ? <h2>F. 070-7549-2443</h2> : <h2>F. {faxData}</h2>}
        </div>
      </BasicInfoWrapper>
      <ImgInfoWrapper>
        {' '}
        {error ? (
          <div>
            <img src={defaultFooterLogo} alt='기본 회사 로고' />
          </div>
        ) : (
          <div>
            <img src={companyLogoData} alt='기본 회사 로고' />
          </div>
        )}
        <div>
          <h1>COPYRIGHTⓒSTUDIOEYE,LTD. ALL RIGHTS RESERVED </h1>
        </div>
      </ImgInfoWrapper>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 65px 52px;
  box-sizing: border-box;

  h1,
  h2 {
    font-family: 'pretendard-bold';
    font-size: 20px;
    color: #333333;
  }

  h2 {
    margin-right: 30px;
  }

  img {
    opacity: 0.7;
    // width: 243px;
    height: 60px;
    object-fit: cover;
  }
`;

const BasicInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 35px;
  div {
    display: flex;
  }
`;
const ImgInfoWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
