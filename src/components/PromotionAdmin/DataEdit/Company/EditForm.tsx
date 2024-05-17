import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
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

interface IFormData {
  mainOverview: string;
  commitment: string;
  address: string;
  fax: string;
  introduction: string;
  phone: string;
  detailInformation: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  };
}

const EditForm = () => {
  const navigator = useNavigate();
  const { data, isLoading, error } = useQuery<ICompanyData, Error>(['company', 'id'], getCompanyData);
  const [putData, setPutData] = useState({
    request: {
      address: data?.address,
      phone: data?.phone,
      fax: data?.fax,
      //   mainOverview: data?.mainOverview,
      commitment: data?.commitment,
      introduction: data?.introduction,
      detailInformation: {
        additionalProp1: data?.detailInformation.additionalProp1,
        additionalProp2: data?.detailInformation.additionalProp2,
        additionalProp3: data?.detailInformation.additionalProp3,
      },
    },
    logoImageUrl: data ? data?.logoImageUrl : '',
    sloganImageUrl: data ? data?.sloganImageUrl : '',
  });

  const { register, handleSubmit } = useForm<IFormData>({
    defaultValues: {
      address: data?.address,
      phone: data?.phone,
      fax: data?.fax,
      mainOverview: data?.mainOverview,
      commitment: data?.commitment,
      introduction: data?.introduction,
      detailInformation: {
        additionalProp1: data?.detailInformation.additionalProp1,
        additionalProp2: data?.detailInformation.additionalProp2,
        additionalProp3: data?.detailInformation.additionalProp3,
      },
    },
  });

  const [editorState, setEditorState] = useState(() => {
    const blocksFromHtml = data && htmlToDraft(data.mainOverview);
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

  const [isInvalid, setInvalid] = useState(true);
  const onValid = (data: IFormData) => {
    console.log(data);
    handleSaveClick(data);
  };

  const handleSaveClick = async (data: IFormData) => {
    const formData = new FormData();

    formData.append(
      'request',
      new Blob(
        [
          JSON.stringify({
            address: data.address,
            phone: data.phone,
            fax: data.fax,
            mainOverview: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            commitment: data.commitment,
            introduction: data.introduction,
            detailInformation: {
              additionalProp1: data.detailInformation.additionalProp1,
              additionalProp2: data.detailInformation.additionalProp2,
              additionalProp3: data.detailInformation.additionalProp3,
            },
          }),
        ],
        { type: 'application/json' },
      ),
    );

    // 이미지를 변경했는지 확인하고 추가
    const logoFile = await urlToFile(putData.logoImageUrl, 'Logo.png');
    formData.append('logoImageUrl', logoFile);
    const sloganFile = await urlToFile(putData.sloganImageUrl, 'Slogan.png');
    formData.append('sloganImageUrl', sloganFile);

    if (putData.logoImageUrl === '' || putData.sloganImageUrl === '') {
      alert('파일을 업로드해주세요');
      setInvalid(true);
    } else {
      setInvalid(false);
    }

    if (window.confirm('수정하시겠습니까?')) {
      axios
        .post(`${PROMOTION_BASIC_PATH}/api/company/information`, formData)
        .then((response) => {
          console.log('Company Information posted:', response);
          alert('수정되었습니다.');
          navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_COMPANY}`);
        })
        .catch((error) => console.error('Error updating partner:', error));
    }
  };

  const handleLogoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const logoImageUrl = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPutData((prevData) => ({
          ...prevData,
          logoImageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(logoImageUrl);
    }
  };

  const handleSloganImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const sloganImageUrl = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPutData((prevData) => ({
          ...prevData,
          sloganImageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(sloganImageUrl);
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

  if (isLoading) return <>is Loading..</>;
  if (error) return <>{error.message}</>;
  return (
    <>
      <Wrapper>
        {data && (
          <form onSubmit={handleSubmit(onValid)}>
            <ContentBlock>
              <Title>Basic</Title>
              <InputWrapper>
                <p>Address</p>
                <input
                  {...register('address', {
                    required: '주소를 입력해주세요',
                  })}
                  placeholder='주소를 입력해주세요'
                />
                <p>Phone Number</p>
                <input
                  {...register('phone', {
                    required: '전화번호를 입력해주세요',
                  })}
                  placeholder='전화번호를 입력해주세요'
                />
                <p>Fax Number</p>
                <input
                  {...register('fax', {
                    required: '팩스번호를 입력해주세요',
                  })}
                  placeholder='팩스번호를 입력해주세요'
                />
              </InputWrapper>
            </ContentBlock>

            <ContentBlock>
              <Title>Introduction</Title>
              <InputWrapper>
                <p>Main Overview</p>
                <TextEditor editorState={editorState} onEditorStateChange={updateTextDescription} />
                <p>Commitment</p>
                <input
                  {...register('commitment', {
                    required: 'commitment를 입력해주세요',
                  })}
                  placeholder='commitment를 입력해주세요'
                />
                <p>Introduction</p>
                <input
                  {...register('introduction', {
                    required: 'introduction를 입력해주세요',
                  })}
                  placeholder='introduction를 입력해주세요'
                />
              </InputWrapper>
            </ContentBlock>

            <ContentBlock>
              <Title>Detail</Title>
              <InputWrapper>
                <p>1</p>
                <input
                  {...register('detailInformation.additionalProp1', {
                    required: 'additionalProp1를 입력해주세요',
                  })}
                  placeholder='additionalProp1를 입력해주세요'
                />
                <p>2</p>
                <input
                  {...register('detailInformation.additionalProp2', {
                    required: 'additionalProp2를 입력해주세요',
                  })}
                  placeholder='additionalProp2를 입력해주세요'
                />
                <p>3</p>
                <input
                  {...register('detailInformation.additionalProp3', {
                    required: 'additionalProp3를 입력해주세요',
                  })}
                  placeholder='additionalProp3를 입력해주세요'
                />
              </InputWrapper>
            </ContentBlock>

            <ContentBlock>
              <Title>Logo & Slogan</Title>
              <InputWrapper>
                <LogoWrapper>
                  <img src={putData.logoImageUrl} />
                  <label htmlFor='logoFile'>
                    <div>Logo Upload</div>
                    <input id='logoFile' type='file' accept='image/*' onChange={handleLogoImageChange} />
                  </label>
                </LogoWrapper>
                <LogoWrapper>
                  <img src={putData.sloganImageUrl} />
                  <label htmlFor='sloganFile'>
                    <div>Slogan Upload</div>
                    <input id='sloganFile' type='file' accept='image/*' onChange={handleSloganImageChange} />
                  </label>
                </LogoWrapper>
              </InputWrapper>
            </ContentBlock>
            <button>저장하기</button>
          </form>
        )}
      </Wrapper>
    </>
  );
};

export default EditForm;

const Wrapper = styled.div`
  width: 800px;
`;
const ContentBlock = styled.div`
  display: flex;
  /* background-color: pink; */
  padding: 25px 10px;
  /* border-top: 1px solid ${(props) => props.theme.color.black.pale}; */
  border-bottom: 2px solid ${(props) => props.theme.color.black.pale};
`;
const Title = styled.div`
  font-size: 22px;
  font-family: 'pretendard-medium';
  width: 300px;
`;
const InputWrapper = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
  font-family: 'pretendard-light';
  p {
    font-size: 18px;
    padding-top: 7px;
    padding-bottom: 3px;
  }
  input {
    height: 30px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  div {
    cursor: pointer;
    border: none;
    background-color: ${(props) => props.theme.color.white.bold};
    box-shadow: 1px 1px 4px 0.1px #c6c6c6;
    padding: 0.4rem 1.4rem;
    border-radius: 0.2rem;
    transition: 0.2s;
    width: 130px;
    display: flex;
    justify-content: center;
    font-weight: 700;
    margin-right: 20px;

    &:hover {
      background-color: ${(props) => props.theme.color.yellow.light};
    }
  }

  input {
    display: none;
  }

  img {
    width: 200px;
    margin-bottom: 10px;
  }
`;
