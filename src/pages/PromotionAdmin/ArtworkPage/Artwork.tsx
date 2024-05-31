import ArtworkComponent from '@/components/PromotionAdmin/Artwork/ArtworkDefault/Artwork';
import ArtworkHeader from '@/components/PromotionAdmin/Artwork/ArtworkHeader';
import ArtworkSequence from '@/components/PromotionAdmin/Artwork/ArtworkSequence/ArtworkSequence';

import React, { useState } from 'react';
import styled from 'styled-components';

const Artwork = () => {
  const [isEditingSequence, setIsEditingSequence] = useState<number>(0); //ArtworkHeader navigate용

  const handleEditingSequence = (isEditing: number) => {
    setIsEditingSequence(isEditing);
  };

  return (
    <Container>
      <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <ArtworkHeader initialCheck={isEditingSequence} control={handleEditingSequence} />
      </div>
      {isEditingSequence === 0 ? (
        <ArtworkComponent />
      ) : isEditingSequence === 1 ? (
        <ArtworkSequence type="main"/>
      ) : (
        <ArtworkSequence type="other"/>
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