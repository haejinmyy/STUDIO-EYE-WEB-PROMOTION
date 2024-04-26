import { useLocation, useNavigate } from 'react-router-dom';
import { PP_ROUTES_CHILD } from '@/constants/routerConstants';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '@/styles/theme';
import { useEffect } from 'react';

interface IArtworkCardProps {
  id: number;
  name: string;
  client: string;
  mainImg: string;
}

function ArtworkCard({ id, name, client, mainImg }: IArtworkCardProps) {
  const navigator = useNavigate();
  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get('category');

  useEffect(() => {
    console.log(`Selected category ID: ${categoryId}`);
  }, [categoryId]);

  return (
    <ArtworkItem
      onClick={() => navigator(`/${PP_ROUTES_CHILD.ARTWORK}/${id}`)}
      variants={itemVariants}
      initial='initial'
      whileHover='hover'
    >
      <ArtworkImg variants={imgVariants(mainImg)} ArtworkPhoto={mainImg} />
      <Info>
        <motion.span variants={spanVariants} className='info_client'>
          {client}
        </motion.span>
        <motion.span variants={spanVariants} className='info_name'>
          {name}
        </motion.span>
      </Info>
    </ArtworkItem>
  );
}

export default ArtworkCard;

const itemVariants = {
  hover: {
    transition: {
      when: 'beforeChildren',
      // staggerChildren: 0.1,
    },
  },
};

const spanVariants = {
  hover: {
    color: `${theme.color.symbol}`,
  },
};

const imgVariants = (ArtworkPhoto: string) => ({
  hover: {
    background: `linear-gradient(rgba(255, 169, 2, 0.4), rgba(255, 169, 2, 0.4)), url(${ArtworkPhoto})`,
    backgroundSize: 'cover', // 이미지 크기 조정
    backgroundPosition: 'center', // 이미지 위치 조정
    borderRadius: '0 150px 0 0', // 오른쪽 상단 모서리를 둥글게 설정

    // transition: {
    //   duration: 0.3,
    //   ease: 'easeInOut',
    //   backgroundSize: { duration: 0.3, ease: 'easeInOut' },
    // },
  },
});

const ArtworkItem = styled(motion.div)`
  cursor: pointer;
  height: fit-content;
`;

const ArtworkImg = styled(motion.div)<{ ArtworkPhoto: string }>`
  width: 400px;
  height: 400px;
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${(props) => props.ArtworkPhoto});
`;

const Info = styled(motion.div)`
  padding-top: 10px;
  .info_client {
    display: block;
    padding-bottom: 5px;
    font-size: 20px;
    color: ${(props) => props.theme.color.black.light};
    padding: 10px 0 8px 0;
  }

  .info_name {
    font-size: 27px;
    color: ${(props) => props.theme.color.white.bold};
  }
`;
