import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { IEditorData } from '@/types/PromotionAdmin/faq';
import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import { useNavigate } from 'react-router-dom';
import TextColorEditor from '../TextColorEditor';

import { ReactComponent as DeleteIcon } from '@/assets/images/PA/minusIcon.svg';
import { ReactComponent as AddedIcon } from '@/assets/images/PA/plusIcon.svg';
import HoverInfo from './HoverInfo';
import { COMPANY_COLUMNS } from './CompanyInfo';
import {
  Wrapper,
  ContentBlock,
  TitleWrapper,
  InputWrapper,
  InputImgWrapper,
  InputTitle,
  ImgBox,
  Button,
  LogoWrapper,
  SaveButton,
  DetailItem,
  DetailTitleInputWrapper,
  Form,
  Box,
  LeftContentWrapper,
  RightContentWrapper,
} from './CompanyFormStyleComponents';

interface IFormData {
  mainOverview?: string;
  commitment?: string;
  address?: string;
  fax?: string;
  introduction?: string;
  phone?: string;
  detailInformation: { key: string; value: string }[];
}

const InputForm = () => {
  const navigator = useNavigate();
  const [putData, setPutData] = useState({
    request: {
      address: '',
      phone: '',
      fax: '',
      mainOverview: '',
      commitment: '',
      introduction: '',
      detailInformation: '',
    },
    logoImageUrl: '',
    sloganImageUrl: '',
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormData>();

  // 글자수 확인
  const watchFields = watch('detailInformation');
  const INPUT_MAX_LENGTH = {
    BASIC_ADDRESS: 10,
    BASIC_PHONE: 10,
    BASIC_FAX: 10,
    DETAIL_TITLE: 15,
    DETAIL_CONTENT: 100,
  };

  // detail 요소 추가 삭제
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'detailInformation',
  });

  // detail 요소 삭제
  const safeRemove = (index: number) => {
    if (fields.length > 1 && window.confirm('삭제하시겠습니까?')) {
      remove(index);
    } else {
      alert('Detail 항목은 최소 1개 이상 등록되어야 합니다.');
    }
  };

  const [mainOverviewState, setMainOverviewState] = useState(EditorState.createEmpty());
  const [commitmentState, setCommitmentState] = useState(EditorState.createEmpty());
  const [introductionState, setIntroductionState] = useState(EditorState.createEmpty());

  const [blocks, setBlocks] = useState<IEditorData[]>([]);

  const updateMainOverview = async (state: any) => {
    await setMainOverviewState(state);
    setBlocks(convertToRaw(mainOverviewState.getCurrentContent()).blocks);
  };

  const updateCommitment = async (state: any) => {
    await setCommitmentState(state);
    setBlocks(convertToRaw(commitmentState.getCurrentContent()).blocks);
  };

  const updateIntroduction = async (state: any) => {
    await setIntroductionState(state);
    setBlocks(convertToRaw(introductionState.getCurrentContent()).blocks);
  };

  const onValid = (data: IFormData) => {
    if (data.detailInformation.length < 1) {
      alert('Detail 항목은 최소 1개 이상 등록되어야 합니다.');
      return;
    }

    if (putData.logoImageUrl == '') {
      alert('Logo 파일을 업로드해주세요');
      return;
    } else if (putData.sloganImageUrl == '') {
      alert('Slogan 파일을 업로드해주세요');
      return;
    }

    handleSaveClick(data);
  };

  const handleSaveClick = async (data: IFormData) => {
    const formData = new FormData();

    const transformedDetailInformation = data.detailInformation.reduce(
      (acc, item) => {
        acc[item.key] = item.value;
        return acc;
      },
      {} as Record<string, string>,
    );

    formData.append(
      'request',
      new Blob(
        [
          JSON.stringify({
            address: data.address,
            phone: data.phone,
            fax: data.fax,
            mainOverview: draftToHtml(convertToRaw(mainOverviewState.getCurrentContent())),
            commitment: draftToHtml(convertToRaw(commitmentState.getCurrentContent())),
            introduction: draftToHtml(convertToRaw(introductionState.getCurrentContent())),
            detailInformation: transformedDetailInformation,
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

    if (window.confirm('등록하시겠습니까?')) {
      axios
        .post(`${PROMOTION_BASIC_PATH}/api/company/information`, formData)
        .then((response) => {
          console.log('Company Information post:', response);
          alert('등록되었습니다.');
          navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_COMPANY}`);
        })
        .catch((error) => console.error('Error post partner:', error));
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

  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSubmit(onValid)}>
          <LeftContentWrapper>
            {/* Basic */}
            <ContentBlock>
              <HoverInfo title={COMPANY_COLUMNS.Basic.title} description={COMPANY_COLUMNS.Basic.description} />
              <InputWrapper>
                <InputTitle>
                  <p>Address</p>
                </InputTitle>
                <input
                  {...register('address', {
                    required: '주소를 입력해주세요',
                  })}
                  placeholder='주소를 입력해주세요'
                />

                <InputTitle>
                  <p>Phone Number</p>
                </InputTitle>

                <input
                  {...register('phone', {
                    required: '전화번호를 입력해주세요',
                  })}
                  placeholder='전화번호를 입력해주세요'
                />

                <InputTitle>
                  <p>Fax Number</p>
                </InputTitle>

                <input
                  {...register('fax', {
                    required: '팩스번호를 입력해주세요',
                  })}
                  placeholder='팩스번호를 입력해주세요'
                />
              </InputWrapper>
            </ContentBlock>

            {/* Logo & Slogan */}
            <ContentBlock>
              <InputImgWrapper>
                <Box>
                  <HoverInfo title={COMPANY_COLUMNS.Logo.title} description={COMPANY_COLUMNS.Logo.description} />

                  <LogoWrapper>
                    <label htmlFor='logoFile'>
                      <Button>Logo Upload</Button>
                      <input id='logoFile' type='file' accept='image/*' onChange={handleLogoImageChange} />
                    </label>
                    <ImgBox>
                      <img src={putData.logoImageUrl} />
                    </ImgBox>
                  </LogoWrapper>
                </Box>
                <Box>
                  <HoverInfo title={COMPANY_COLUMNS.Slogan.title} description={COMPANY_COLUMNS.Slogan.description} />

                  <LogoWrapper>
                    <label htmlFor='sloganFile'>
                      <Button>Slogan Upload</Button>
                      <input id='sloganFile' type='file' accept='image/*' onChange={handleSloganImageChange} />
                    </label>
                    <ImgBox>
                      <img src={putData.sloganImageUrl} />
                    </ImgBox>
                  </LogoWrapper>
                </Box>
              </InputImgWrapper>
            </ContentBlock>
          </LeftContentWrapper>

          <RightContentWrapper>
            {/* Introduntion */}
            <ContentBlock>
              <HoverInfo
                title={COMPANY_COLUMNS.Introduction.title}
                description={COMPANY_COLUMNS.Introduction.description}
              />

              <InputWrapper>
                <InputTitle>Main Overview</InputTitle>
                <TextColorEditor editorState={mainOverviewState} onEditorStateChange={updateMainOverview} />
                <InputTitle>Commitment</InputTitle>
                <TextColorEditor editorState={commitmentState} onEditorStateChange={updateCommitment} />
                <InputTitle>Introduction</InputTitle>
                <TextColorEditor editorState={introductionState} onEditorStateChange={updateIntroduction} />
              </InputWrapper>
            </ContentBlock>

            {/* Detail */}
            <ContentBlock>
              <TitleWrapper>
                <HoverInfo title={COMPANY_COLUMNS.Detail.title} description={COMPANY_COLUMNS.Detail.description} />

                <Button onClick={() => append({ key: '', value: '' })}>
                  <AddedIcon width={14} height={14} />
                  Add New Detail
                </Button>
              </TitleWrapper>
              <InputWrapper>
                <div>
                  {fields.map((field, index) => (
                    <DetailItem key={field.id}>
                      <DeleteIcon width={15} height={15} onClick={() => safeRemove(index)} />
                      <Controller
                        name={`detailInformation.${index}.key`}
                        control={control}
                        defaultValue={field.key}
                        render={({ field }) => (
                          <DetailTitleInputWrapper>
                            <input
                              {...register(`detailInformation.${index}.key`, {
                                required: '제목을 입력해주세요',
                                maxLength: INPUT_MAX_LENGTH.DETAIL_TITLE,
                              })}
                              className='detail_title'
                              {...field}
                              placeholder='제목을 입력해주세요.'
                              onChange={(e) => {
                                if (e.target.value.length <= INPUT_MAX_LENGTH.DETAIL_TITLE) {
                                  field.onChange(e);
                                }
                              }}
                            />
                            <span>
                              {watchFields[index].key.length} / {INPUT_MAX_LENGTH.DETAIL_TITLE}자
                            </span>
                          </DetailTitleInputWrapper>
                        )}
                      />
                      <Controller
                        name={`detailInformation.${index}.value`}
                        control={control}
                        defaultValue={field.value}
                        render={({ field }) => (
                          <>
                            <textarea
                              {...register(`detailInformation.${index}.value`, {
                                required: '내용을 입력해주세요',
                              })}
                              className='detail_content'
                              {...field}
                              placeholder='내용을 입력해주세요.'
                            />
                          </>
                        )}
                      />
                    </DetailItem>
                  ))}
                </div>
              </InputWrapper>
            </ContentBlock>
          </RightContentWrapper>
          <SaveButton>등록하기</SaveButton>
        </Form>
      </Wrapper>
    </>
  );
};

export default InputForm;
