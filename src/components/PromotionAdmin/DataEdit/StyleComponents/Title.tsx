import styled from 'styled-components';

type TitleType = {
  fontSize?: number;
  description: string;
  onClick?: () => void;
  svgComponent?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
};

const Title = (props: TitleType) => {
  return (
    <TitleStyle description={props.description} onClick={props.onClick} as={props.as}>
      {props.svgComponent}
      {props.description}
    </TitleStyle>
  );
};

export default Title;

const TitleStyle = styled.div<TitleType>`
  font-size: ${(props) => (props.fontSize ? props.fontSize + 'px;' : '24px;')};
  display: flex;
  align-items: center;
  font-family: ${(props) => props.theme.font.semiBold};
  color: #494845;
`;
