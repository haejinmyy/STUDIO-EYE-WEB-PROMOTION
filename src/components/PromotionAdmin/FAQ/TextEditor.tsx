// import { Editor } from 'react-draft-wysiwyg';
// import { EditorState } from 'draft-js';

// interface ITextEditorProps {
//   editorState: EditorState;
//   onEditorStateChange: (state: any) => Promise<void>;
// }

// function TextEditor({ editorState, onEditorStateChange }: ITextEditorProps) {
//   return (
//     <Editor
//       placeholder='답변을 작성해주세요'
//       editorState={editorState}
//       onEditorStateChange={onEditorStateChange}
//       toolbar={{
//         inline: { inDropdown: true },
//         list: { inDropdown: true },
//         textAlign: { inDropdown: true },
//         link: { inDropdown: false },
//         history: { inDropdown: false },
//       }}
//       localization={{ locale: 'ko' }}
//       editorStyle={{
//         height: '18rem',
//         width: '100%',
//         border: '1px solid lightgray',
//         padding: '20px',
//       }}
//     />
//   );
// }

// export default TextEditor;

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
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: false },
        history: { inDropdown: false },
        image: {
          uploadCallback: uploadImageCallBack,
          previewImage: true,
          alt: { present: true, mandatory: false },
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
