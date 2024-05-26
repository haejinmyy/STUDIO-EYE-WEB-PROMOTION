import { getAllArtworks, putArtworkSequence } from "@/apis/PromotionAdmin/artwork";
import { ArtworkData } from "@/types/PromotionAdmin/artwork";
import { useQuery } from "react-query";
import styled from "styled-components";
import ArtworkSequenceBox from "./ArtworkSequenceBox";
import { useState } from "react";
import {DragDropContext,Draggable,Droppable} from 'react-beautiful-dnd'
import { DResult,DragProvied,DropProvied } from "@/types/PromotionAdmin/react-beautiful-dnd-types";
import { theme } from "@/styles/theme";

const ArtworkSequence=()=>{
    const { data, isLoading, error } = useQuery<ArtworkData[], Error>('artworks', getAllArtworks,);
    const [realData,setRealData]=useState<ArtworkData[]>(data!!.sort((a,b)=>a.sequence-b.sequence));
    if (isLoading) return <LoadingWrapper>Loading...</LoadingWrapper>;
    if (error) return <div>Error: {error.message}</div>;

    const sequenceReset=()=>{
      console.log(data)
    }

    const handleSequence=()=>{
      const sequenceData=realData.map((i)=>{
        return Object.fromEntries([["projectId",i.id],["sequence",i.sequence]])
      })
      // console.log(sequenceData)
      putArtworkSequence(sequenceData)
    }

    const onDragEnd=({draggableId,destination,source}:DResult)=>{
      if(!destination) return;
      setRealData((oldData)=>{
        const copyData=[...oldData]
        copyData.splice(source.index,1)
        // if(source.index<destination.index){//더 큰 걸로 옮기기
        //   copyData.map((i)=>{
        //   if(i.sequence>=source.index&&i.sequence<=destination.index){
        //     return {...i,sequence:i.sequence-1}
        //   }else{
        //     return {...i,sequence:i.sequence}
        //   }
        // })
        // }else if(source.index>destination.index){//더 작은 걸로 옮기기
        //   copyData.map((i)=>{
        //     if(i.sequence<=source.index&&i.sequence>=destination.index){
        //       return {...i,sequence:i.sequence+1}
        //     }
        //     else{
        //       return {...i,sequence:i.sequence}
        //   }})
        // }
        copyData.splice(destination?.index,0,{...realData[source.index],sequence:destination.index+1})
        return copyData.map((data,index)=>{
          return {...data,sequence:index+1}
        })
      })
    }

    return(
        <div>
          <SendButton onClick={
            handleSequence
            }>완료</SendButton>
        {data?.length===0?
        (<NoDataWrapper>😊 아트워크 데이터가 존재하지 않습니다.</NoDataWrapper>)
        :<DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="one">
          {(provided:DropProvied)=>(
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {realData.map((data,index)=>(
                <div style={{marginBottom:"3px"}}>
                <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                  {(provided:DragProvied)=>(
                    <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                      <ArtworkSequenceBox type={"other"} artworkData={data}/>
                    </div>
                  )}
                </Draggable>
                {provided.placehodler}
                </div>
              ))}
            </div>
          )}
        </Droppable>
        </DragDropContext>
        }
        </div>
    )
}
export default ArtworkSequence;

const LoadingWrapper = styled.div`
  font-family: 'pretendard-regular';
  font-size: 17px;
`;

const NoDataWrapper = styled.div`
  font-family: 'pretendard-medium';
  font-size: 17px;
`;

const SendButton=styled.button`
  width:100%;
  margin-bottom:10px;
  font-family: 'pretendard-medium';
  font-size:15px;
  padding: 2px 5px;
  background-color: ${theme.color.yellow.light};
  color: ${theme.color.black.bold};
  border-radius:5px;
  border:0;
  box-shadow: 0px 0px 2px ${theme.color.black.bold};
  &:hover{
    cursor:pointer;
  }
`;