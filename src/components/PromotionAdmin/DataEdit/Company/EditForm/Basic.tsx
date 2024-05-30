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
              {DATAEDIT_TITLES_COMPONENTS.Basic}
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
                  <p>English Address</p>
                </InputTitle>
                <input
                  {...register('addressEnglish', {
                    required: '영문주소를 입력해주세요',
                  })}
                  placeholder='영문주소를 입력해주세요'
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
              <Button description='저장하기' />
            </ContentBlock>
          </Form>
        </>
      )}
    </Wrapper>
  );
};

export default Basic;
