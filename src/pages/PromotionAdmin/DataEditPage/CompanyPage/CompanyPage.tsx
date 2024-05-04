import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
import { useQuery } from 'react-query';
import styled from 'styled-components';

function CompanyPage() {
  const { data, isLoading } = useQuery<ICompanyData>(['company', 'id'], getCompanyData);

  if (isLoading) return <>is Loading...</>;
  return (
    <>
      {data && (
        <Wrapper>
          {/* <Button>수정하기</Button> */}
          <Info>
            <Title>Address</Title> {data?.address}
          </Info>
          <Info>
            <Title>Fax</Title> {data?.fax}
          </Info>

          <Info>
            <Title>Phone</Title> {data?.phone}
          </Info>

          <Info>
            <Title>Introduction</Title> {data?.introduction}
          </Info>
          <Info>
            <Title>What We Do</Title>
            <li>{data?.detailInformation.WHATWEDO1}</li>
            <li>{data?.detailInformation.WHATWEDO2}</li>
            <li>{data?.detailInformation.WHATWEDO3}</li>
            <li>{data?.detailInformation.WHATWEDO4}</li>
            <li>{data?.detailInformation.WHATWEDO5}</li>
          </Info>

          <ImgWrapper>
            <Title>Logo</Title>
            <LogoImg src={data.logoImageUrl} />
          </ImgWrapper>

          <ImgWrapper>
            <Title>Slogan</Title>
            <SloganImg src={data.sloganImageUrl} />
          </ImgWrapper>
        </Wrapper>
      )}
    </>
  );
}

export default CompanyPage;

const Button = styled.button`
  /* position: fixed;
  top: 150px; */
  background-color: ${(props) => props.theme.color.white.bold};
  border: 0px;
  font-size: 16px;
  font-weight: 100;
`;

const Wrapper = styled.div`
  padding-top: 20px;
  background-color: ${(props) => props.theme.color.white.bold};
`;

const Info = styled.div`
  font-size: 18px;
  margin-bottom: 30px;
  li {
    line-height: 30px;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 15px;
`;
const ImgWrapper = styled.div`
  padding-bottom: 30px;
`;

const LogoImg = styled.img`
  width: 300px;
`;

const SloganImg = styled.img`
  width: 300px;
`;
