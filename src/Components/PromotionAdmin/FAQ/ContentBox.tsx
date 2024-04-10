import styled from 'styled-components';

export const ContentBox = styled.div`
  position: fixed;
  left: 10rem;
  top: 8rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.color.white.bold};
  border: 0.5px solid ${(props) => props.theme.color.black.light};
  width: 700px;
  height: 80%;
`;
