import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  requestId: string;
  organization: string;
  clientName: string;
  description: string;
  category: string;
  date: string;
  email: string;
};

const WaitingRequestsList = ({ requestId, organization, clientName, description, category, date, email }: Props) => {
  const limitedOrganization = organization.length > 13 ? organization.slice(0, 13) + '...' : organization;
  const limitedDescription = description.length > 33 ? description.slice(0, 33) + '...' : description;
  const limitedName = clientName.length > 7 ? clientName.slice(0, 7) + '...' : clientName;
  const limitedEmail = email.length > 20 ? email.slice(0, 29) + '...' : email;
  const slicedDate = date.slice(0, 10);
  return (
    <Container to={`/pa-test/request/${requestId}`}>
      <OrganizationWrapper>{limitedOrganization}</OrganizationWrapper>
      <DetailWrapper>
        <h2>{limitedDescription}</h2>
        <h3>{category}</h3>
      </DetailWrapper>
      <h4>{slicedDate}</h4>
      <h4>{limitedName}</h4>
      <span>{limitedEmail}</span>
    </Container>
  );
};

export default WaitingRequestsList;

const Container = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  height: 31px;
  padding: 20px 30px;
  background-color: none;
  border-top: 0.1px solid rgba(0, 0, 0, 0.05);
  text-decoration: none;
  &:hover {
    cursor: pointer;
    background-color: #afafaf1d;
    transition: all ease-in-out 200ms;
  }
  h4 {
    font-family: 'pretendard-regular';
    font-size: 14px;
    color: #434343;
    text-align: center;
    width: 70px;
    white-space: nowrap;
  }
  span {
    font-family: 'pretendard-regular';
    font-size: 14px;
    color: #434343;
    text-align: center;
    width: 150px;
  }
`;
const OrganizationWrapper = styled.div`
  width: 150px;
  white-space: nowrap;
  font-family: 'pretendard-semiBold';
  font-size: 16px;
  color: #323232;
`;
const DetailWrapper = styled.div`
  color: #323232;
  width: 400px;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: start;
  h2 {
    font-family: 'pretendard-semiBold';
    font-size: 16px;

    margin-bottom: 5px;
  }
  h3 {
    font-family: 'pretendard-regular';
    font-size: 13px;
  }
`;
