import { useLocation } from 'react-router-dom';
import { IArtworksData } from '@/types/PromotionPage/artwork';
import { useQuery } from 'react-query';
import { getArtworkData } from '@/apis/PromotionPage/artwork';
import styled from 'styled-components';
import { useEffect } from 'react';
import { artwork_categories } from '@/components/PromotionPage/Artwork/Navigation';
import ArtworkCard from '@/components/PromotionPage/Artwork/ArtworkCard';
import NullException from '@/components/PromotionPage/Artwork/NullException';

function ArtworkPage() {
  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get('category');
  const { data, isLoading, error } = useQuery<IArtworksData, Error>(['artwork', 'id'], getArtworkData);
  const category = artwork_categories.find((category) => category.key + '' === categoryId);

  // data가 유효한지 확인하여 postedData 계산
  const postedData = data?.data?.filter((artwork) => artwork.isPosted === true) ?? [];

  // postedData가 유효한지 확인하여 filteredData 계산
  const filteredData = category
    ? postedData.filter((artwork) => artwork.category.toLowerCase() === category.label.toLocaleLowerCase())
    : [];

  function ScrollToTop() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]); // pathname이 변경될 때마다 실행
    return null;
  }

  if (isLoading) return <div>is Loading...</div>;
  if (error) return <>{error.message}</>;
  return (
    <>
      {postedData === null || postedData === undefined ? (
        <>Artwork 데이터가 없습니다.</>
      ) : (
        <>
          <ScrollToTop />
          <Wrapper>
            {data && categoryId === null ? (
              <ArtworkWrapper>
                {postedData?.length === 0 || data === null ? (
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
                {filteredData?.length === 0 || data === null ? (
                  <NullException />
                ) : (
                  <>
                    <ScrollToTop />
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
