import { useLocation } from 'react-router-dom';
import { IArtworksData } from '@/types/PromotionPage/artwork';
import { useQuery } from 'react-query';
import { getArtworkData } from '@/apis/PromotionPage/artwork';
import styled from 'styled-components';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { artwork_categories } from '@/components/PromotionPage/Artwork/Navigation';
import ArtworkCard from '@/components/PromotionPage/Artwork/ArtworkCard';
import NullException from '@/components/PromotionPage/Artwork/NullException';

function ArtworkPage() {
  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get('category');
  const { data, isLoading } = useQuery<IArtworksData>(['artwork', 'id'], getArtworkData);
  const category = artwork_categories.find((category) => category.key + '' === categoryId);

  const postedData = data && data?.data.filter((artwork) => artwork.isPosted === true);
  const filteredData = postedData?.filter(
    (artworks) => artworks.category.toLowerCase() === category?.label.toLocaleLowerCase(),
  );

  // useEffect(() => {
  //   console.log(`Selected category ID: ${categoryId}`);
  // }, [categoryId]);

  return (
    <>
      {isLoading ? (
        <div>is Loading...</div>
      ) : (
        <>
          <Wrapper>
            {data && categoryId === null ? (
              <ArtworkWrapper>
                {postedData?.length === 0 ? (
                  <NullException />
                ) : (
                  <>
                    {postedData?.map((artwork) => (
                      <ArtworkCard
                        id={artwork.id}
                        name={artwork.name}
                        client={artwork.client}
                        mainImg={artwork.mainImg}
                      />
                    ))}
                  </>
                )}
              </ArtworkWrapper>
            ) : (
              <ArtworkWrapper>
                {filteredData?.length === 0 ? (
                  <NullException />
                ) : (
                  <>
                    {filteredData?.map((artwork) => (
                      <ArtworkCard
                        id={artwork.id}
                        name={artwork.name}
                        client={artwork.client}
                        mainImg={artwork.mainImg}
                      />
                    ))}
                  </>
                )}
              </ArtworkWrapper>
            )}
          </Wrapper>
        </>
      )}
    </>
  );
}

export default ArtworkPage;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.color.background};
`;

const ArtworkWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 33px;
`;

const Info = styled(motion.div)`
  padding-top: 10px;
  .info_client {
    display: block;
    padding-bottom: 5px;
    font-size: 20px;
    color: ${(props) => props.theme.color.black.light};
  }

  .info_name {
    font-size: 27px;

    color: ${(props) => props.theme.color.white.bold};
  }
`;
