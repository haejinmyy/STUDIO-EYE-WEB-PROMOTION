import styled from 'styled-components';

type NoticeComponentType = {
  fontSize?: number;
  description: string;
  onClick?: () => void;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
};

const NoticeComponent = (props: NoticeComponentType) => {
  return (
    <NoticeComponentStyle onClick={props.onClick} as={props.as}>
      {props.description}
    </NoticeComponentStyle>
  );
};

export default NoticeComponent;

const NoticeComponentStyle = styled.div<NoticeComponentType>`
  font-size: ${(props) => (props.fontSize ? props.fontSize + 'px;' : '13px;')};
  font-family: ${(props) => props.theme.font.light};
  white-space: pre-wrap;
  line-height: 15px;
`;
