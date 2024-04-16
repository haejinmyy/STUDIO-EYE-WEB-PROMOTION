import React, {useState} from 'react';
import styled from 'styled-components';
import { Link, Router, Route } from "react-router-dom";
import {motion} from "framer-motion"

const ButtonSection = styled(motion(Link))`
    position: fixed;
    width: 25px;
    height: 120px;
    top: 22%;
    right:0px;
    background-color: #000;
    border-radius: 15px 0 0 15px;
    display: flex;
    justify-content: center; 
    align-items: center; 
    text-decoration: none;
    white-space: nowrap;
`;

const ButtonText = styled.div`
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    transform: rotate(-90deg);
    font-size: 15px;
    font-weight: bold;
    color: white;

`;

const ContactButton = () => {
    return (
        <ButtonSection to="/Contact" >
            <ButtonText>
                CONTACT US
            </ButtonText>
        </ButtonSection>
    );
};

export default ContactButton;