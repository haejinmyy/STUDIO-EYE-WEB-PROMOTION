import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import styled from 'styled-components';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface ITextEditorProps {
  editorState: EditorState;
  onEditorStateChange: (state: EditorState) => void;
  attribute: string;
}

interface IEditorWrapperProps {
  attribute: string;
}

function TextColorEditor({ editorState, onEditorStateChange, attribute }: ITextEditorProps) {
  return (
    <EditorWrapper attribute={attribute}>
      <Editor
        placeholder={`${attribute}을(를) 작성해주세요`}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ['colorPicker'],
          colorPicker: {
            colors: textEditorColorPalette,
          },
        }}
        localization={{ locale: 'ko' }}
      />
    </EditorWrapper>
  );
}

export default TextColorEditor;

export const textEditorColorPalette = [
  '#141414',
  '#8A8A8A',
  '#C4C4C4',
  '#FBFBFB',
  '#ffffff',

  '#FF0000',
  '#C40C0C',
  '#FF6500',
  '#FF8A08',
  '#FFA900',
  '#FFF0D1',

  '#800080',
  '#9932CC',
  '#DDA0DD',
  '#850F8D',
  '#C738BD',
  '#E49BFF',

  '#006769',
  '#40A578',
  '#9DDE8B',
  '#E6FF94',
  '#228B22',
  '#32CD32',
  '#ADFF2F',

  '#007BFF',
  '#0056B3',
  '#003366',

  '#FF69B4',
  '#FFB6C1',
  '#FFC0CB',

  '#A52A2A',
  '#D2691E',
  '#8B4513',

  '#FFD700',
  '#FFFF00',
  '#FFFACD',

  'rgba(0, 0, 0, 0)',
];

const EditorWrapper = styled.div<IEditorWrapperProps>`
  width: ${(props) => (props.attribute === 'CEO Introduction' ? '80%' : '100%')};

  .react-draft-wysiwyg-content {
    background-color: transparent !important;
  }

  .rdw-editor-toolbar {
    background-color: #f5f5f5;
    height: 25px;
    align-items: center;
  }
  .rdw-option-wrapper {
    border: none;
    background-color: transparent;
    padding: 1px;
    margin: 0 2px;
  }
  .rdw-option-wrapper:hover {
    background-color: #e0e0e0;
  }
  .rdw-editor-main {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    min-height: ${(props) => (props.attribute === 'CEO Introduction' ? '150px' : '100px')};
    padding: 10px;
    font-family: ${(props) => props.theme.font.light};
    font-size: 14px;
    max-height: 350px;

    /* overflow: scroll; */
  }
`;
