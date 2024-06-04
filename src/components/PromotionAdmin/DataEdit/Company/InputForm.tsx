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
import {
  Wrapper,
  ContentBlock,
  InputWrapper,
  InputImgWrapper,
  InputTitle,
  ImgBox,
  LogoWrapper,
  DetailItem,
  DetailTitleInputWrapper,
  Form,
  Box,
  LeftContentWrapper,
  RightContentWrapper,
  DetailContentWrapper,
  BasicInputWrapper,
} from './CompanyFormStyleComponents';
import Button from '../StyleComponents/Button';
import FileButton from '../StyleComponents/FileButton';
import styled from 'styled-components';
import { DATAEDIT_NOTICE_COMPONENTS, DATAEDIT_TITLES_COMPONENTS, INPUT_MAX_LENGTH } from './StyleComponents';

interface IFormData {
  mainOverview?: string;
  commitment?: string;
  address?: string;
  addressEnglish?: string;
  fax?: string;
  introduction?: string;
  phone?: string;
  detailInformation: { key: string; value: string }[];
}

interface IBasicFormData {
  address: string;
  addressEnglish: string;
  phone: string;
  fax: string;
}

const InputForm = () => {
  const navigator = useNavigate();
  const [putData, setPutData] = useState({
    request: {
      address: '',
      addressEnglish: '',
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
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  // 글자수 확인
  const watchBasicFields = watch(['address', 'addressEnglish', 'phone', 'fax']);
  const basicInputIndex = {
    address: 0,
    addressEnglish: 1,
    phone: 2,
    fax: 3,
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    maxLength: number,
    field: keyof IBasicFormData,
  ) => {
    const inputLength = event.target.value.length;

    if (inputLength <= maxLength) {
      setValue(field, event.target.value, { shouldValidate: true });
    } else {
      const trimmedValue = event.target.value.slice(0, maxLength);
      setValue(field, trimmedValue, { shouldValidate: true });
    }
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, INPUT_MAX_LENGTH.BASIC_ADDRESS, 'address');
  };

  const handleEnglishAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, INPUT_MAX_LENGTH.BASIC_ENGLISH_ADDRESS, 'addressEnglish');
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, INPUT_MAX_LENGTH.BASIC_PHONE, 'phone');
  };

  const handleFaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, INPUT_MAX_LENGTH.BASIC_FAX, 'fax');
  };

  // 글자수 확인
  const watchDetailFields = watch('detailInformation');

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

  const checkIsEmpty = (editorState: EditorState, attribute: string) => {
    const isEmpty = !editorState.getCurrentContent().hasText();
    if (isEmpty) {
      alert(`${attribute}을(를) 작성해주세요.`);
      return true;
    }
    return false;
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
            addressEnglish: data.addressEnglish,
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

    const isEmpty =
      checkIsEmpty(mainOverviewState, 'Main Overview') ||
      checkIsEmpty(commitmentState, 'Commitment') ||
      checkIsEmpty(introductionState, 'Introduction');

    // 이미지 추가
    const logoFile = await urlToFile(putData.logoImageUrl, 'Logo.png');
    formData.append('logoImageUrl', logoFile);
    const sloganFile = await urlToFile(putData.sloganImageUrl, 'Slogan.png');
    formData.append('sloganImageUrl', sloganFile);

    if (!isEmpty && window.confirm('등록하시겠습니까?')) {
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
              {DATAEDIT_TITLES_COMPONENTS.Basic}

              <InputWrapper>
                <InputTitle>
                  <p>Address</p>
                </InputTitle>
                <BasicInputWrapper>
                  <input
                    {...register('address', {
                      required: '주소를 입력해주세요',
                      maxLength: INPUT_MAX_LENGTH.BASIC_ADDRESS,
                    })}
                    onChange={handleAddressChange}
                    placeholder='주소를 입력해주세요'
                  />
                  <span>
                    {watchBasicFields[basicInputIndex.address]?.length} / {INPUT_MAX_LENGTH.BASIC_ADDRESS}자
                  </span>
                </BasicInputWrapper>
                {errors.address && <ErrorMessage>{errors.address.message}</ErrorMessage>}

                <InputTitle>
                  <p>English Address</p>
                </InputTitle>
                <BasicInputWrapper>
                  <input
                    {...register('addressEnglish', {
                      required: '영문주소를 입력해주세요',
                      maxLength: INPUT_MAX_LENGTH.BASIC_ENGLISH_ADDRESS,
                      pattern: {
                        value: /^[A-Za-z0-9\s,.'-]{3,}$/,
                        message: '유효한 영어 주소를 입력해주세요.',
                      },
                    })}
                    onChange={handleEnglishAddressChange}
                    placeholder='영문주소를 입력해주세요'
                  />
                  <span>
                    {watchBasicFields[basicInputIndex.addressEnglish]?.length} /{' '}
                    {INPUT_MAX_LENGTH.BASIC_ENGLISH_ADDRESS}자
                  </span>
                </BasicInputWrapper>
                {errors.addressEnglish && <ErrorMessage>{errors.addressEnglish.message}</ErrorMessage>}

                <InputTitle>
                  <p>Phone Number</p>
                </InputTitle>

                <BasicInputWrapper>
                  <input
                    {...register('phone', {
                      required: '전화번호를 입력해주세요',
                      maxLength: INPUT_MAX_LENGTH.BASIC_PHONE,
                      pattern: {
                        value: /^\+?\d{2,3}-\d{3,4}-\d{4}$/,
                        message: '유효한 전화번호를 입력해주세요. (예: 010-1234-5678) ',
                      },
                    })}
                    onChange={handlePhoneChange}
                    placeholder='전화번호를 입력해주세요'
                  />
                  <span>
                    {watchBasicFields[basicInputIndex.phone]?.length} / {INPUT_MAX_LENGTH.BASIC_PHONE}자
                  </span>
                </BasicInputWrapper>
                {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}

                <InputTitle>
                  <p>Fax Number</p>
                </InputTitle>
                <BasicInputWrapper>
                  <input
                    {...register('fax', {
                      required: '팩스번호를 입력해주세요',
                      maxLength: INPUT_MAX_LENGTH.BASIC_FAX,
                      pattern: {
                        value: /^\+?\d{2,3}-\d{3,4}-\d{4}$/,
                        message: '유효한 팩스번호 형식을 입력해주세요. (예: 02-123-4567 또는 031-1234-5678)',
                      },
                    })}
                    onChange={handleFaxChange}
                    placeholder='팩스번호를 입력해주세요'
                  />
                  <span>
                    {watchBasicFields[basicInputIndex.fax]?.length} / {INPUT_MAX_LENGTH.BASIC_FAX}자
                  </span>
                </BasicInputWrapper>
                {errors.fax && <ErrorMessage>{errors.fax.message}</ErrorMessage>}
              </InputWrapper>
            </ContentBlock>

            {/* Logo & Slogan */}
            <ContentBlock>
              <InputImgWrapper>
                <Box>
                  {DATAEDIT_TITLES_COMPONENTS.Logo}
                  {DATAEDIT_NOTICE_COMPONENTS.IMAGE.LOGO}
                  {DATAEDIT_NOTICE_COMPONENTS.COLOR.LOGO}

                  <LogoWrapper>
                    <FileButton id='logoFile' description='Logo Upload' onChange={handleLogoImageChange} />
                    <ImgBox>
                      <img src={putData.logoImageUrl} />
                    </ImgBox>
                  </LogoWrapper>
                </Box>
                <Box>
                  {DATAEDIT_TITLES_COMPONENTS.Slogan}
                  {DATAEDIT_NOTICE_COMPONENTS.IMAGE.SLOGAN}
                  {DATAEDIT_NOTICE_COMPONENTS.COLOR.SLOGAN}

                  <LogoWrapper>
                    <FileButton id='sloganFile' description='Slogan Upload' onChange={handleSloganImageChange} />
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
              {DATAEDIT_TITLES_COMPONENTS.Introduction}
              <InputWrapper>
                <InputTitle>Main Overview</InputTitle>
                <TextColorEditor
                  editorState={mainOverviewState}
                  onEditorStateChange={updateMainOverview}
                  attribute='Main Overview'
                />
                <InputTitle>Commitment</InputTitle>
                <TextColorEditor
                  editorState={commitmentState}
                  onEditorStateChange={updateCommitment}
                  attribute='Commitment'
                />
                <InputTitle>Introduction</InputTitle>
                <TextColorEditor
                  editorState={introductionState}
                  onEditorStateChange={updateIntroduction}
                  attribute='Introduction'
                />
              </InputWrapper>
            </ContentBlock>

            {/* Detail */}
            <ContentBlock>
              <TitleWrapper space_between={true}>
                {DATAEDIT_TITLES_COMPONENTS.Detail}
                <Button
                  description='Add New Detail'
                  svgComponent={<AddedIcon width={14} height={14} />}
                  onClick={() => append({ key: '', value: '' })}
                />
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
                              {watchDetailFields[index].key.length} / {INPUT_MAX_LENGTH.DETAIL_TITLE}자
                            </span>
                          </DetailTitleInputWrapper>
                        )}
                      />
                      <Controller
                        name={`detailInformation.${index}.value`}
                        control={control}
                        defaultValue={field.value}
                        render={({ field }) => (
                          <DetailContentWrapper>
                            <textarea
                              {...register(`detailInformation.${index}.value`, {
                                required: '내용을 입력해주세요',
                                maxLength: INPUT_MAX_LENGTH.DETAIL_CONTENT,
                              })}
                              className='detail_content'
                              {...field}
                              placeholder='내용을 입력해주세요.'
                              onChange={(e) => {
                                if (e.target.value.length <= INPUT_MAX_LENGTH.DETAIL_CONTENT) {
                                  field.onChange(e);
                                }
                              }}
                            />
                            <span>
                              {watchDetailFields[index].value.length} / {INPUT_MAX_LENGTH.DETAIL_CONTENT}자
                            </span>
                          </DetailContentWrapper>
                        )}
                      />
                    </DetailItem>
                  ))}
                </div>
              </InputWrapper>
            </ContentBlock>
            <Button description='등록하기' fontSize={14} width={100} />
          </RightContentWrapper>
        </Form>
      </Wrapper>
    </>
  );
};

export default InputForm;

const TitleWrapper = styled.div<{ space_between?: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.space_between ? 'space-between' : 'none')};

  div {
    display: flex;
  }
`;

const ErrorMessage = styled.div`
  font-family: ${(props) => props.theme.font.light};
  margin-top: 10px;
  margin-left: 10px;
  font-size: 13px;
`;
