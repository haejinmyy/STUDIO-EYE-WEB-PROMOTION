import ArtworkComponent from '@/components/PromotionAdmin/Artwork/ArtworkDefault/Artwork';
import ArtworkHeader from '@/components/PromotionAdmin/Artwork/ArtworkHeader';
import ArtworkSequence from '@/components/PromotionAdmin/Artwork/ArtworkSequence/ArtworkSequence';

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { dataUpdateState } from '@/recoil/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { ArtworkData } from '@/types/PromotionAdmin/artwork';
import { getAllArtworks } from '@/apis/PromotionAdmin/artwork';
// import { unstable_Blocker } from 'react-router-dom';

const Artwork = () => {
  const { data, isLoading, error, refetch } = useQuery<ArtworkData[], Error>('artworksequence', getAllArtworks);
  const [isEditingSequence, setIsEditingSequence] = useState<number>(0); //ArtworkHeader navigate용


  const handleEditingSequence = (isEditing: number) => {
      setIsEditingSequence(isEditing);
  };

  // const handleEditingSequence = (isEditing: number) => {
  //   if(isUpdating){
  //     if(window.confirm("현재 페이지를 나가면 변경 사항이 저장되지 않습니다.\n나가시겠습니까?")){
  //       //업데이트가 일어났는데 이동하는 경우
  //       setIsUpdating(false)
  //       setIsEditingSequence(isEditing)
  //     }else{
  //       //업데이트가 일어났는데 이동하지 않는 경우
  //       setIsEditingSequence(isEditingSequence)
  //     }
  //   }else{//업데이트가 일어나지 않은 경우
  //     setIsEditingSequence(isEditing);
  //   }
  // };

  // const handleEditingSequence = (isEditing: number) => {
  //   setIsEditingSequence(isEditing);
  // };

  return (
    <Container>
      <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <ArtworkHeader initialCheck={isEditingSequence} control={handleEditingSequence}/>
      </div>
      {isEditingSequence === 0 ? (
        <ArtworkComponent />
      ) : isEditingSequence === 1 ? (
        <ArtworkSequence type="main" data={data} isLoading={isLoading} error={error} refetch={refetch}/>
      ) : (
        <ArtworkSequence type="other" data={data} isLoading={isLoading} error={error} refetch={refetch}/>
      )}
    </Container>
  );
};

export default Artwork;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;