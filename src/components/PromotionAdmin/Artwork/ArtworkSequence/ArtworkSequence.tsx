import { putArtworkMainSequence, putArtworkSequence } from "@/apis/PromotionAdmin/artwork";
import { ArtworkData } from "@/types/PromotionAdmin/artwork";
import styled from "styled-components";
import ArtworkSequenceBox from "./ArtworkSequenceBox";
import { useEffect, useState } from "react";
import {DragDropContext,Draggable,Droppable} from 'react-beautiful-dnd'
import { DResult,DragProvied,DropProvied } from "@/types/PromotionAdmin/react-beautiful-dnd-types";
import { theme } from "@/styles/theme";

const ArtworkSequence=({type,data,isLoading,error,refetch}:
  {type:string,data:ArtworkData[]|undefined,isLoading:boolean,error:Error|null,refetch:()=>void})=>{
  const [realData,setRealData]=useState<ArtworkData[]>([])
  const [isUpdated,setIsUpdated]=useState<boolean>(false)

  useEffect(() => {
    setIsUpdated(false)
    if(type==="main"){
      setRealData(data?data.filter(i=>i.projectType==="main").sort((a:ArtworkData,b:ArtworkData)=>a.mainSequence-b.mainSequence):[])
    }else{
      setRealData(data?data.sort((a,b)=>a.sequence-b.sequence):[])
    }
  }, [type]);

  useEffect(()=>{//업데이트가 없으면 기존 데이터를 이용할 수 있도록 분리
    refetch()
  }, [isUpdated])
  
    
    if (isLoading) return <LoadingWrapper>Loading...</LoadingWrapper>;
    if (error) return <div>Error: {error.message}</div>;

    const handleSequence=()=>{
      if(type==="main"){
        const sequenceData=realData.map((i)=>{
          return Object.fromEntries([["projectId",i.id],["mainSequence",i.mainSequence]])
        })
        // console.log(sequenceData)
        putArtworkMainSequence(sequenceData)
      }else{
        const sequenceData=realData.map((i)=>{
          return Object.fromEntries([["projectId",i.id],["sequence",i.sequence]])
        })
        // console.log(sequenceData)
        putArtworkSequence(sequenceData)
      }
      setIsUpdated(true)
    }

    const onDragEnd=({draggableId,destination,source}:DResult)=>{
      if(!destination) return;
      setRealData((oldData)=>{
        const copyData=[...oldData]
        copyData.splice(source.index,1)
        if(type==="main"){
          copyData.splice(destination?.index,0,{...realData[source.index],mainSequence:destination.index+1})
          return copyData.map((data,index)=>{return {...data,mainSequence:index+1}})
        }else{
          copyData.splice(destination?.index,0,{...realData[source.index],sequence:destination.index+1})
          return copyData.map((data,index)=>{return {...data,sequence:index+1}})
        }
      })
    }

    return(
        <div>
          <button onClick={()=>{
            console.log(realData)
          }}>데이터 확인</button>
          <SendButton onClick={
            handleSequence
            }>완료</SendButton>
        {data?.length===0?
        (<NoDataWrapper>😊 아트워크 데이터가 존재하지 않습니다.</NoDataWrapper>)
        :<DragDropContext onDragEnd={onDragEnd}>
          {type==="main"? //main sequence면 top 고정
            data?.filter(i=>i.projectType==="top").map((i)=>(
            <div style={{marginBottom:"3px"}}>
            <ArtworkSequenceBox type={"top"} artworkData={i}/>
            </div>
            ))
          :null}
        <Droppable droppableId="one">
          {(provided:DropProvied)=>(
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {realData.map((data,index)=>(
                <div style={{marginBottom:"3px"}}>
                <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                  {(provided:DragProvied)=>(
                    <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                      <ArtworkSequenceBox type={type==="main"?"main":"other"} artworkData={data}/>
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