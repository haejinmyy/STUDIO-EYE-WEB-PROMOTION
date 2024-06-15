import { theme } from '@/styles/theme';
import styled from 'styled-components';

type CheckBoxType = {
  width?: number;
  height?: number;
  fontSize?: number;
  className: string;
  selected: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  svgComponent?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
};

const CheckBox = (props: CheckBoxType) => {
  return (
    <CheckBoxStyle
      selected={props.selected}
      onClick={props.onClick}
      className={`${props.className} ${props.selected ? 'selected' : ''}`}
    >
      {props.children}
    </CheckBoxStyle>
  );
};

export default CheckBox;

const CheckBoxStyle = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  width: 120px;
  height: 40px;
  font-size: 14px;
  font-family: ${(props) => props.theme.font.regular};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  background-color: ${(props) => (props.selected ? theme.color.yellow.light : 'none')};
`;
