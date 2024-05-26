import ArtworkComponent from '@/components/PromotionAdmin/Artwork/Artwork';
import ArtworkHeader from '@/components/PromotionAdmin/Artwork/ArtworkHeader';
import ArtworkMainSequence from '@/components/PromotionAdmin/Artwork/ArtworkMainSequence';
import ArtworkSequence from '@/components/PromotionAdmin/Artwork/ArtworkSequence';
import React, { useState } from 'react';
import styled from 'styled-components';

const Artwork = () => {
  const [isEditingSequence,setIsEditingSequence]=useState<number>(0);

  const handleEditingSequence=(isEditing:number)=>{
    setIsEditingSequence(isEditing)
  }

  return (
    <Container>
      {/* <HeaderWrapper>Artwork</HeaderWrapper> */}
      <ArtworkHeader initialCheck={isEditingSequence} control={handleEditingSequence}/>
      {isEditingSequence==0?
      <ArtworkComponent />
      :(isEditingSequence==1?<ArtworkMainSequence />:<ArtworkSequence/>)
      }
      
    </Container>
  );
};

export default Artwork;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const HeaderWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 32px;
  color: #595959;
  margin-bottom: 21px;
`;
