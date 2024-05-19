import { getAllArtworks, putArtworkSequence } from "@/apis/PromotionAdmin/artwork";
import { ArtworkData } from "@/types/PromotionAdmin/artwork";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import ArtworkSequenceBox from "./ArtworkSequenceBox";
import { useEffect, useState } from "react";

const ArtworkSequence=()=>{
    const { data, isLoading, error } = useQuery<ArtworkData[], Error>('artworks', getAllArtworks,);
    if (isLoading) return <LoadingWrapper>Loading...</LoadingWrapper>;
    if (error) return <div>Error: {error.message}</div>;

    // 컴포넌트 드래그...를 해보려고 했으나 나중에
    // function DraggableList({ items }: { items: string[] }) {
    //     const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
    //     const [springs, api] = useSprings(items.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
    //     const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    //       const curIndex = order.current.indexOf(originalIndex)
    //       const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1)
    //       const newOrder = swap(order.current, curIndex, curRow)
    //       api.start(fn(newOrder, active, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
    //       if (!active) order.current = newOrder
    //     })

    const handleUpdateSequence=(projectId:number,oldSequence:number,newSequence:number)=>{
      const tempData=data?.filter((i)=>{
        if(i.id!=projectId) return true
      })

      if(oldSequence===newSequence){
        return
      }else if(oldSequence<newSequence){//더 큰 걸로 옮기기
        const sequenceData=tempData?.map((i)=>{
        if(i.sequence>=oldSequence&&i.sequence<=newSequence){
          return Object.fromEntries([["projectId",i.id],["sequence",i.sequence-1]])
        }else{
          return Object.fromEntries([["projectId",i.id],["sequence",i.sequence]])
        }})
        sequenceData?.push(Object.fromEntries([["projectId",projectId],["sequence",newSequence]]))
        // console.log(sequenceData)
        putArtworkSequence(sequenceData)
      }else if(oldSequence>newSequence){//더 작은 걸로 옮기기
        const sequenceData=tempData?.map((i)=>{
          if(i.sequence<=oldSequence&&i.sequence>=newSequence){
            return Object.fromEntries([["projectId",i.id],["sequence",i.sequence+1]])
          }
          else{
            return Object.fromEntries([["projectId",i.id],["sequence",i.sequence]])
        }})
        sequenceData?.push(Object.fromEntries([["projectId",projectId],["sequence",newSequence]]))
        // console.log(sequenceData)
        putArtworkSequence(sequenceData)
      }
    }

    return(
        <div>
        {data?.length===0?
        (<NoDataWrapper>😊 아트워크 데이터가 존재하지 않습니다.</NoDataWrapper>)
        :data?.map((artwork) => (
            <>
            <ArtworkSequenceBox
              artworkData={artwork}
              updateSequence={handleUpdateSequence}
            />
            <div style={{margin:'2px'}}/>
            </>
        ))
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