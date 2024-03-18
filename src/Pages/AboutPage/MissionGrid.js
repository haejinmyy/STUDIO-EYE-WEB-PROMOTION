import React, {useEffect} from "react";
import styled from "styled-components";
import {motion, useAnimation, Variants} from "framer-motion";
import {useInView} from "react-intersection-observer";
import Mission from "../../assets/images/Mission.png"
import Logo from "../../assets/logo/logo_yellow.png"

const BoxContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
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
const Img = styled(motion.img)`
    aspect-ratio: 1051 / 140;
    width: 70%;  
    margin-top: 5vh;
    margin-bottom: 10vh;
`;

const BackImg = styled(motion.img)`
    aspect-ratio: 238 / 52;
    width: 100%;  
    position: absolute;
    top: calc(200px);
    opacity: 0.15;
`;

  export default function MissionGrid() {


    return (
      <BoxContainer>
          <Title>MISSION</Title>
          <Img src={Mission}></Img>
          <BackImg src={Logo}></BackImg>
      </BoxContainer>
    );
  }
