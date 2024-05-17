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

import { ReactComponent as PrevArrowIcon } from '@/assets/images/PP/leftArrow.svg';
import { ReactComponent as NextArrowIcon } from '@/assets/images/PP/rightArrow.svg';

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
                        <PrevArrowIcon width={70} height={70} />
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
                        <NextArrowIcon width={70} height={70} />
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
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.div`
  font-size: 80px;
  font-weight: 800;
  font-family: ${(props) => props.theme.font.bold};
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
  height: 40px;
  font-family: ${(props) => props.theme.font.light};

  .attribute {
    width: 130px;
    font-family: ${(props) => props.theme.font.bold};
  }
`;

const OverviewWrapper = styled(motion.div)`
  position: relative;
  min-height: 65vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  font-family: ${(props) => props.theme.font.bold};
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
  font-family: ${(props) => props.theme.font.semiBold};

  p {
    display: flex;
    justify-content: center;
    font-size: 40px;
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
    font-size: 56px;
    font-weight: 900;
    padding-top: 10px;
    font-family: ${(props) => props.theme.font.bold};
  }
  &:hover {
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
