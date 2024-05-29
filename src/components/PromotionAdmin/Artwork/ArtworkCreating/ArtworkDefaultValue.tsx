import { projectType } from '@/types/PromotionAdmin/artwork';
import styled from 'styled-components';
import CategoryDropDown from '../CategoryDropDown';
import ImageUpload from './ImageUpload';

const getArtworkDefaultValue = (
  selectedDate: Date | null,
  handleDateChange: (date: Date | null) => void,
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>,
  isPosted: boolean,
  handleTogglePosted: () => void,
  isTyped: projectType,
  setIsTyped: (type: projectType) => void,
  handleLinkChange: (newLink: string) => void,
  handleMainImageChange: (newImage: string | string[]) => void,
  handleDetailImageChange: (newImages: string | string[]) => void,
  handleTitleChange: (newTitle: string) => void,
  handleCustomerChange: (newCustomer: string) => void,
) => {
  const defaultValue = [
    {
      title: '메인 이미지 설정',
      description: '메인 이미지는 최대 한 개만 설정 가능합니다.',
      content: <ImageUpload type='main' onChange={(newImage: string | string[]) => handleMainImageChange(newImage)} />,
    },
    {
      title: '아트워크 제목',
      description: '아트워크 제목은 최대 15자만 입력 가능합니다.',
      content: (
        <input
          required
          type='text'
          maxLength={15}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(e.target.value)}
        />
      ),
    },
    {
      title: '고객사',
      description: '고객사는 최대 10자만 입력 가능합니다.',
      content: (
        <input
          required
          type='text'
          maxLength={10}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCustomerChange(e.target.value)}
        />
      ),
    },
    {
      title: '날짜',
      description: '',
      content: (
        <>
          <StyledInput
            type='date'
            value={selectedDate ? selectedDate.toISOString().substr(0, 10) : ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDateChange(new Date(e.target.value))}
          />
        </>
      ),
    },

    {
      title: '카테고리',
      description: '',
      content: (
        <>
          <CategoryDropDown setSelectedCategory={setSelectedCategory} />
        </>
      ),
    },
    {
      title: '외부 연결 미디어 링크',
      description: '',
      content: (
        <>
          <StyledLinkInput
            required
            type='text'
            placeholder='링크를 입력하세요'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLinkChange(e.target.value)}
          />
        </>
      ),
    },
    {
      title: '공개 여부',
      description: '비공개로 설정할 시, 메인화면 및 아트워크 화면에서 숨겨집니다.',
      content: (
        <IsPostedContainer isPosted={isPosted}>
          <div onClick={() => !isPosted && handleTogglePosted()}>공개</div>
          <div onClick={() => isPosted && handleTogglePosted()}>비공개</div>
        </IsPostedContainer>
      ),
    },
    {
      title: '아트워크 타입',
      description:
        'top은 메인 페이지의 첫번째 아트워크이며 최대 한 개만 지정이 가능합니다. main은 메인 페이지의 대표 아트워크이며 최대 5개까지 지정이 가능합니다. others는 그 외의 기본값 타입입니다.',
      content: (
        <TypeContainer isTyped={isTyped}>
          <div onClick={() => isTyped !== 'top' && setIsTyped('top')}>Top</div>
          <div onClick={() => isTyped !== 'main' && setIsTyped('main')}>Main</div>
          <div onClick={() => isTyped !== 'others' && setIsTyped('others')}>Others</div>
        </TypeContainer>
      ),
    },
    {
      title: '아트워크 상세 이미지',
      description: '아트워크 상세 이미지는 최소 1개에서 최대 3개까지 지정 가능합니다.',
      content: (
        <ImageUpload type='detail' onChange={(newImages: string | string[]) => handleDetailImageChange(newImages)} />
      ),
    },
  ];
  return defaultValue;
};

export default getArtworkDefaultValue;

const IsPostedContainer = styled.div<{ isPosted: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: 'pretendard-semibold';
  background-color: #cacaca88;
  height: 40px;
  border-radius: 20px;
  position: relative;
  width: 150px;

  &::before {
    content: '';
    position: absolute;
    width: 75px;
    height: 100%;
    background-color: #f0f0f0;
    border-radius: 20px;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) => (props.isPosted ? 'translateX(0)' : 'translateX(75px)')}; // 애니메이션 효과를 적용합니다.
  }

  div {
    z-index: 1;
    flex: 1;
    text-align: center;
    padding: 5px 0;
    font-weight: normal;
    color: grey;

    &:first-child {
      color: ${(props) => (props.isPosted ? 'black' : 'grey')};
      font-weight: ${(props) => (props.isPosted ? 'bold' : 'normal')};
    }

    &:last-child {
      color: ${(props) => (props.isPosted ? 'grey' : 'black')};
      font-weight: ${(props) => (props.isPosted ? 'normal' : 'bold')};
    }
  }
`;
const TypeContainer = styled.div<{ isTyped: projectType }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: 'pretendard-semibold';
  background-color: #cacaca88;
  height: 40px;
  border-radius: 20px;
  position: relative;
  width: 225px;

  &::before {
    content: '';
    position: absolute;
    width: 75px;
    height: 100%;
    background-color: #f0f0f0;
    border-radius: 20px;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) => {
      switch (props.isTyped) {
        case 'top':
          return 'translateX(0)';
        case 'main':
          return 'translateX(75px)';
        case 'others':
          return 'translateX(150px)';
        default:
          return 'translateX(0)';
      }
    }};
  }

  div {
    z-index: 1;
    flex: 1;
    text-align: center;
    padding: 5px 0;
    font-weight: normal;
    color: grey;

    &:nth-child(1) {
      color: ${(props) => (props.isTyped === 'top' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.isTyped === 'top' ? 'bold' : 'normal')};
    }

    &:nth-child(2) {
      color: ${(props) => (props.isTyped === 'main' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.isTyped === 'main' ? 'bold' : 'normal')};
    }

    &:nth-child(3) {
      color: ${(props) => (props.isTyped === 'others' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.isTyped === 'others' ? 'bold' : 'normal')};
    }
  }
`;
const StyledLinkInput = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  border-bottom: 1px solid #ccc;

  font-size: 16px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
`;
