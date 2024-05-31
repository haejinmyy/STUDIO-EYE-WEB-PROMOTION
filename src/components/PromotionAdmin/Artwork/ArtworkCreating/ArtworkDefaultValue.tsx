import { projectType } from '@/types/PromotionAdmin/artwork';
import styled from 'styled-components';
import CategoryDropDown from '../CategoryDropDown';
import ImageUpload from './ImageUpload';

export type DefaultValueItem = {
  name: string;
  title: string;
  description: string;
  content: React.ReactNode;
  error?: string;
};

export const getArtworkDefaultValue = (
  selectedDate: Date | null,
  handleDateChange: (date: Date | null) => void,
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>,
  isprojectopened: boolean,
  handleTogglePosted: () => void,
  projectType: projectType,
  setProjectType: (type: projectType) => void,
  handleLinkChange: (newLink: string) => void,
  handleMainImageChange: (newImage: File | File[]) => void,
  handleDetailImageChange: (newImages: File | File[]) => void,
  handleTitleChange: (newTitle: string) => void,
  handleCustomerChange: (newCustomer: string) => void,
  handleOverviewChange: (newOverview: string) => void,
) => {
  const defaultValue: DefaultValueItem[] = [
    {
      name: 'mainImage',
      title: '메인 이미지 설정',
      description: '메인 이미지는 최대 한 개만 설정 가능합니다.',
      content: <ImageUpload type='main' onChange={(newImage: File | File[]) => handleMainImageChange(newImage)} />,
    },
    {
      name: 'title',
      title: '아트워크 제목',
      description: '아트워크 제목은 최대 20자만 입력 가능합니다.',
      content: (
        <StyledInput
          required
          type='text'
          maxLength={20}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(e.target.value)}
        />
      ),
    },
    {
      name: 'overview',
      title: '아트워크 설명',
      description: '아트워크에 대한 설명을 작성해주세요.',
      content: (
        <OverviewInput
          required
          type='text'
          maxLength={40}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOverviewChange(e.target.value)}
        />
      ),
    },
    {
      name: 'customer',
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
      name: 'date',
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
      name: 'category',
      title: '카테고리',
      description: '',
      content: (
        <>
          <CategoryDropDown setSelectedCategory={setSelectedCategory} />
        </>
      ),
    },
    {
      name: 'link',
      title: '외부 연결 미디어 링크',
      description: '',
      content: (
        <>
          <StyledInput
            required
            type='text'
            placeholder='링크를 입력하세요'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLinkChange(e.target.value)}
          />
        </>
      ),
    },
    {
      name: 'isOpened',
      title: '프로모션 페이지 공개 여부',
      description: '비공개로 설정할 시, 프로모션 페이지의 메인화면 및 아트워크 화면에서 숨겨집니다.',
      content: (
        <IsPostedContainer isopened={isprojectopened ? 'true' : 'false'}>
          <div onClick={() => !isprojectopened && handleTogglePosted()}>공개</div>
          <div onClick={() => isprojectopened && handleTogglePosted()}>비공개</div>
        </IsPostedContainer>
      ),
    },
    {
      name: 'artworkType',
      title: '아트워크 타입',
      description:
        'top은 메인 페이지의 첫번째 아트워크이며 최대 한 개만 지정이 가능합니다. main은 메인 페이지의 대표 아트워크이며 최대 5개까지 지정이 가능합니다. others는 그 외의 기본값 타입입니다.',
      content: (
        <TypeContainer projectType={projectType}>
          <div onClick={() => projectType !== 'top' && setProjectType('top')}>Top</div>
          <div onClick={() => projectType !== 'main' && setProjectType('main')}>Main</div>
          <div onClick={() => projectType !== 'others' && setProjectType('others')}>Others</div>
        </TypeContainer>
      ),
    },
    {
      name: 'detaiImages',
      title: '아트워크 상세 이미지',
      description: '아트워크 상세 이미지는 최소 1개에서 최대 3개까지 지정 가능합니다.',
      content: (
        <ImageUpload type='detail' onChange={(newImages: File | File[]) => handleDetailImageChange(newImages)} />
      ),
    },
  ];
  return defaultValue;
};

export default getArtworkDefaultValue;

const IsPostedContainer = styled.div<{ isopened: string }>`
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
    transform: ${(props) => (props.isopened === 'true' ? 'translateX(0)' : 'translateX(75px)')};
  }

  div {
    z-index: 1;
    flex: 1;
    text-align: center;
    padding: 5px 0;
    font-weight: normal;
    color: grey;

    &:first-child {
      color: ${(props) => (props.isopened === 'true' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.isopened === 'true' ? 'bold' : 'normal')};
    }

    &:last-child {
      color: ${(props) => (props.isopened === 'true' ? 'grey' : 'black')};
      font-weight: ${(props) => (props.isopened === 'true' ? 'normal' : 'bold')};
    }
  }
`;
const TypeContainer = styled.div<{ projectType: projectType }>`
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
      switch (props.projectType) {
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
      color: ${(props) => (props.projectType === 'top' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.projectType === 'top' ? 'bold' : 'normal')};
    }

    &:nth-child(2) {
      color: ${(props) => (props.projectType === 'main' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.projectType === 'main' ? 'bold' : 'normal')};
    }

    &:nth-child(3) {
      color: ${(props) => (props.projectType === 'others' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.projectType === 'others' ? 'bold' : 'normal')};
    }
  }
`;

const StyledInput = styled.input``;

const OverviewInput = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
`;
