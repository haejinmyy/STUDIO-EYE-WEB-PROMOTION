import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import corpLogo from "../../assets/logo/Logo.png"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wrapper = styled.div`
    height: 28vh;
    width: 100%;
    background-color: #FFA900;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

const ScrollAnimation = keyframes`
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
`;

const ScrollAnimation2 = keyframes`
    0% {
    transform: translateX(-100%);
    }
    100% {
        transform: translateX(0);
    }
`;

const SliderContainer = styled.div`
    width: 100vw;
    /* overflow: hidden; // 여기로 overflow 이동 */
`;

const SlideTrack = styled.div`
    margin-top: 20px;
    width: 100%;
    justify-content: space-around;
    display: flex;
    gap: 3em;
    overflow: hidden;
`;

const SlideImg = styled.img`
    /* height: 100%; */
    /* animation: ${ScrollAnimation} 25s linear infinite; */
    transition: transform 1s ease-in-out;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    /* text-align: center; */
    object-fit: contain;
    max-width: 150px;
    /* -webkit-filter: invert(87%) sepia(61%) saturate(0%) hue-rotate(237deg) brightness(109%) contrast(101%);
    filter: invert(87%) sepia(61%) saturate(0%) hue-rotate(237deg) brightness(109%) contrast(101%); */
`;
const Containerr = styled.div`
    /* padding : 40px 40px ; */
`;
const SlideImg2 = styled.img`
    height: 100%;
    animation: ${ScrollAnimation2} 25s linear infinite;
    transition: transform 1s ease-in-out;

`;

const MainLogoSlider = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`https://port-0-promoationpage-server-12fhqa2blnlum4de.sel5.cloudtype.app/api/partners`)
            .then(response => {
                const data = response.data;
                const objects = [];
                const imgObjects = [];

                for (let i = 0; i < data.data.length; i++) {
                    const obj = {
                        id: data.data[i].id,
                        img: data.data[i].logoImageUrl,
                    }

                    objects.push(obj);
                }
                setData(objects);
                console.log(objects);
            })
            .catch(error => {
                console.error(error);
            });

    }, [])

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoPlaySpeed: 2000,
        cssEase: "linear",
    };
    return (
        <Wrapper>
            <SliderContainer>
                <Slider {...settings}>
                    {data.map((item) => (
                        <Containerr>
                            <SlideImg key={item.id} src={item.img} alt="" />
                        </Containerr>
                    ))}
                    {/* <SliderContainer>
                    </SliderContainer> */}
                </Slider>
                {/* <SlideTrack>
                    <SlideImg src={corpLogo} alt="" />
                    <SlideImg src={corpLogo} alt="" />
                    <SlideImg src={corpLogo} alt="" />
                    <SlideImg src={corpLogo} alt="" />


                </SlideTrack>
                <SlideTrack>
                    <SlideImg2 src={corpLogo} alt="" />
                    <SlideImg2 src={corpLogo} alt="" />
                    <SlideImg2 src={corpLogo} alt="" />
                    <SlideImg2 src={corpLogo} alt="" />
                    <SlideImg2 src={corpLogo} alt="" />
                    <SlideImg2 src={corpLogo} alt="" />
                    <SlideImg2 src={corpLogo} alt="" />

                </SlideTrack> */}
            </SliderContainer>
        </Wrapper>
    )
}

export default MainLogoSlider;