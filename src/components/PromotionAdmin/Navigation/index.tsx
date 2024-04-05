import React from 'react'
import styled from 'styled-components';
import { ReactComponent as Home } from '@/assets/images/PA-Navigation/home.svg'; 
import { ReactComponent as Request } from '@/assets/images/PA-Navigation/request.svg'; 
import { ReactComponent as Artwork } from '@/assets/images/PA-Navigation/artwork.svg'; 
import { ReactComponent as PageEdit } from '@/assets/images/PA-Navigation/pageEdit.svg'; 
import { ReactComponent as Statistics } from '@/assets/images/PA-Navigation/statistics.svg'; 
import { ReactComponent as Setting } from '@/assets/images/PA-Navigation/setting.svg'; 
import { ReactComponent as Faq } from '@/assets/images/PA-Navigation/faq.svg'; 
import Links from './Links';

const linksData = [
    {
        path: '/pa-home-test',
        pathName: 'Home',
        svgComponent: <Home />
    },
    {
        path: '/pa-request-test',
        pathName: 'Request',
        svgComponent: <Request />
    },
    {
        path: '/pa-artwork-test',
        pathName: 'Artwork',
        svgComponent: <Artwork />
    },
    {
        path: '/pa-pageEdit-test',
        pathName: 'Page Edit',
        svgComponent: <PageEdit />
    },
    {
        path: '/pa-statistics-test',
        pathName: 'Statistics',
        svgComponent: <Statistics />
    },
    {
        path: '/pa-faq-test',
        pathName: 'Faq',
        svgComponent: <Faq />
    },
    {
        path: '/pa-setting-test',
        pathName: 'Setting',
        svgComponent: <Setting />
    }
];


const index = () => {
  return (
    <div>
        <div>회사 로고</div>
        <LinksContainer>
                {linksData.map((link, index) => (
                    <Links key={index} path={link.path} pathName={link.pathName} svgComponent={link.svgComponent} />
                ))}
        </LinksContainer>
    </div>
  )
}

export default index;

const LinksContainer = styled.div`
    /* 링크 컨테이너에 대한 스타일을 여기에 추가합니다. */
`;