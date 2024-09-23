import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postRecruitment } from '@/apis/PromotionAdmin/recruitment';
// import { theme } from '@/styles/theme';
import { ContentBox } from '@/components/PromotionAdmin/Recruitment/Components';
import { PA_ROUTES } from '@/constants/routerConstants';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import { MSG } from '@/constants/messages';

function RecruitmentWritePage() {
  const setIsEditing = useSetRecoilState(dataUpdateState);
  const isEditing = useRecoilValue(dataUpdateState);
  const navigator = useNavigate();
  const [putData, setPutData] = useState({
    title: '',
    content: '',
  });
  const titleLength = putData.title.length;
  const contentLength = putData.content.length;
  const maxTitleLength = 200;
  const maxContentLength = 1500;

  type RecruitmentFormData = {
    title: string;
    content: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm<RecruitmentFormData>({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  useEffect(() => {
    if (isEditing) {
      const handleBeforeUnload = (event: any) => {
        const message = MSG.CONFIRM_MSG.EXIT;
        event.returnValue = message;
        return message;
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsEditing(true);
    const { name, value } = e.target;
    if (/^\s|[~!@#$%^&*(),.?":{}|<>]/.test(value.charAt(0))) {
      return;
    }

    setPutData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onValid = async (data: RecruitmentFormData) => {
    const formData = {
      title: data.title,
      content: data.content,
    };

    if (!(data.title === '' || data.content === '') && window.confirm('등록하시겠습니까?')) {
      try {
        const response = await postRecruitment(formData);
        alert('채용공고가 등록되었습니다.');
        console.log(response);
        setIsEditing(false);
        navigator(`${PA_ROUTES.RECRUITMENT}`);
      } catch (error) {
        console.log(error);
        alert('채용공고 등록 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <ContentBox>
        <TitleWrapper>
          <Title>채용공고 등록</Title>
        </TitleWrapper>
        <InputWrapper>
          <InputTitle style={{ justifyContent: 'space-between' }}>
            <p>Title</p>
            <div
              style={{
                fontSize: 12,
                paddingTop: 10,
              }}
            >
              {titleLength}/{maxTitleLength}
            </div>
          </InputTitle>
          <input
            {...register('title', {
              required: 'Title을 입력해주세요. (200자 내로 작성해 주세요.)',
            })}
            name='title'
            value={putData.title}
            onChange={handleChange}
            maxLength={200}
            placeholder='Title을 입력해주세요. (200자 내로 작성해 주세요.)'
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          <InputTitle style={{ justifyContent: 'space-between' }}>
            <p>Content</p>
            <div
              style={{
                fontSize: 12,
                paddingTop: 10,
              }}
            >
              {contentLength}/{maxContentLength}
            </div>
          </InputTitle>
          <textarea
            {...register('content', {
              required: 'Content를 입력해주세요. (1500자 내로 작성해 주세요.)',
            })}
            name='content'
            value={putData.content}
            onChange={handleChange}
            maxLength={1500}
            placeholder='Content를 입력해주세요. (1500자 내로 작성해 주세요.)'
          />
          {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
        </InputWrapper>
        <RowWrapper>
          <ModifyButton>등록하기</ModifyButton>
        </RowWrapper>
      </ContentBox>
    </form>
  );
}

export default RecruitmentWritePage;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  align-content: center;

  svg {
    cursor: pointer;
    margin-right: 10px;
  }
  font-family: ${(props) => props.theme.font.bold};
  font-size: 25px;
`;

const InputWrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.color.white.light};
  flex-direction: column;
  font-family: ${(props) => props.theme.font.semiBold};
  p {
    font-size: 18px;
    padding-top: 7px;
    padding-bottom: 3px;
    margin-bottom: 10px;
  }
  input {
    outline: none;
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    padding: 10px;
    width: 95%;
    height: 30px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  input:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }
  textarea {
    outline: none;
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    padding: 10px;
    width: 95%;
    min-height: 450px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    resize: none;
  }
  textarea:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }
`;

const InputTitle = styled.div`
  display: flex;
  padding-top: 20px;
  align-items: center;
  height: 40px;
  width: 95%;
  svg {
    cursor: pointer;
    margin-right: 10px;
  }
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  margin-top: 20px;
`;

const ModifyButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6vw;
  height: 40px;
  margin-right: 20px;
  font-size: 15px;
  font-family: ${(props) => props.theme.font.medium};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  background-color: ${(props) => props.theme.color.white.bold};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light};
  }
`;

const ErrorMessage = styled.div`
  font-family: ${(props) => props.theme.font.light};
  margin-top: 10px;
  margin-left: 10px;
  font-size: 13px;
`;
