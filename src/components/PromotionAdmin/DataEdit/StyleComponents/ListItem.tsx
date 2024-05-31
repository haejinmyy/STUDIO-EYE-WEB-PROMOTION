import styled from 'styled-components';

type ListItemType = {
  key: number;
  description: string;
  is_posted: boolean;
  fontSize?: number;
  onClick?: () => void;
  selected?: boolean;
  svgComponent?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
};

const ListItem = (props: ListItemType) => {
  return (
    <ListItemStyle onClick={props.onClick} as={props.as}>
      <DescriptionWrapper>{props.description}</DescriptionWrapper>
      <SVGWrapper> {props.svgComponent}</SVGWrapper>
    </ListItemStyle>
  );
};

export default ListItem;

const ListItemStyle = styled.div<ListItemType>`
  padding: 0 20px;
  margin-bottom: 3px;
  height: 45px;
  cursor: pointer;
  font-size: ${(props) => (props.fontSize ? props.fontSize + 'px;' : '15px;')};
  font-family: ${(props) => props.theme.font.regular};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 2px 5px 0.3px ${(props) => props.theme.color.black.pale};
`;

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SVGWrapper = styled.div`
  display: flex;
  align-items: center;
`;
