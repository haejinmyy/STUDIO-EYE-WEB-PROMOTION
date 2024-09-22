import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import { NavigateFunction } from 'react-router-dom';
import { INEWS } from '@/types/PromotionAdmin/news';

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

const NewsList = ({handler}:{handler:(id:number)=>void}) => {
  //api 연결하는 거 만들기
  const newsData: INEWS[]=dummyNewsData;  

    const handleClick=(id:number)=>{
      handler(id)
    }

  return (
    <div style={{flexDirection:'column'}}>
    {newsData.map((i)=>(
        <div
        key={i.id}
        style={{marginBottom:"5px"}}
        onClick={()=>handleClick(i.id)}>
        <NewsItem title={i.title} date={i.date} content={i.content}/>
        </div>
    ))}
    </div>
  );
};

export default NewsList;