import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import { Wrapper, ContentBlock, InputWrapper, InputTitle, Form } from '../CompanyFormStyleComponents';
import { DATAEDIT_TITLES_COMPONENTS } from '../StyleComponents';
import Button from '../../StyleComponents/Button';
import styled from 'styled-components';

interface IBasicFormData {
  address: string;
  addressEnglish: string;
  phone: string;
  fax: string;
}

interface IBasicProps {
  setEditBasic: (editMode: boolean) => void;
}

const Basic = ({ setEditBasic }: IBasicProps) => {
  const { data, isLoading, error } = useQuery<ICompanyData, Error>(['company', 'id'], getCompanyData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBasicFormData>();

  useEffect(() => {
    if (data) {
      reset({
        address: data.address,
        addressEnglish: data.addressEnglish,
        phone: data.phone,
        fax: data.fax,
      });
    }
  }, [data, reset]);

  const onValid = (data: IBasicFormData) => {
    if (window.confirm('수정하시겠습니까?')) {
      console.log('addressEnglish: ', data);
      axios
        .put(`${PROMOTION_BASIC_PATH}/api/company/basic`, data)
        .then((response) => {
          alert('수정되었습니다.');
          setEditBasic(false);
        })
        .catch((error) => console.error('Error updating company basic:', error));
    }
  };

  if (isLoading) return <>is Loading..</>;
  if (error) return <>{error.message}</>;
  return (
    <Wrapper>
      {data && (
        <>
          <Form onSubmit={handleSubmit(onValid)}>
            <ContentBlock>
              <TitleWrapper>
                {DATAEDIT_TITLES_COMPONENTS.Basic}
                <Button description='저장하기' width={100} />
              </TitleWrapper>

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
                {errors.address && <ErrorMessage>{errors.address.message}</ErrorMessage>}

                <InputTitle>
                  <p>English Address</p>
                </InputTitle>
                <input
                  {...register('addressEnglish', {
                    required: '영문주소를 입력해주세요',
                    pattern: {
                      value: /^[A-Za-z0-9\s,.'-]{3,}$/,
                      message: '유효한 영어 주소를 입력해주세요.',
                    },
                  })}
                  placeholder='영문주소를 입력해주세요'
                />
                {errors.addressEnglish && <ErrorMessage>{errors.addressEnglish.message}</ErrorMessage>}

                <InputTitle>
                  <p>Phone Number</p>
                </InputTitle>

                <input
                  {...register('phone', {
                    required: '전화번호를 입력해주세요',
                    pattern: {
                      value: /^\+?\d{2,3}-\d{3,4}-\d{4}$/,
                      message: '유효한 전화번호를 입력해주세요. (예: 010-1234-5678) ',
                    },
                  })}
                  placeholder='전화번호를 입력해주세요'
                />
                {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}

                <InputTitle>
                  <p>Fax Number</p>
                </InputTitle>

                <input
                  {...register('fax', {
                    required: '팩스번호를 입력해주세요',
                    pattern: {
                      value: /^\+?\d{2,3}-\d{3,4}-\d{4}$/,
                      message: '유효한 팩스번호 형식을 입력해주세요. (예: 02-123-4567 또는 031-1234-5678)',
                    },
                  })}
                  placeholder='팩스번호를 입력해주세요'
                />
                {errors.fax && <ErrorMessage>{errors.fax.message}</ErrorMessage>}
              </InputWrapper>
            </ContentBlock>
          </Form>
        </>
      )}
    </Wrapper>
  );
};

export default Basic;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ErrorMessage = styled.div`
  font-family: ${(props) => props.theme.font.light};
  margin-top: 10px;
  margin-left: 10px;
  font-size: 13px;
`;
