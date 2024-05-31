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
  selectedCategory: string,
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>,
  isprojectopened: boolean,
  handleTogglePosted: () => void,
  projectType: projectType,
  setProjectType: (type: projectType) => void,
  link: string,
  handleLinkChange: (newLink: string) => void,
  mainImage: File | undefined,
  handleMainImageChange: (newImage: File | File[]) => void,
  detailImage: File[],
  handleDetailImageChange: (newImages: File | File[]) => void,
  title: string,
  handleTitleChange: (newTitle: string) => void,
  customer: string,
  handleCustomerChange: (newCustomer: string) => void,
  overview: string,
  handleOverviewChange: (newOverview: string) => void,
  isGetMode?: boolean,
  getModeMainImg?: string,
  getModeDetailImgs?: string[],
) => {
  const defaultValue: DefaultValueItem[] = [
    {
      name: 'mainImage',
      title: '메인 이미지 설정',
      description: '메인 이미지는 최대 한 개만 설정 가능합니다.',
      content:
        isGetMode && getModeMainImg ? (
          <img src={getModeMainImg} alt='메인 이미지' style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        ) : (
          <>
            <ImageUpload
              type='main'
              value={mainImage}
              onChange={(newImage: File | File[]) => handleMainImageChange(newImage)}
            />
          </>
        ),
    },
    {
      name: 'title',
      title: '아트워크 제목',
      description: '아트워크 제목은 최대 30자까지 입력 가능합니다.',
      content: isGetMode ? (
        <GetInputWrapper>{title}</GetInputWrapper>
      ) : (
        <StyledInput
          required
          value={title}
          type='text'
          maxLength={30}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(e.target.value)}
        />
      ),
    },
    {
      name: 'overview',
      title: '아트워크 설명',
      description: '아트워크에 설명은 최대 120자까지 입력 가능합니다.',
      content: isGetMode ? (
        <GetInputWrapper>{overview}</GetInputWrapper>
      ) : (
        <OverviewInput
          required
          type='text'
          value={overview}
          maxLength={120}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOverviewChange(e.target.value)}
        />
      ),
    },
    {
      name: 'customer',
      title: '고객사',
      description: '고객사는 최대 30자까지 입력 가능합니다.',
      content: isGetMode ? (
        <GetInputWrapper>{customer}</GetInputWrapper>
      ) : (
        <input
          required
          type='text'
          value={customer}
          maxLength={30}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCustomerChange(e.target.value)}
        />
      ),
    },
    {
      name: 'date',
      title: '날짜',
      description: '',
      content: isGetMode ? (
        <GetInputWrapper>{selectedDate?.toString().slice(0, 10)}</GetInputWrapper>
      ) : (
        <StyledInput
          type='date'
          value={selectedDate instanceof Date ? selectedDate.toString().slice(0, 10) : ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleDateChange(e.target.value ? new Date(e.target.value) : null)
          }
        />
      ),
    },
    {
      name: 'category',
      title: '카테고리',
      description: '',
      content: isGetMode ? (
        <GetInputWrapper>{selectedCategory}</GetInputWrapper>
      ) : (
        <CategoryDropDown putCategory={selectedCategory.toString()} setSelectedCategory={setSelectedCategory} />
      ),
    },
    {
      name: 'link',
      title: '외부 연결 미디어 링크',
      description: '',
      content: isGetMode ? (
        <GetHrefContainer>
          <GetHrefWrapper href={link} target='_blank'>
            {link}
          </GetHrefWrapper>
        </GetHrefContainer>
      ) : (
        <StyledInput
          required
          type='text'
          value={link}
          placeholder='링크를 입력하세요'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLinkChange(e.target.value)}
        />
      ),
    },
    {
      name: 'isOpened',
      title: '프로모션 페이지 공개 여부',
      description: '비공개로 설정할 시, 프로모션 페이지의 메인화면 및 아트워크 화면에서 숨겨집니다.',
      content: (
        <Ispostedcontainer isopened={isprojectopened ? 'true' : 'false'}>
          <div onClick={() => !isGetMode && !isprojectopened && handleTogglePosted()}>공개</div>
          <div onClick={() => !isGetMode && isprojectopened && handleTogglePosted()}>비공개</div>
        </Ispostedcontainer>
      ),
    },
    {
      name: 'artworkType',
      title: '아트워크 타입',
      description: `Top: 메인 페이지의 가장 먼저 보이는 아트워크입니다. 최대 1개만 지정할 수 있습니다. \n Main: 메인 페이지에서 대표적으로 보이는 아트워크입니다. 최대 5개까지 지정할 수 있습니다. \n Others: 그 외의 아트워크 유형입니다. 아트워크 페이지에서 보여집니다.`,
      content: (
        <TypeContainer projectType={projectType}>
          <div onClick={() => !isGetMode && projectType !== 'top' && setProjectType('top')}>Top</div>
          <div onClick={() => !isGetMode && projectType !== 'main' && setProjectType('main')}>Main</div>
          <div onClick={() => !isGetMode && projectType !== 'others' && setProjectType('others')}>Others</div>
        </TypeContainer>
      ),
    },
    {
      name: 'detailImages',
      title: '아트워크 상세 이미지',
      description: '아트워크 상세 이미지는 최소 1개에서 최대 3개까지 지정 가능합니다.',

      content:
        isGetMode && getModeDetailImgs ? (
          getModeDetailImgs.map((i, index) => (
            <img
              src={i}
              alt='메인 이미지'
              style={{ width: '100%', height: 'auto', objectFit: 'contain', marginBottom: '30px' }}
            />
          ))
        ) : (
          <ImageUpload
            type='detail'
            value={detailImage}
            onChange={(newImages: File | File[]) => handleDetailImageChange(newImages)}
          />
        ),
    },
  ];
  return defaultValue;
};

export default getArtworkDefaultValue;

const Ispostedcontainer = styled.div<{ isopened: string }>`
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
const GetInputWrapper = styled.div`
  width: 100%;
  padding: 8px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 17px;
  line-height: 140%;
  font-family: 'pretendard-regular';
`;

const GetHrefContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 8px;
`;
const GetHrefWrapper = styled.a`
  text-decoration: none;
  border: none;
  font-size: 17px;
  line-height: 140%;
  font-family: 'pretendard-regular';
`;
const OverviewInput = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
`;
