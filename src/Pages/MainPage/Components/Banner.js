import styled, {keyframes} from 'styled-components';

const swipeAnimation = keyframes`
  0% {
    transform: translate(0);
  }
  100% {
    transform: translate(-100%);
  }
`;

const ImageDiv = styled.div`
    max-width: 150px;
    height: 10rem;
    padding: 0 15px;
    object-fit: cover;
    margin: 10px;
  `;
const Image = styled.img`
     &:last-of-type {
    padding-left: 0;
     }

`;
  
const Inner = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 8rem;
    margin-top: 20px;
    margin-bottom: 50px;
`;
const Wrapper = styled.div`
    position: absolute;
    display: flex;
`
  
const Section = styled.section`
    display: flex;
    animation: ${swipeAnimation} var(--speed) linear infinite backwards;
`;
  

  
const Banner = ({ images, speed }) => {
    return (
        <Inner>
            <Wrapper>
                <Section style={{ "--speed": `${speed}ms` }}>
                    {images.map(({ id, image }) => (
                    <ImageDiv key={id}>
                        <Image src={image} alt={id} />
                    </ImageDiv>
                    ))}
                </Section>
                <Section style={{ "--speed": `${speed}ms` }}>
                    {images.map(({ id, image }) => (
                    <ImageDiv key={id}>
                        <Image src={image} alt={id} />
                    </ImageDiv>
                    ))}
                </Section>
                <Section style={{ "--speed": `${speed}ms` }}>
                    {images.map(({ id, image }) => (
                    <ImageDiv key={id}>
                        <Image src={image} alt={id} />
                    </ImageDiv>
                    ))}
                </Section>
            </Wrapper>
        </Inner>
    );
  };
export default Banner;