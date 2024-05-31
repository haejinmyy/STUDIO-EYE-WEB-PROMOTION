import ArtworkComponent from '@/components/PromotionAdmin/Artwork/ArtworkDefault/Artwork';
import ArtworkHeader from '@/components/PromotionAdmin/Artwork/ArtworkHeader';
import ArtworkSequence from '@/components/PromotionAdmin/Artwork/ArtworkSequence/ArtworkSequence';

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { dataUpdateState } from '@/recoil/atoms';
import { useSetRecoilState } from 'recoil';
// import { unstable_Blocker } from 'react-router-dom';

const Artwork = () => {
  const [isEditingSequence, setIsEditingSequence] = useState<number>(0); //ArtworkHeader navigate용
  const [isUpdating,setIsUpdating]=useState<boolean>(false)//sequence 변경중인지 확인
  const setupdate = useSetRecoilState(dataUpdateState);

  useEffect(()=>{
    setupdate(isUpdating)
  },[isUpdating])

  const handleEditingSequence = (isEditing: number) => {
    if(isUpdating){
      if(window.confirm("현재 페이지를 나가면 변경 사항이 저장되지 않습니다.\n나가시겠습니까?")){
        setIsUpdating(false)
        setIsEditingSequence(isEditing)
      }else
      { console.log(isEditingSequence)
        setIsEditingSequence(isEditingSequence)
      }
    }else{
      setIsEditingSequence(isEditing);
    }
  };

  return (
    <Container>
      <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <ArtworkHeader initialCheck={isEditingSequence} control={handleEditingSequence} />
      </div>
      {isEditingSequence === 0 ? (
        <ArtworkComponent />
      ) : isEditingSequence === 1 ? (
        <ArtworkSequence type="main" setIsUpdating={setIsUpdating}/>
      ) : (
        <ArtworkSequence type="other" setIsUpdating={setIsUpdating}/>
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