import styled from 'styled-components';

type InnerHTMLType = {
  fontSize?: number;
  description: string;
  onClick?: () => void;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
};

const InnerHTML = (props: InnerHTMLType) => {
  return (
    <InnerHTMLStyle onClick={props.onClick} as={props.as} dangerouslySetInnerHTML={{ __html: props.description }} />
  );
};

export default InnerHTML;

const InnerHTMLStyle = styled.div<InnerHTMLType>`
  font-size: ${(props) => (props.fontSize ? props.fontSize + 'px;' : '15px;')};
  font-family: ${(props) => props.theme.font.light};
  white-space: pre-wrap;
  line-height: 22px;
`;
