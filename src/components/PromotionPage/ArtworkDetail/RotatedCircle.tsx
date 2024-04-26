import { theme } from '@/styles/theme';
import { motion } from 'framer-motion';

interface IRotatedCircleProps {
  url: string;
}
function RotatedCircle({ url }: IRotatedCircleProps) {
  // 원의 반지름 설정
  const radius = 50;
  // 원의 둘레 계산
  const circumference = 2 * Math.PI * radius;
  // 선의 길이와 공백을 정의 (예: 선 75%, 공백 25%)
  const strokeLength = circumference * 0.75;
  const gapLength = circumference - strokeLength;

  return (
    <a href={url} target='_blank'>
      <svg width='120' height='120' viewBox='0 0 120 120'>
        <motion.circle
          cx='60' // SVG 중심의 x 좌표
          cy='60' // SVG 중심의 y 좌표
          r={radius} // 반지름
          fill='transparent' // 원 내부 색상
          stroke={theme.color.yellow.bold} // 테두리 색상
          strokeWidth='1' // 테두리 두께
          strokeDasharray={`${strokeLength} ${gapLength}`} // 선의 길이와 공백 설정
          animate={{ rotate: 360, strokeDashoffset: [0, -circumference] }} // 회전과 선 이동 애니메이션 적용
          transition={{
            repeat: Infinity, // 무한 반복
            duration: 3, // 애니메이션 지속 시간
            ease: 'linear', // 일정한 속도
          }}
        />
        <text
          x='50%' // X position at the center
          y='50%' // Y position at the center
          dominantBaseline='middle' // Align text vertically
          textAnchor='middle' // Align text horizontally
          fill={theme.color.white.bold} // Text color
          style={{ userSelect: 'none', pointerEvents: 'none' }} // Prevent text selection and interaction
        >
          WATCH
        </text>
      </svg>
    </a>
  );
}

export default RotatedCircle;
