import React, { useRef } from 'react';
import artwork from '@/assets/images/mockup/test3.jpg';
import ArtworkList from './testesd';
import styled from 'styled-components';
import { motion, MotionValue, useScroll, useSpring, useTransform } from 'framer-motion';

const mock = [
  {
    backgroundImg: artwork,
    client: 'Netflix Korea',
    title: '국대: 로드 투 카타르',
  },
  {
    backgroundImg: artwork,
    client: 'Netflix Korea',
    title: '홍보하러 온 건 아닌데',
  },
  {
    backgroundImg: artwork,
    client: 'Netflix Korea',
    title: '국대: 로드 투 카타르',
  },
  {
    backgroundImg: artwork,
    client: 'Netflix Korea',
    title: '홍보하러 온 건 아닌데',
  },
  {
    backgroundImg: artwork,
    client: 'Netflix Korea',
    title: '홍보하러 온 건 아닌데',
  },
];

// const Slide3 = () => {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001,
//   });

//   return (
//     <>
//       {mock.map((i) => (
//         <ArtworkList backgroundImg={i.backgroundImg} clientName={i.client} title={i.title} />
//       ))}
//       <motion.div className='progress' style={{ scaleX }} />
//     </>
//   );
// };

// export default Slide3;

// const Container = styled.div``;
// function useParallax(value: MotionValue<number>, distance: number) {
//   return useTransform(value, [0, 1], [-distance, distance]);
// }

// function Image({ id }: { id: number }) {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref });
//   const y = useParallax(scrollYProgress, 300);

//   return (
//     <Section>
//       <div ref={ref}>
//         <img src={artwork} alt='A London skyscraper' />
//       </div>
//       <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
//     </Section>
//   );
// }

// export default function Slide3() {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001,
//   });

//   return (
//     <>
//       {[1, 2, 3, 4, 5].map((image) => (
//         <Image id={image} />
//       ))}
//       <motion.div className='progress' style={{ scaleX }} />
//     </>
//   );
// }

// const Section = styled.div`
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   scroll-snap-align: center;
//   perspective: 500px;
// `;
// Photos from https://citizenofnowhe.re/lines-of-the-city

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section>
      <div ref={ref}>
        <img src={artwork} alt='A London skyscraper' />
      </div>
      <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
    </section>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {[1, 2, 3, 4, 5].map((image) => (
        <Image id={image} />
      ))}
      <motion.div className='progress' style={{ scaleX }} />
    </>
  );
}
