import React, {useState} from 'react';
import styled from 'styled-components';
import Responsive from './responsive';
import {useNavigate} from "react-router-dom";
import studioi from "../../assets/logo/mainLogo.png";

const Block = styled.div`
  width: 100%;
  padding-top: 3rem;
  height: 12rem;
  background-color: #FFA900;
  z-index: 999;
  border-top: 1px solid white;
  
  @media(max-width: 970px){
  padding-top: 2rem;
    height: 8rem;
    }
    
    @media(max-width: 780px){
    padding-top: 1rem;
    height: 4rem;
    }
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
  width: 80%;
  height: 90%;
  background-color: transparent;
`;

const AdDiv = styled.div`
    height: 40%;
`;
const Div = styled.div`
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Sub = styled.div`
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Margin = styled.div`
    width: 5%;

`;

const Text = styled.text`
    font-size: 1.25rem;
    color: white;
    white-space: nowrap;
    margin-bottom: 1rem;
    cursor: default;
    
     @media(max-width: 970px){
    font-size: 1rem;
    }
    
     @media(max-width: 780px){
    font-size: 0.5rem;
    }
`;

const Img = styled.img`
  height: 3rem;
  margin-right: 30%;
  
  @media(max-width: 970px){
    height: 2rem;
    }
    
    @media(max-width: 780px){
    height: 1rem;
    } 
`;



const Footer = () => {
    const navigate = useNavigate();

    return (
        <>
            <Block>
                <Wrapper>
                    <AdDiv>
                        <Text>서울시 성동구 광나루로 162 BS성수타워 5층 5F, 162, Gwangnaru-ro, Seongdong-gu, Seoul, Korea</Text>
                    </AdDiv>
                    <Div>
                        <Img src={studioi} alt='logo image'/>
                        <Sub>
                        <Text>T. 02-2038-2663</Text>
                            <Margin/>
                        <Text>F. 070-7549-2443</Text>
                        </Sub>
                    </Div>
                </Wrapper>
            </Block>



        </>
    );
};

export default Footer;