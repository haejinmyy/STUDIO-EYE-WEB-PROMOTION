import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import styled from "styled-components";

const ContentsSlider = styled(Slider)`
    /* background-color: aliceblue; */
    height: 100%;
    width: 100%;
    /* display: flex;
    flex-direction: row; */
    
    .slick-list {
        /* height: 100%;
        object-fit: cover;
        display: flex; 
        align-items: center; */
    }
    .slick-slide {
        /* padding-right: 5px; */
        /* pointer-events: none; */
    }
  .slick-prev, .slick-next {
    width: 50px;
    height: 50px;
  }

  .slick-prev:before, .slick-next:before {
    font-size: 50px;
    align-items: center;
    justify-content: center;
  }
`;



const Image = styled.img`
  width: 100%;
`;

const Pre = styled.div`
  left: 3%;
  z-index: 3;
`;

const NextTo = styled.div`
  right: 3%;
  z-index: 3;
`;

const Carousel = ({images}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        // nextArrow: (
        //     <NextTo>{'<'}</NextTo>
        // ),
        // prevArrow: (
        //     <Pre>{'>'}</Pre>
        // )
    };

    return(
        <ContentsSlider {...settings}>
            {images.map((image, index) => (
                <Image src={image} alt={`Slide ${index + 1}`} />
        ))}
        </ContentsSlider>
    )
}

export default Carousel;