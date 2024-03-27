import React, { useState, useEffect } from "react";
import Carousel from "./Components/Carousel";
import axios from "axios";
import styled from "styled-components";

const MainAbout = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`/api/projects`)
      .then((response) => {
        const data = response.data;
        const urlList: any = [];

        for (let i = 0; i < data.data.length; i++) {
          //썸네일만 가져오기
          urlList.push(data.data[i].imageUrlList[0]);
        }

        setImages(urlList);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return <Carousel images={images}></Carousel>;
};

export default MainAbout;
