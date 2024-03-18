import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";

// @keyframes slide {
//     from { left: 0 }
//     to { left: -980px }
//   }
const reverseSlide = keyframes`
  from {
    left: 0;
  }

  to {
    left: -980px;
  }
`;
const slide = keyframes`
  from {
    left: -980px;
  }

  to {
    left: 0;
  }
`;
  
// LogoSliders {
//     // width: 500px;
//     // overflow: hidden;
//   }
  
//   .container {
//     display: flex;
//     flex-wrap: nowrap;
//     flex-shrink: 0;
//     position: relative;
//     animation-name: slide;
//     animation-duration: 6s;
//     animation-iteration-count: infinite;
//     animation-timing-function: linear;
//   }
  
//   .container div {
//     padding: 20px;
//     display: flex;
//     flex-shrink: 0;
//     align-items: center;
//     height: 100px;
//     width: 100px;
//   }
  
//   div img {
//     height: auto;
//     width: 100%;
//   }



const LogoSlider = styled.div`
    /* background-color: #FFA900;
    box-shadow: 0 0px 0px 0px rgba(0, 0, 0, 0.125);
    margin: auto;
    overflow: hidden;
    position: relative;
    width: 100%; */

    background-color: #FFA900;
    /* padding: 20px;
    display: flex;
    flex-shrink: 0;
    align-items: center; */
    overflow: hidden;

`;
const ReverseLogoSliderTrack = styled.div`
    display: flex;
    flex-wrap: nowrap;
    flex-shrink: 0;
    position: relative;
    animation-name: ${slide};
    animation-duration: 20s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
`
;
const LogoSliderTrack = styled.div`
    display: flex;
    flex-wrap: nowrap;
    flex-shrink: 0;
    position: relative;
    animation-name: ${reverseSlide};
    animation-duration: 20s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
`
;
const Slide = styled.div`
    padding: 20px;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    /* justify-content: center; */
    height: 100px;
    max-width: 150px;
/*     
    height: 150px;
    width: 250px;
    padding: 20px; */
`;
const SlideImg = styled.img`
    height: 50px;
    width: 100%;

`;

const MainLogoSlider = () => {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);

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
                const midpoint = Math.floor(objects.length / 2);
                const dataPart1 = objects.slice(0, midpoint);
                const dataPart2 = objects.slice(midpoint);
          
                // Set the data into the separate states
                setData1(dataPart1);
                setData2(dataPart2);
                // setData(objects);
                // console.log(objects);
            })
            .catch(error => {
                console.error(error);
            });

    }, [])
    return (
        <LogoSlider>
            <LogoSliderTrack>
                {data1.map((item) => (
                    <Slide>
                        <SlideImg key={item.id} src={item.img} alt="" />
                    </Slide>
                ))}

            </LogoSliderTrack>
            <ReverseLogoSliderTrack>
                {data2.map((item) => (
                    <Slide>
                        <SlideImg key={item.id} src={item.img} alt="" />
                    </Slide>
                ))}

            </ReverseLogoSliderTrack>

        </LogoSlider>
    )

}
export default MainLogoSlider;