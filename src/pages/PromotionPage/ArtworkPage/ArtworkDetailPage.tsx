import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { PP_ROUTES_CHILD } from '@/constants/routerConstants';
import styled from 'styled-components';
import { IArtworksData } from '@/types/PromotionPage/artwork';
import { useQuery } from 'react-query';
import { getArtworkData } from '@/apis/PromotionPage/artwork';
import { motion, useTransform, useScroll } from 'framer-motion';
import ScrollAnimatedComponent from '@/components/PromotionPage/ArtworkDetail/ScrollAnimatedComponent';
import RotatedCircle from '@/components/PromotionPage/ArtworkDetail/RotatedCircle';
import ImageSlider from '@/components/PromotionPage/ArtworkDetail/ImageSlider';
import { NavWrapper } from '@/components/PromotionPage/ArtworkDetail/Components';
import { useEffect } from 'react';

function ArtworkDetailPage() {
  const navigator = useNavigate();
  const artworkDetailMatch = useMatch(`${PP_ROUTES_CHILD.ARTWORK}/:id`);
  const { data, isLoading } = useQuery<IArtworksData>(['artwork', 'id'], getArtworkData);

  const clickedArtwork =
    artworkDetailMatch?.params.id && data?.data.find((artwork) => String(artwork.id) === artworkDetailMatch.params.id);

  // animation
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, (v) => v * -100);
  const translateX = useTransform(scrollYProgress, (v) => v * 200);

  // navigation
  const dataLength = data?.data ? data.data.length : 0;
  const artworkIndex = Number(artworkDetailMatch?.params.id);
  const currentIndex = data?.data ? data?.data.findIndex((artwork) => artwork.id === artworkIndex) : 0;
  const prevIndex = data && currentIndex === 0 ? null : data?.data[currentIndex - 1].id;
  const nextIndex = data && currentIndex === dataLength - 1 ? null : data?.data[currentIndex + 1].id;

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]); // pathname이 변경될 때마다 실행

    return null;
  }

  return (
    <>
      {isLoading ? (
        <div> is Loading... </div>
      ) : (
        <>
          {clickedArtwork && (
            <>
              <ScrollToTop />
              <Wrapper>
                <Thumbnail bgPhoto={clickedArtwork.mainImg}>
                  <Title>{clickedArtwork.name}</Title>
                  <InfoWrapper>
                    <Info
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        ease: 'easeInOut',
                        duration: 1,
                        y: { duration: 1 },
                      }}
                    >
                      <p className='attribute'>Client</p> <p>{clickedArtwork.client}</p>
                    </Info>
                    <Info
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        ease: 'easeInOut',
                        duration: 2,
                        y: { duration: 2 },
                      }}
                    >
                      <p className='attribute'>Category</p> <p>{clickedArtwork.category}</p>
                    </Info>
                    <Info
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        ease: 'easeInOut',
                        duration: 3,
                        y: { duration: 3 },
                      }}
                    >
                      <p className='attribute'>Date</p> <p>{clickedArtwork.date}</p>
                    </Info>
                  </InfoWrapper>
                </Thumbnail>
                <OverviewWrapper>
                  <Overview1 style={{ x }} drag='x' dragSnapToOrigin>
                    OVERVIEW
                  </Overview1>
                  <ScrollAnimatedComponent article={clickedArtwork.overView} />
                  <Overview2 style={{ translateX }} drag='x' dragSnapToOrigin>
                    OVERVIEW
                  </Overview2>
                </OverviewWrapper>
                <ContentWrapper>
                  <Img>
                    <ImageSlider projectImages={clickedArtwork?.projectImages} />
                  </Img>
                  <Content>
                    <p>
                      Do you want to see the <span>&nbsp;project</span>?
                    </p>
                    <CircleWrapper>
                      <RotatedCircle label='WATCH' link={clickedArtwork.link} />
                    </CircleWrapper>
                  </Content>
                </ContentWrapper>

                {isLoading ? (
                  <div>is Loading... </div>
                ) : (
                  <>
                    {currentIndex === 0 ? null : (
                      <NavWrapper
                        onClick={() => {
                          navigator(`/${PP_ROUTES_CHILD.ARTWORK}/${prevIndex}`);
                        }}
                      >
                        <svg
                          width='100'
                          height='80'
                          viewBox='0 0 100 80'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
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
                        <svg
                          width='100'
                          height='80'
                          viewBox='0 0 100 80'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
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

                    <List
                      onClick={() => {
                        navigator(`/${PP_ROUTES_CHILD.ARTWORK}`);
                      }}
                    >
                      LIST
                    </List>
                  </>
                )}
              </Wrapper>
            </>
          )}
        </>
      )}
    </>
  );
}

export default ArtworkDetailPage;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.color.black.bold};
  height: max-content;
`;

const Thumbnail = styled.div<{ bgPhoto: string }>`
  z-index: 99;
  position: relative;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.div`
  font-size: 80px;
  font-weight: 800;
  color: ${(props) => props.theme.color.white.bold};
`;

const InfoWrapper = styled.div`
  color: ${(props) => props.theme.color.white.bold};
  font-size: 20px;
  position: absolute;
  bottom: 50px;
  left: 50px;
`;

const Info = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  width: 250px;
  height: 40px;
  .attribute {
    font-weight: 900;
  }
`;

const OverviewWrapper = styled(motion.div)`
  position: relative;
  height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  color: ${(props) => props.theme.color.white.bold};
  background-color: ${(props) => props.theme.color.black.bold};
`;
const Overview1 = styled(motion.div)`
  position: absolute;
  font-size: 180px;
  font-weight: 900;
  top: -40px;
  right: 0px;
  color: rgba(255, 255, 255, 0.026);
`;

const Overview2 = styled(motion.div)`
  position: absolute;
  font-size: 180px;
  font-weight: 900;
  bottom: -50px;
  left: 0px;
  color: rgba(255, 255, 255, 0.026);
`;

const ContentWrapper = styled.div`
  display: flex;
  height: 55vh;
`;

const Img = styled.div`
  width: 47vw;
`;

const Content = styled.div`
  position: relative;
  width: 53vw;
  color: ${(props) => props.theme.color.white.bold};
  p {
    display: flex;
    justify-content: center;
    font-size: 40px;
    font-weight: 800;
    padding-top: 100px;
    padding-bottom: 100px;
  }
  span {
    color: ${(props) => props.theme.color.yellow.bold};
  }
`;

const CircleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

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
  cursor: pointer;
  padding: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 500;
  height: 100px;
  color: ${(props) => props.theme.color.black.bold};
  border-bottom: 1px solid ${(props) => props.theme.color.black.bold};
  background-color: ${(props) => props.theme.color.white.bold};
`;
