import styled from 'styled-components';
import { NavWrapper } from './Components';
import { useMatch, useNavigate } from 'react-router-dom';
import { PP_ROUTES_CHILD } from '@/constants/routerConstants';
import { useQuery } from 'react-query';
import { IArtworksData } from '@/types/PromotionPage/artwork';
import { getArtworkData } from '@/apis/PromotionPage/artwork';

function Navigation() {
  //   const navigator = useNavigate();
  //   const artworkDetailMatch = useMatch(`${PP_ROUTES_CHILD.ARTWORK}/:id`);
  //   const { data, isLoading } = useQuery<IArtworksData>(['artwork', 'id'], getArtworkData);

  //   console.log(data);
  //   const dataLength = data?.data ? data.data.length : 0;
  //   const artworkIndex = Number(artworkDetailMatch?.params.id);
  //   const currentIndex = data?.data ? data?.data.findIndex((artwork) => artwork.id === artworkIndex) : 0;
  //   const prevIndex = data && currentIndex === 0 ? null : data?.data[currentIndex - 1].id;
  //   const nextIndex = data && currentIndex === dataLength - 1 ? null : data?.data[currentIndex + 1].id;

  return (
    <>
      {/* {isLoading ? (
        <div>is Loading... </div>
      ) : (
        <>
          {currentIndex === 0 ? null : (
            <NavWrapper
              onClick={() => {
                navigator(`/${PP_ROUTES_CHILD.ARTWORK}/${prevIndex}`);
              }}
            >
              <svg width='100' height='80' viewBox='0 0 100 80' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <rect width='100' height='80' fill='url(#pattern0_4_14032)' />
                <defs>
                  <pattern id='pattern0_4_14032' patternContentUnits='objectBoundingBox' width='1' height='1'>
                    <use href='#image0_4_14032' transform='scale(0.01 0.0125)' />
                  </pattern>
                  <image
                    id='image0_4_14032'
                    width='100'
                    height='80'
                    href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAYAAADvCdDvAAAAAXNSR0IArs4c6QAAAxxJREFUeF7t3b+LFDEUB/BvOLhqd9vxb7hG/UMsbTy0sFJLwcL/wEIQLPwBB4IiFgq2Nna2nn/HLVyje+1GsjLH3rKZZCYvyXPme+3NZt68z75MMhk2Bmr/jg5nOP8M2G8rLF+rDVM4MCPcnlBzR4dznH8BcMs1aGEfTQVFIchVjFZ4KijKQPZjbKE8XGH5RqgMVTajCKQbA8DawN77jeVHlZkUCkoJCDFaTwUgxNgursogQQw3wnqwwvKtUI+gvpmKIFEYkxnuVu6yiOEr1QoVQoyufrM0yMECzScL3PYFNZUJoIYKOZiheW+AO8Tw10ipCiFG5PiuBAgxIjHcYblBiNEDIzcIMXpi5AQhxgCMXCDEGIiRA4QYCRjSIMRIxJAEIYYAhhQIMYQwJECCGGvg8QXOXgjGPOqmUiaGQQwAT//g7NmoMyh8cUNBiCEMkbJARYxMGEPuIWaO5gTA/Y6Y2E0lgPXpsswC1165lw6IkZDxwEdjQYiRz+BKyzEgxCiEEXMPIUZBjBAIMQpjdIEQowKGD4QYlTD2gRCjIsYuiJv0/QJw3ReTBV5arN9VjnnUp2+Hva4yflrYm6O+2v/g4hwIMRRBOYxTVoYeEYLosdhEwi5LIcgGJnRTN8B3wPxQFv/owtl+uGgWaE4tcIOP1+s57z7t5cSwnsXlPWQ3BKJURPGthxClEkrXAhVRKqCEVgyJUhglBNIOiflyQyGYGBCiFMLwLVD5Ts/uqwBMbIW0oZgZmg8GOObkMY9OXxAXBV8lzWPhnRjGnI4oMVkacMyQCmlPQ5QBCQ99JAUkqvtawz65wPJ5KBD+/18GUkGiUKb+Cz99vmwSIETpk/HAsVIgRBFCkQQhigCKNAhRElFygBAlASUXCFEGouQEIcoAlNwgROmJUgKEKD1QSoEQJRKlJMgGZY7ma7uV0b4Yp/6YpTQIAP7UeFexVABx4RDFh1IJhCgKQYiyD6VihbThBLsva2Dvjn0zsDYbCkCiKmUSO7S5TCgBIYqyConrviwsN5aMnGAKHsatVwWTKdUUNyeWyqRgO9PcvvsvBkLTBbmnnIsAAAAASUVORK5CYII='
                  />
                </defs>
              </svg>
              <Nav>
                PREV PROJECT
                <div className='nav_title'>{data?.data[currentIndex - 1].name}</div>
              </Nav>
            </NavWrapper>
          )}

          {currentIndex === dataLength - 1 ? null : (
            <NavWrapper
              onClick={() => {
                navigator(`/${PP_ROUTES_CHILD.ARTWORK}/${nextIndex}`);
              }}
            >
              <Nav>
                NEXT PROJECT
                <div className='nav_title'>{data?.data[currentIndex + 1].name}</div>
              </Nav>
              <svg width='100' height='80' viewBox='0 0 100 80' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <rect
                  x='100'
                  y='80'
                  width='100'
                  height='80'
                  transform='rotate(-180 100 80)'
                  fill='url(#pattern0_4_14038)'
                />
                <defs>
                  <pattern id='pattern0_4_14038' patternContentUnits='objectBoundingBox' width='1' height='1'>
                    <use href='#image0_4_14038' transform='scale(0.01 0.0125)' />
                  </pattern>
                  <image
                    id='image0_4_14038'
                    width='100'
                    height='80'
                    href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAYAAADvCdDvAAAAAXNSR0IArs4c6QAAAxxJREFUeF7t3b+LFDEUB/BvOLhqd9vxb7hG/UMsbTy0sFJLwcL/wEIQLPwBB4IiFgq2Nna2nn/HLVyje+1GsjLH3rKZZCYvyXPme+3NZt68z75MMhk2Bmr/jg5nOP8M2G8rLF+rDVM4MCPcnlBzR4dznH8BcMs1aGEfTQVFIchVjFZ4KijKQPZjbKE8XGH5RqgMVTajCKQbA8DawN77jeVHlZkUCkoJCDFaTwUgxNgursogQQw3wnqwwvKtUI+gvpmKIFEYkxnuVu6yiOEr1QoVQoyufrM0yMECzScL3PYFNZUJoIYKOZiheW+AO8Tw10ipCiFG5PiuBAgxIjHcYblBiNEDIzcIMXpi5AQhxgCMXCDEGIiRA4QYCRjSIMRIxJAEIYYAhhQIMYQwJECCGGvg8QXOXgjGPOqmUiaGQQwAT//g7NmoMyh8cUNBiCEMkbJARYxMGEPuIWaO5gTA/Y6Y2E0lgPXpsswC1165lw6IkZDxwEdjQYiRz+BKyzEgxCiEEXMPIUZBjBAIMQpjdIEQowKGD4QYlTD2gRCjIsYuiJv0/QJw3ReTBV5arN9VjnnUp2+Hva4yflrYm6O+2v/g4hwIMRRBOYxTVoYeEYLosdhEwi5LIcgGJnRTN8B3wPxQFv/owtl+uGgWaE4tcIOP1+s57z7t5cSwnsXlPWQ3BKJURPGthxClEkrXAhVRKqCEVgyJUhglBNIOiflyQyGYGBCiFMLwLVD5Ts/uqwBMbIW0oZgZmg8GOObkMY9OXxAXBV8lzWPhnRjGnI4oMVkacMyQCmlPQ5QBCQ99JAUkqvtawz65wPJ5KBD+/18GUkGiUKb+Cz99vmwSIETpk/HAsVIgRBFCkQQhigCKNAhRElFygBAlASUXCFEGouQEIcoAlNwgROmJUgKEKD1QSoEQJRKlJMgGZY7ma7uV0b4Yp/6YpTQIAP7UeFexVABx4RDFh1IJhCgKQYiyD6VihbThBLsva2Dvjn0zsDYbCkCiKmUSO7S5TCgBIYqyConrviwsN5aMnGAKHsatVwWTKdUUNyeWyqRgO9PcvvsvBkLTBbmnnIsAAAAASUVORK5CYII='
                  />
                </defs>
              </svg>
            </NavWrapper>
          )}

          <List onClick={() => navigator(`/${PP_ROUTES_CHILD.ARTWORK}`)}>LIST</List>
        </>
      )} */}
    </>
  );
}

export default Navigation;

const Nav = styled.div`
  font-size: 15px;
  color: ${(props) => props.theme.color.black.light};
  .nav_title {
    color: ${(props) => props.theme.color.yellow.bold};
    font-size: 40px;
    font-weight: 900;
    padding-top: 10px;
  }
`;

const List = styled.div`
  padding: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 500;
  height: 100px;
  border-bottom: 1px solid ${(props) => props.theme.color.black.bold};
  background-color: ${(props) => props.theme.color.white.bold};
`;
