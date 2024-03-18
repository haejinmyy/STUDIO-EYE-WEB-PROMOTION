import styled from "styled-components";
import { motion } from "framer-motion";

const variants = {
    initial: {
      height: "100vh",
      left: 0,
    },
    animate: {
      left: "100%",
      transition: {
        duration: 1.5,
        ease: [0.87, 0.1, 0.56, 1],
      },
    },
  };
  
  const TransitionBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    inset: 0;
    position: absolute;
  `;
  const DetailBox = styled(motion.div)`
    background-color: black;
    z-index: 100;
    position: relative;
    width: 100%;
  `;
  const DetailTransition = () => {
    return (
      <TransitionBox>
        <DetailBox
            initial="initial"
            animate="animate"
            variants={variants}
        />      
      </TransitionBox>
    );
  };

  export default DetailTransition