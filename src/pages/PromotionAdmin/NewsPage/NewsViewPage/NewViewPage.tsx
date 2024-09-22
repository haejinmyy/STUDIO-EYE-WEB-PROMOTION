import { INEWS } from '@/types/PromotionAdmin/news';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const dummyNewsData: INEWS[] = [
  {
    id: 1,
    title: "New 8K Camera Released: Revolutionizing the Industry",
    date: new Date("2024-09-10"),
    source: "박승연",
    visibility:true,
    content: "The newest 8K camera from CinePro has been released, offering unprecedented quality for professional filmmakers."
  },{
    id: 2,
    title: "How Drones are Changing Video Production in 2024",
    date: new Date("2024-08-22"),
    source: "배수연",
    visibility: true,
    content: "Aerial shots have never been easier with the advancement of drone technology, offering filmmakers more dynamic angles."
  },{
    id: 3,
    title: "Virtual Production: The Future of Filmmaking?",
    date: new Date("2024-12-15"),
    source: "김선민",
    visibility: false,
    content: "With the rise of virtual production techniques, filmmakers can now shoot scenes without ever leaving the studio."
  },]

const NewsViewPage = () => {
  const { id } = useParams();
  const news=dummyNewsData.find(i=>i.id===Number(id));

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  return (
    <Container>
      <Title>{news?.title}</Title>
      <Day>{news?.date?formatDate(news?.date):null}</Day>
      <Source>{news?.source}</Source>
      <Visibility>{news?.visibility}</Visibility>
      <Content>{news?.content}</Content>
    </Container>
  );
};

export default NewsViewPage;

const Container=styled.div`
margin-left: 10px;
min-width: 300px;
background-color: white;
`

const Title=styled.div`
`
const Day=styled.div``
const Source=styled.div``
const Visibility=styled.div``
const Content=styled.div``