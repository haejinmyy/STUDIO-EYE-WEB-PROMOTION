import styled from 'styled-components';

export const ContentBox = styled.div`
  position: relative;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px ${(props) => props.theme.color.black.pale};
  width: 40vw;
  min-height: 70vh;
`;
