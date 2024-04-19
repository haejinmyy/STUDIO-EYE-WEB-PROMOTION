import { useNavigate } from 'react-router-dom';
import { PP_ROUTES_CHILD } from '@/constants/routerConstants';
import { IArtworksData } from '@/types/PromotionPage/artwork';
import { useQuery } from 'react-query';
import { getArtworkData } from '@/apis/PromotionPage/artwork';

function ArtworkPage() {
  const navigator = useNavigate();
  const { data, isLoading } = useQuery<IArtworksData>(['artwork', 'id'], getArtworkData);

  return (
    <>
      {isLoading ? (
        <div>is Loading...</div>
      ) : (
        <>
          {data &&
            data.data.map((artwork) => (
              <div
                key={artwork.id}
                onClick={() => {
                  navigator(`/${PP_ROUTES_CHILD.ARTWORK}/${artwork.id}`);
                }}
              >
                <li>{artwork.client}</li>
                <img src={artwork.mainImg} />
                <li>{artwork.name}</li>
              </div>
            ))}
        </>
      )}
    </>
  );
}

export default ArtworkPage;
