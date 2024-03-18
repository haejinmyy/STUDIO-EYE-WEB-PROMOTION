import { useEffect } from "react";
import styled, {css} from "styled-components";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Title = styled.div`
  margin: 80px;
// props 이용하여 여러곳에서 사용 가능
  ${(props) =>
    props.mainlogo &&
    css`
      font-size: 9rem;
      margin-left : 80px;
      font-weight: 500;
    `}
  ${(props) =>
    props.about &&
    css`
      font-size: 1.6rem;
      font-weight: 410;
      margin-top: 10px;
    `}
    ${(props) =>
    props.more &&
    css`
      font-size: 1.3rem;
      font-weight: 410;
      margin:5px;
    `}

    ${(props) =>
    props.contact &&
    css`
      font-size: 7rem;
      font-weight: 450;
      margin-left: 80px;

    `}
  
    ${(props) =>
    props.detailTitle &&
    css`
      font-size: 70px;
      font-weight: 500;
      margin-top : 50px;
      margin-top: 30vh;
      margin-left: 20%;

    `}
  
`;

const Word = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25em;
  white-space: nowrap;
`;

const Character = styled(motion.span)`
  display: inline-block;
  margin-right: -0.05em;
`;

const characterAnimation = {
  hidden: {
    opacity: 0,
    y: `0.25em`,
  },
  visible: {
    opacity: 1,
    y: `0em`,
    transition: {
      duration: 1,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};


export default function LetterAnimation({ text, customEase, ...props }) {  
  const ctrls = useAnimation();
  
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  
  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
    if (!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);
  //props로 about의 customEase를 받아서 속도조정
  if (customEase) {
    characterAnimation.visible.transition.ease = customEase;
  }
  const wordAnimation = {
    hidden: {},
    visible: {},
  };

  
  return (
    <Title {...props} aria-label={text} role="heading">
      {text.split(" ").map((word, index) => {
        return (
          <Word
            ref={ref}
            aria-hidden="true"
            key={index}
            initial="hidden"
            animate={ctrls}
            variants={wordAnimation}
            transition={{
              delayChildren: index * 0.25,
              staggerChildren: 0.05,
            }}
          >
            {word.split("").map((character, index) => {
              return (
                <Character
                  aria-hidden="true"
                  key={index}
                  variants={characterAnimation}
                >
                  {character}
                </Character>
              );
            })}
          </Word>
        );
      })}
    </Title>
  );
}