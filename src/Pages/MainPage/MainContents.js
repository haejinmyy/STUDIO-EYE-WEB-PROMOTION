import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const Wrapper = styled.div`
    background-color: #F3F4F8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: pre-line;
`;

const Contents = styled.div`
    font-size: 40px;
    color: #FFA900;
    font-weight: bold;
    margin : 70px;
`;

const Image = styled.img`
    width: 90%;
    cursor: pointer;
    /* height: 100%; */ 
    /* object-fit: cover;  */
`;
const ContentsSlider = styled(Slider)`
    /* background-color: aliceblue; */
    height: 100%;
    width: 100%;
    /* display: flex;
    flex-direction: row; */
    margin-bottom: 100px;
    
    .slick-list {
        /* height: 100%;
        object-fit: cover;
        display: flex; 
        align-items: center; */
    }
    .slick-slide {
        /* padding-left: 5px; */
        /* padding-right: 5px; */
        /* pointer-events: none; */
    }
`;

const TextInfo = styled.h3`
    font-weight: bold;
    text-align: center;
`;
const MainContents = () => {

    const Text1 = "스튜디오 아이는 OTT, Youtube를 기반으로 한 콘텐츠 제작과 \n SNS 운영을 전문으로 하는 뉴미디어 제작사입니다";
    const Text2 = "예능, 드라마, 다큐멘터리, 게임, 애니메이션까지 \n 전 장르의 콘텐츠를 제작하고 Youtube, Instagram 운영을 대행합니다"
    const [dragging, setDragging] = useState(true);

    const handleBeforeChange = () => {
        setDragging(true);
    };

    const handleAfterChange = () => {
        setDragging(false);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2.999,
        slidesToScroll: 1,
        arrows: true,
        touchThreshold: 200,
        beforeChange: handleBeforeChange,
        afterChange: handleAfterChange,

        // autoplay : true, //autoplay 시 rendering error 추후 수정

        // centerMode: true,       // 가운데 정렬 모드
        // centerPadding: '50px',  // 각 슬라이드의 좌우 여백 조절

        //반응형
        responsive: [
            // {
            //   breakpoint: 1024,
            //   settings: {
            //     slidesToShow: 3,
            //     slidesToScroll: 1,
            //     infinite: true,
            //     dots: true,
            //   },
            // },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2.999,
                    slidesToScroll: 2,
                    // initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    const [data, setData] = useState([]);
    const [imgData, setImgData] = useState([]);

    const navigate = useNavigate();

    const goToYoutube = (link) => {
        if (!dragging) {
            window.open(link);
          }
    };


    useEffect(() => {
        axios.get(`https://port-0-promoationpage-server-12fhqa2blnlum4de.sel5.cloudtype.app/api/projects`)
            .then(response => {
                const data = response.data;
                console.log(data);
                const objects = [];
                const imgObjects = [];

                const filteredData = data.data.filter(item => item.isPosted);

                for (let i = 0; i < filteredData.length; i++) {
                    const obj = {
                        id: filteredData[i].id,
                        title: filteredData[i].title,
                        img: filteredData[i].imageUrlList[0],
                        link : filteredData[i].link,
                    }

                    objects.push(obj);
                }
                setImgData(imgObjects);
                setData(objects);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    return (
        <Wrapper>
            <Contents>WHAT WE DO</Contents>
            <TextInfo>{Text1}</TextInfo>
            <TextInfo>{Text2}</TextInfo>
            <Contents>CONTENTS</Contents>
            <ContentsSlider {...settings}>
                {data.map((item) => (
                    <Image
                        src={item.img}
                        key={item.id}
                        alt={item.id}
                        onClick={() => goToYoutube(item.link)}
                    />
                ))}
            </ContentsSlider>

        </Wrapper>
    )
}

export default MainContents;