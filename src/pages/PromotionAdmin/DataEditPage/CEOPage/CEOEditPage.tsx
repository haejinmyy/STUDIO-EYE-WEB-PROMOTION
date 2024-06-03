import { getCEOData } from '@/apis/PromotionAdmin/dataEdit';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { ICEOData } from '@/types/PromotionAdmin/dataEdit';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import TextEditor from '@/components/PromotionAdmin/FAQ/TextEditor';
import { IEditorData } from '@/types/PromotionAdmin/faq';
import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import { useNavigate } from 'react-router-dom';
import TextColorEditor from '@/components/PromotionAdmin/DataEdit/TextColorEditor';
import FileButton from '@/components/PromotionAdmin/DataEdit/StyleComponents/FileButton';
import {
  DATAEDIT_NOTICE_COMPONENTS,
  DATAEDIT_TITLES_COMPONENTS,
} from '../../../../components/PromotionAdmin/DataEdit/Company/StyleComponents';

interface IFormData {
  name: string;
}

const CEOEditPage = () => {
  const navigator = useNavigate();
  const { data, isLoading, error } = useQuery<ICEOData, Error>(['ceo', 'id'], getCEOData);
  const [putData, setPutData] = useState({
    request: {
      name: data?.name,
      introduction: data?.introduction,
    },
    file: data ? data?.imageUrl : '',
  });
  const [imgChange, setImgChange] = useState(false);

  const { register, handleSubmit } = useForm<IFormData>({
    defaultValues: {
      name: data?.name,
    },
  });

  const [editorState, setEditorState] = useState(() => {
    const blocksFromHtml = data && htmlToDraft(data.introduction);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });
  const [blocks, setBlocks] = useState<IEditorData[]>([]);

  const updateTextDescription = async (state: any) => {
    await setEditorState(state);
    setBlocks(convertToRaw(editorState.getCurrentContent()).blocks);
  };

  const onValid = (data: IFormData) => {
    handleSaveClick(data);
  };
  const [isInvalid, setInvalid] = useState(true);

  const handleSaveClick = async (data: IFormData) => {
    const formData = new FormData();

    formData.append(
      'request',
      new Blob(
        [
          JSON.stringify({
            name: data.name,
            introduction: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          }),
        ],
        { type: 'application/json' },
      ),
    );

    if (putData.request.name === undefined) {
      alert('이름을 입력해주세요');
      setInvalid(true);
    } else if (blocks === undefined || null || blocks.length === 0) {
      alert('소개를 입력해주세요');
      setInvalid(true);
    } else if (putData.file === undefined) {
      alert('파일을 업로드해주세요');
      setInvalid(true);
    } else {
      setInvalid(false);
    }
    if (!isInvalid) {
      if (window.confirm('수정하시겠습니까?')) {
        if (imgChange) {
          // 이미지를 변경한 경우
          const file = await urlToFile(putData.file, 'CEOLogo.png');
          if (file) {
            formData.append('file', file);
          } else {
            console.error('로고 이미지 가져오기 실패');
          }
          axios
            .put(`${PROMOTION_BASIC_PATH}/api/ceo`, formData)
            .then((response) => {
              console.log('CEO data updated:', response);
              alert('수정되었습니다.');
              navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_CEO}`);
            })
            .catch((error) => console.error('Error updating CEO:', error));
        } else {
          // 이미지를 변경하지 않은 경우
          axios
            .put(`${PROMOTION_BASIC_PATH}/api/ceo/modify`, formData)
            .then((response) => {
              console.log('CEO updated:', response);
              alert('수정되었습니다.');
              navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_CEO}`);
            })
            .catch((error) => console.error('Error updating CEO:', error));
        }
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPutData((prevData) => ({
          ...prevData,
          file: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
      setImgChange(true);
    }
  };

  async function urlToFile(url: string, fileName: string): Promise<File> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      console.log(blob);
      return new File([blob], fileName);
    } catch (error) {
      console.error('Error URL to file:', error);
      throw error;
    }
  }

  const handleDelete = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .delete(`${PROMOTION_BASIC_PATH}/api/ceo`)
        .then((response) => {})
        .catch((error) => console.log(error));
      alert('삭제되었습니다.');
      navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_CEO}`);
    }
  };

  if (isLoading) return <>is Loading..</>;
  if (error) return <>{error.message}</>;
  return (
    <Wrapper>
      {data && (
        <form onSubmit={handleSubmit(onValid)}>
          <ContentBlock>
            <ButtonWrapper>
              <Button onClick={() => handleDelete()}>삭제하기</Button>
            </ButtonWrapper>
            <InputWrapper>
              <InputTitle>
                <p>Name</p>
              </InputTitle>
              <input
                {...register('name', {
                  required: '이름 입력해주세요',
                })}
                placeholder='이름 입력해주세요'
              />
              <InputTitle>
                <p>Introduction</p>
              </InputTitle>
              <TextColorEditor
                editorState={editorState}
                onEditorStateChange={updateTextDescription}
                attribute='CEO Introduction'
              />
              <InputImgWrapper>
                <Box>
                  <InputTitle>{DATAEDIT_TITLES_COMPONENTS.CEOIMG}</InputTitle>
                  {DATAEDIT_NOTICE_COMPONENTS.IMAGE.CEOIMG}
                  {DATAEDIT_NOTICE_COMPONENTS.COLOR.CEOIMG}
                  <LogoWrapper>
                    <FileButton id='CEOImgFile' description='CEO Image Upload' onChange={handleImageChange} />
                    <ImgBox>
                      <img src={putData.file} />
                    </ImgBox>
                  </LogoWrapper>
                </Box>
              </InputImgWrapper>
              <ButtonWrapper>
                <Button>등록하기</Button>
              </ButtonWrapper>
            </InputWrapper>
          </ContentBlock>
        </form>
      )}
    </Wrapper>
  );
};

export default CEOEditPage;

export const Wrapper = styled.div`
  display: flex;
  input,
  textarea {
    outline: none;
  }

  input:focus,
  textarea:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }
`;

export const ContentBlock = styled.div<{ width?: number; height?: number }>`
  padding: 25px;
  background-color: ${(props) => props.theme.color.white.pale};
  position: relative;
  box-shadow: 2px 2px 5px 0.3px ${(props) => props.theme.color.black.pale};
  margin-bottom: 30px;
  margin-right: 30px;

  border-radius: 4px;
  width: ${(props) => (props.width ? props.width + 'px;' : '40vw;')};
  height: ${(props) => (props.height ? props.height + 'px;' : 'fit-content;')};
`;

export const InputWrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.color.white.light};
  flex-direction: column;
  font-family: ${(props) => props.theme.font.regular};
  p {
    font-size: 18px;
    padding-top: 7px;
    padding-bottom: 3px;
  }
  input {
    outline: none;
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    padding-left: 10px;
    width: 30%;
    height: 30px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  input:focus,
  textarea:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }
`;

export const InputImgWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const InputTitle = styled.div`
  display: flex;
  padding-top: 20px;
  align-items: center;
  height: 40px;
  svg {
    cursor: pointer;
    margin-right: 10px;
  }
`;
export const Box = styled.div`
  width: 100%;
`;

export const ImgBox = styled.div`
  display: flex;
  height: 200px;
  width: 80%;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
  border-radius: 5px;
  margin-top: 15px;
`;
export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  input {
    display: none;
  }

  img {
    max-width: 300px;
    max-height: 150px;
    margin-bottom: 10px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.5px #c6c6c6;
  padding: 0.4rem 1.4rem;
  border-radius: 0.2rem;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light}; /* 버튼 호버 시 색상 조정 */
  }
`;
