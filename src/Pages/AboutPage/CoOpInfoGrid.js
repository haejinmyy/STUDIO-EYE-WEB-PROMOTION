import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import {useInView} from "react-intersection-observer";
import axios from "axios";
import Pladi from "../../assets/images/Pladi.png"
import Eye from "../../assets/logo/logo_yellow.png"
import PD from "../../assets/images/PDRoom.png"
import See from "../../assets/images/See.png"
import Urban from "../../assets/images/UrbanPladi.png"
import Locomo from "../../assets/images/Locomo.png"
import {useNavigate} from "react-router-dom";

const BoxContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-bottom: 5vh;
`;
const Title = styled.text`
    font-size: 54px;
    font-weight: 750;
    color: #FF530E;
    letter-spacing: 2px;
    margin-top: 100px;
    margin-bottom: 50px;
    text-align: center;
`;

const LogoDiv = styled(motion.div)`
    display: flex;
    height: 10rem;
    width: 70%;
    font-size: 4rem;
    font-weight: 600;
    
     @media(max-width: 950px){
    height: 6rem;
    }
    
    @media(max-width: 950px){
    height: 4rem;
    }

    @media(max-width: 390px){
    height: 2.5rem;
    }
`;
const ImgClick = styled(motion.img)`
    width: 25%;
    height: 70%;
    cursor: pointer;
`;
const Img = styled(motion.img)`
    width: 25%;
    height: 70%;
`;

const Space = styled.div`
    width: 12.5%;
`;

export default function CoOpInfoGrid() {
    const PladiClick = () => {
        window.location.href = "https://pladi.tv/";
    };
    const SeeClick = () => {
        window.location.href = "https://www.seeutter.com/channels/L2NoYW5uZWxzLzIxMjg/pages/home";
    };
  return (
      <BoxContainer>
          <Title>CORP.</Title>
          <LogoDiv>
              <ImgClick src={Pladi} onClick={PladiClick} ></ImgClick>
              <Space />
              <Img src={Eye}></Img>
              <Space />
              <Img src={PD}></Img>
          </LogoDiv>
          <LogoDiv>
              <ImgClick src={See} onClick={SeeClick}></ImgClick>
              <Space />
              <Img src={Urban}></Img>
              <Space />
              <Img src={Locomo}></Img>
          </LogoDiv>
      </BoxContainer>
  );
}
