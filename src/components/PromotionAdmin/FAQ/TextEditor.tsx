import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';

interface ITextEditorProps {
  editorState: EditorState;
  onEditorStateChange: (state: any) => Promise<void>;
}

function TextEditor({ editorState, onEditorStateChange }: ITextEditorProps) {
  // 이미지 업로드 처리 함수
  const uploadImageCallBack = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({ data: { link: e.target?.result as string } });
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  return (
    <Editor
      placeholder='답변을 작성해주세요'
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: ['inline', 'textAlign', 'link', 'image', 'colorPicker'],
        inline: { inDropdown: true, options: ['bold', 'italic', 'underline'] },
        textAlign: { inDropdown: true },
        link: { inDropdown: false },
        image: {
          uploadCallback: uploadImageCallBack,
          previewImage: true,
          alt: { present: true, mandatory: false },
        },
        colorPicker: {
          colors: [
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
          ],
        },
      }}
      localization={{ locale: 'ko' }}
      editorStyle={{
        height: '18rem',
        width: '100%',
        border: '1px solid lightgray',
        padding: '20px',
      }}
    />
  );
}

export default TextEditor;
