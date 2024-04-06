import React from 'react'
import slogan from '@/assets/images/PA-Header/slogan.png';
import isNewIcon from '@/assets/images/PA-Header/isNewIcon.png';
import defaultIcon from '@/assets/images/PA-Header/defaultIcon.png';
import userIcon from '@/assets/images/PA-Header/userIcon.png';
import openIcon from '@/assets/images/PA-Header/openIcon.png';
import CircleBtn from './CircleBtn';
import styled from 'styled-components';

const circleBtns = [
  {
      id:1,
      defaultIcon: defaultIcon,
      isNewIcon: isNewIcon,
      iconStatus: true,
  },
  {
    id:2,
    defaultIcon: userIcon,
    isNewIcon: userIcon,
    iconStatus: true,
},
]

const index = () => {
  return (
    <Container>
      <LeftWrapper>
        <img src={slogan} alt='pa-header-slogan' />
        <h1>오늘도 스튜디오 아이와 함께 좋은 하루 되세요, ㅇㅇㅇ님!</h1>
      </LeftWrapper>
      <RightWrapper>
        <OpenLinkWrapper href='http://ec2-3-35-22-220.ap-northeast-2.compute.amazonaws.com/' target='_blank'> <img src={openIcon} alt='pa-header-open' /> <span>Open Promotion Page</span></OpenLinkWrapper>
        <CircleBtnWrapper>
          {circleBtns.map((i,index) => (
            <ul key={index}>
            <CircleBtn defaultIcon={i.defaultIcon} isNewIcon={i.isNewIcon} />
         </ul>
         ))}
        </CircleBtnWrapper>
      </RightWrapper>
    </Container>
  )
}

export default index

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  height: 80px;
  box-shadow: 0px 0px 20px #00000025;
  position: fixed;
  top: 0;
  left:0;
  z-index: 20;
  padding-left: 151px;
`;

const LeftWrapper = styled.div`
  font-family: 'pretendard-semibold';
  font-size: 16px;
  color: #000000e2;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`

const OpenLinkWrapper = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 221px;
  height: 36px;
  box-shadow: 0px 0px 10px #00000030;
  border-radius: 10px;
  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    margin-right: 5px;
  }
  font-family: 'pretendard-semibold';
  font-size: 16px;
  color: #595959;
  margin-right: 40px;
`;

const CircleBtnWrapper = styled.div`
  display: flex;
  ul {
    margin-right: 40px;
  }
`