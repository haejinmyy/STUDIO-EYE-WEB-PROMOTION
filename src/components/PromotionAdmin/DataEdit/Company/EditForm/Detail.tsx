import { getCompanyDetailData } from '@/apis/PromotionAdmin/dataEdit';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import {
  Wrapper,
  ContentBlock,
  TitleWrapper,
  InputWrapper,
  DetailItem,
  DetailTitleInputWrapper,
  Form,
} from '../CompanyFormStyleComponents';
import { ReactComponent as DeleteIcon } from '@/assets/images/PA/minusIcon.svg';
import { ReactComponent as AddedIcon } from '@/assets/images/PA/plusIcon.svg';
import Button from '../../StyleComponents/Button';
import { DATAEDIT_TITLES_COMPONENTS, INPUT_MAX_LENGTH } from '../StyleComponents';

interface IDetailFormData {
  detailInformation: { key: string; value: string }[];
}

interface IDetailProps {
  setEditDetail: (editMode: boolean) => void;
}

const Detail = ({ setEditDetail }: IDetailProps) => {
  const { data, isLoading, error } = useQuery<IDetailFormData, Error>(['company'], getCompanyDetailData);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<IDetailFormData>();

  // detail 요소 추가 삭제
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'detailInformation',
  });

  useEffect(() => {
    if (data) {
      const detailInformationArray = Object.entries(data).map(([key, value]) => ({
        key,
        value: value.toString(),
      }));
      reset({ detailInformation: detailInformationArray });
    }
  }, [data, reset]);

  // 글자수 확인
  const watchFields = watch('detailInformation');

  // detail 요소 삭제
  const safeRemove = (index: number) => {
    if (fields.length > 1 && window.confirm('삭제하시겠습니까?')) {
      remove(index);
    } else {
      alert('Detail 항목은 최소 1개 이상 등록되어야 합니다.');
    }
  };

  const onValid = (data: IDetailFormData) => {
    const transformedDetailInformation = data.detailInformation.reduce(
      (acc, item) => {
        acc[item.key] = item.value;
        return acc;
      },
      {} as Record<string, string>,
    );

    const requestBody = {
      detailInformation: transformedDetailInformation,
    };

    if (window.confirm('수정하시겠습니까?')) {
      axios
        .put(`${PROMOTION_BASIC_PATH}/api/company/detail`, requestBody)
        .then(() => {
          alert('수정되었습니다.');
          setEditDetail(false);
        })
        .catch((error) => console.error('Error updating company detail:', error));
    }
  };

  if (isLoading) return <>is Loading..</>;
  if (error) return <>{error.message}</>;

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <ContentBlock>
          <TitleWrapper>
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
                      <textarea
                        {...register(`detailInformation.${index}.value`, {
                          required: '내용을 입력해주세요',
                        })}
                        className='detail_content'
                        {...field}
                        placeholder='내용을 입력해주세요.'
                      />
                    )}
                  />
                </DetailItem>
              ))}
            </div>
          </InputWrapper>
          <Button description='저장하기' fontSize={14} width={100} />
        </ContentBlock>
      </Form>
    </Wrapper>
  );
};

export default Detail;
