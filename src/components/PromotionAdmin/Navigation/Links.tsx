import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Props = {
    path: string;
    pathName: string;
    svgComponent: React.ReactNode;
}

const Links = ({path, pathName,svgComponent}:Props) => {
  return (
    <LinkStyle to={path}>
        {svgComponent}
        <Name>{pathName}</Name>
    </LinkStyle>
  )
}

export default Links;

const LinkStyle = styled(Link)`
  
`;

const Name = styled.div`

`;