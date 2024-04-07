import React, {useCallback, useRef, useState} from "react";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  border-bottom: 2px solid black;
  width: 90%;
  margin-bottom: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;

  height: 2.5rem;
  margin: 0 1rem;
  
  font-size: 1.25rem;
  font-weight: 600;
  
  cursor: pointer;
`;

const Button = styled.div`
  top: 8px;
  right: 8px;
  font-size: 1rem;
  position: absolute;
`;

const ContentsWrapper = styled.div`
  height: 0;
  width: 100%;
  overflow: hidden;
  transition: height 0.35s ease;
`;

const Contents = styled.div`
    padding-top: 0.5rem;
`;
const Img = styled.img`
    width: 100%;
`;

export default function MyAccordion({index,title,contents}) {
    const parentRef = useRef(null);
    const childRef = useRef(null);
    const [isCollapse, setIsCollapse] = useState(false);

    const handleButtonClick = useCallback(
        event => {
            event.stopPropagation();
            if (parentRef.current === null || childRef.current === null) {
                return;
            }
            if (parentRef.current.clientHeight > 0) {
                parentRef.current.style.height = "0";
            } else {
                parentRef.current.style.height = `${childRef.current.clientHeight}px`;
            }
            setIsCollapse(!isCollapse);
        },
        [isCollapse]
    );
    const parentRefHeight = parentRef.current?.style.height ?? '0px';

    return (
        <Container>
            <Header onClick={handleButtonClick}>
                Q{index}. {title}
            </Header>
            <ContentsWrapper ref={parentRef}>
                <Contents ref={childRef}><Img src={contents} /></Contents>
            </ContentsWrapper>
        </Container>
    )
};