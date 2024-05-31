import { getAllArtworks, putArtworkMainSequence, putArtworkSequence } from "@/apis/PromotionAdmin/artwork";
import { ArtworkData } from "@/types/PromotionAdmin/artwork";
import styled from "styled-components";
import ArtworkSequenceBox from "./ArtworkSequenceBox";
import { useEffect, useState } from "react";
import {DragDropContext,Draggable,Droppable} from 'react-beautiful-dnd'
import { DResult,DragProvied,DropProvied } from "@/types/PromotionAdmin/react-beautiful-dnd-types";
import { useQuery } from "react-query";
import { theme } from "@/styles/theme";

const ArtworkSequence=({type,setIsUpdating}:{type:string,setIsUpdating:(is:boolean)=>void})=>{
  const { data, isLoading, error, refetch } = useQuery<ArtworkData[], Error>('artworks', getAllArtworks);
  const [realData,setRealData]=useState<ArtworkData[]>([])
  const [isUpdated,setIsUpdated]=useState<boolean>(false) //sequence 업데이트 여부 확인

  useEffect(() => {
    handleDataSort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);  

  useEffect(()=>{//업데이트가 없으면 기존 데이터를 이용할 수 있도록 분리
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated])

  if (isLoading) return <LoadingWrapper>Loading...</LoadingWrapper>;
  if (error) return <div>Error: {error.message}</div>;

    const handleSequence=()=>{
      if (window.confirm("변경하시겠습니까?")){
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
      }else{
        handleDataSort()
      }
    }

    const handleDataSort=()=>{
      setIsUpdated(false)
      if(type==="main"){
        setRealData(data?data.filter(i=>i.projectType==="main").sort((a:ArtworkData,b:ArtworkData)=>a.mainSequence-b.mainSequence):[])
      }else{
        setRealData(data?data.sort((a,b)=>a.sequence-b.sequence):[])
      }
    }

    const onDragEnd=({draggableId,destination,source}:DResult)=>{
      if(!destination) return;
      setIsUpdating(true)
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
          {/* <button onClick={()=>{
            console.log(realData)
          }}>데이터 확인</button> */}
          <SendButton onClick={()=>{handleSequence()}}>완료</SendButton>
        {data?.length===0?
        (<NoDataWrapper>😊 아트워크 데이터가 존재하지 않습니다.</NoDataWrapper>)
        :<DragDropContext onDragEnd={onDragEnd}>
          {type==="main"? //main sequence면 top 고정
            data?.filter(i=>i.projectType==="top").map((i)=>(
            <div style={{marginBottom:"3px"}}>
            <ArtworkSequenceBox type={"top"} artworkData={i}/>
            <HorizonLine/>
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
  border-radius: 5px;
  width: fit-content;
  font-family: 'pretendard-semibold';
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  margin-bottom: 1rem;
  cursor: pointer;
  border:none;
  
  &:hover {
    background-color: #5a6268;
  }
`;

const HorizonLine= styled.div`
width:100%;
height: 1.5px;
background-color: ${theme.color.black.pale};
margin: 0.5rem 0;
`;