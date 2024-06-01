import styled from 'styled-components';

type SubTitleType = {
  fontSize?: number;
  description: string;
  onClick?: () => void;
  svgComponent?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
};

const SubTitle = (props: SubTitleType) => {
  return (
    <SubTitleStyle description={props.description} onClick={props.onClick} as={props.as}>
      {props.svgComponent}
      {props.description}
    </SubTitleStyle>
  );
};

export default SubTitle;

const SubTitleStyle = styled.div<SubTitleType>`
  font-size: ${(props) => (props.fontSize ? props.fontSize + 'px;' : '17px;')};
  display: flex;
  align-items: center;
  font-family: ${(props) => props.theme.font.regular};
  color: #494845;
`;
