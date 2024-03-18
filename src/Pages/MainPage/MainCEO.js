import React from "react";
import styled from "styled-components";
import caricature from "../../assets/images/Caricature.png"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #FFE9D2;

`;

const AboutCEO = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 40px;
    width: 100%;

`;

const About = styled.div`
    display: flex;
    flex-direction: column;

`;

const CEOName = styled.h1`
    font-weight: bold;
    /* font-size: 63px; */
    font-size: 4.5vw;
    text-align: right;
    margin-top: 0px;
    @media (max-width : 717px) {
        font-size: 7vw;
    }
`;

const CEOInfo = styled.div`
    font-size: 20px;
    white-space: pre-line;
    text-align: right;
    margin-bottom: 10px;
    padding-left: 30px;
    @media (max-width : 717px) {
        font-size: 2.7vw;
    }

`;

const InfoText = " CJ ENM 디지털 제작 팀장 출신 \n TV 예능, 웹드라마, 디지털 다큐멘터리, 게임 콘텐츠 연출 \n 기업 및 정부기관 콘텐츠 제작 및 SNS 운영 \n 엔터테인먼트 아티스트 콘텐츠 제작 \n "

const DividingLine = styled.div`
    height: 210px;
    border-left : thick solid #FFA900;
    margin: 20px;
    
    @media(max-width : 717px) {
        /* display: none; */
        /* border-bottom: thick solid #FFA900; */
    }
`;

const Caricature = styled.div`
    background: url(${caricature});
    background-position: center;
    background-repeat: no-repeat;
    width: 300px;
    height: 300px;
    background-size: contain; 
    margin-left: 50px;
    margin-right: 50px;

    @media(max-width : 717px) {
        width: 200px;
        height: 200px;
    }
    /* display: flex;
    align-items: center;
    justify-content: center; */
`;

const SMain = styled.div`
    color: #FFA900;
    font-size: 8vw;
    font-weight: bold;
    margin-bottom: 20px;

    /* @media (max-width : 991px) {
        font-size: 4vw;
    }
    @media (max-width : 768px) {
        font-size: 3vw;
    }
    @media (max-width : 480px) {
        font-size: 2vw;
    } */
`;

const SSub = styled.div`
    font-size: 20px;
    margin-bottom: 100px;
`;

const MainCEO = () => {
    return (
        <Wrapper>
            <AboutCEO>
                <About>
                    <CEOName>CEO 박용진</CEOName>
                    <CEOInfo>
                        {InfoText}
                    </CEOInfo>
                </About>
                <DividingLine />
                <Caricature/>
            </AboutCEO>
            <SMain>
                ENJOY YOUR EYES
            </SMain>
            <SSub>
                고객의 목적에 맞춘 최적의 콘텐츠로 재미와 감동을 드리겠습니다
            </SSub>
        </Wrapper>
    )

}

export default MainCEO;