import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import logo from '../../../assets/logo/mainLogo.png';
import { PP_ROUTES } from '@/constants/routerConstants';
import { useNavigate } from 'react-router-dom';
import { getCompanyBasicData } from '../../../apis/PromotionAdmin/dataEdit';

interface ICircleProps {
  filled: boolean;
}
interface IFontStyleProps {
  color?: string;
  fontSize?: string;
  fontFamily?: string;
}
interface IButtonProps {
  disabled?: boolean;
  checked?: boolean;
}
interface IFormData {
  category: string;
  clientName: string;
  organization: string;
  email: string;
  contact: string;
  description: string;
  position: string;
  // projectName: string;
}
type ICompanyBasic = {
  address: string;
  addressEnglish: string;
  phone: string;
  fax: string;
};

const ContactUsPage = () => {
  const navigator = useNavigate();
  const [requestStep, setRequestStep] = useState(0);
  const [formData, setFormData] = useState<IFormData>({
    category: '',
    clientName: '',
    organization: '',
    email: '',
    contact: '',
    description: '',
    position: '',
    // projectName: '',
  });
  const [companyBasicData, setCompanyBasicData] = useState<ICompanyBasic>({
    address: '',
    addressEnglish: '',
    phone: '',
    fax: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyBasicData();
        console.log(data);
        if (data !== null) {
          setCompanyBasicData(data);
        } else {
          setCompanyBasicData({
            address: '',
            addressEnglish: '',
            phone: '',
            fax: '',
          });
        }
      } catch (error) {
        console.error('Error fetching company data: ', error);
      }
    };
    fetchData();
  }, []);
  const [selectedCategory, setSelectedCategory] = useState('');
  // wheel event 관리
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleWheel = () => (e: WheelEvent) => {
    const textarea = document.getElementById('myTextarea'); // textarea 참조
    const isTextarea = e.target === textarea; // 이벤트가 textarea 내부에서 발생했는지 확인
    if (containerRef.current && isTextarea) {
      e.stopPropagation(); // 조건에 따라 외부 스크롤 방지
    } else {
      const element = containerRef.current;
      if (element && !isTextarea) {
        if (e.deltaY > 0) {
          element.scrollBy({
            top: element.clientHeight,
            behavior: 'smooth',
          });
        } else {
          element.scrollBy({
            top: -element.clientHeight,
            behavior: 'smooth',
          });
        }
      }
    }
  };
  // wheel event 감지 & 작동
  useEffect(() => {
    const element = containerRef.current;
    const wheelHandler = handleWheel();

    if (element) {
      element.addEventListener('wheel', wheelHandler);
      return () => {
        element.removeEventListener('wheel', wheelHandler);
      };
    }
  }, [requestStep]);
  // 새로고침 경고
  useEffect(() => {
    const handleBeforeUnload = (e: any) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    if (formData.category !== '') {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [formData.category]);
  // 문의 단계 표시
  const handleNext = (e: any) => {
    if (requestStep < 3) {
      if (requestStep === 0) {
        if (formData.category === '') {
          alert('카테고리를 선택해주세요.');
          return;
        }
      } else if (requestStep === 1) {
        const isValidTel = telCheck(formData.contact);
        const isValidEmail = emailCheck(formData.email);
        if (formData.clientName === '' || formData.organization === '') {
          alert('직책을 제외한 모든 칸에 입력을 해주세요.');
          return;
        }
        if (!isValidTel || formData.contact === '') {
          alert('연락처 형식이 올바르지 않습니다. 다시 입력해주세요.');
          return;
        }
        if (!isValidEmail) {
          alert('이메일 형식이 올바르지 않습니다. 다시 입력해주세요.');
          return;
        }
      } else if (requestStep === 2) {
        if (formData.description === '') {
          alert('프로젝트에 대한 설명을 입력해주세요.');
          return;
        }
        handleSubmit(e);
      }
      setRequestStep(requestStep + 1);
    }
  };
  const handlePrev = () => {
    if (requestStep > 0) {
      setRequestStep(requestStep - 1);
    }
  };
  const categories = [
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Documentary', label: 'Documentary' },
    { value: 'Channel Operating', label: 'Channel Operating' },
    { value: 'Branded', label: 'Branded' },
    { value: 'Motion Graphic', label: 'Motion Graphic' },
    { value: 'Animation', label: 'Animation' },
    { value: 'Live Commerce', label: 'Live Commerce' },
  ];
  const handleButtonClick = (category: string) => {
    setSelectedCategory(category);
    setFormData({
      ...formData,
      category: category,
    });
  };
  const emailCheck = (email: any) => {
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    if (!emailRegEx.test(email)) {
      return false;
    }
    return true;
  };
  const telCheck = (tel: any) => {
    const telRegEx = /^[0-9]*-[0-9]*-[0-9]{0,13}$/;
    if (!telRegEx.test(tel) || tel === '') {
      return false;
    }
    return true;
  };
  const handleDataChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const FileTextRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFileList([...fileList, ...Array.from(selectedFiles)]);
      if (selectedFiles.length > 0) {
        const fileNames = Array.from(selectedFiles)
          .map((file) => file.name)
          .join(', ');
        if (FileTextRef.current) {
          FileTextRef.current.value = fileNames;
        }
      } else {
        if (FileTextRef.current) {
          FileTextRef.current.value = '';
        }
      }
    }
  };
  ////////////////////////////////// 프로젝트 제목 데이터 추가 이후 삭제할 코드
  const [inputValue, setInputValue] = useState(''); // 입력 필드의 상태를 추적

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };
  ////////////////////////////////// 프로젝트 제목 데이터 추가 이후 삭제할 코드

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const requestData = new FormData();
    requestData.append('request', new Blob([JSON.stringify(formData)], { type: 'application/json' }));
    fileList.forEach((file) => {
      requestData.append('files', file);
    });
    axios
      .post(`http://3.36.95.109:8080/api/requests`, requestData, {})
      .then((response) => {
        console.log('response.data : ', response.data);
        setFormData({
          // 폼 데이터 초기화
          category: '',
          clientName: '',
          organization: '',
          email: '',
          contact: '',
          description: '',
          position: '',
          // projectName: '',
        });
        setFileList([]);
        console.log(formData, '제출');
      })
      .catch((error) => {
        alert('예기치 못한 에러가 발생했습니다.');
        console.error('에러 발생', error);
      });
  };

  const notValidAddress = (address: string | undefined | null) => {
    return !address || address.length > 80;
  };

  const notValidString = (info: string | undefined | null) => {
    return !info || info.length > 18;
  };

  return (
    <Container ref={containerRef}>
      <IntroSection>
        <div style={{ width: '40vw' }}>
          <IntroTitleWrapper>
            <IntroTitleCONTACT>CONTACT</IntroTitleCONTACT>
            <IntroTitleUS>US</IntroTitleUS>
          </IntroTitleWrapper>
          <IntroSubTitleWrapper>
            <IntroSubtitle>대한민국 No.1 뉴미디어 전문 제작사 스튜디오 아이와 함께 해보세요!</IntroSubtitle>
          </IntroSubTitleWrapper>
          <IntroAboutWrapper>
            <div>
              <IntroAdress>Address</IntroAdress>
              {notValidAddress(companyBasicData.address) ? (
                <IntroAdress style={{ color: '#FFFFFF' }}>서울시 성동구 광나루로 162 BS성수타워 5층</IntroAdress>
              ) : (
                <IntroAdress style={{ color: '#FFFFFF' }}>{companyBasicData.address}</IntroAdress>
              )}
              {notValidAddress(companyBasicData.addressEnglish) ? (
                <IntroAdress style={{ color: '#FFFFFF' }}>
                  5F, 162, Gwangnaru-ro, Seongdong-gu, Seoul, Korea
                </IntroAdress>
              ) : (
                <IntroAdress style={{ color: '#FFFFFF' }}>{companyBasicData.addressEnglish}</IntroAdress>
              )}
            </div>
          </IntroAboutWrapper>
          <IntroNumberWrapper>
            <div>
              <IntroNumber>tel</IntroNumber>
              {notValidString(companyBasicData.phone) ? (
                <IntroNumber style={{ color: '#FFFFFF' }}>02-2038-2663</IntroNumber>
              ) : (
                <IntroNumber style={{ color: '#FFFFFF' }}>{companyBasicData.phone}</IntroNumber>
              )}
            </div>
            <div>
              <IntroNumber>fax</IntroNumber>
              {notValidString(companyBasicData.fax) ? (
                <IntroNumber style={{ color: '#FFFFFF' }}>070-7549-2443</IntroNumber>
              ) : (
                <IntroNumber style={{ color: '#FFFFFF' }}>{companyBasicData.fax}</IntroNumber>
              )}
            </div>
          </IntroNumberWrapper>
        </div>
        <BlurryCircle style={{ top: '50%', left: '-5%' }} />
        <BlurryCircle style={{ top: '10%', left: '85%' }} />
      </IntroSection>

      <RequestSection>
        <RequestContentsContainer>
          <RequestLeftContentsContainer>
            <RequestStepContainer>
              <RequestStepCircle filled={requestStep === 0}>1</RequestStepCircle>
              <RequestStepLine></RequestStepLine>
              <RequestStepCircle filled={requestStep === 1}>2</RequestStepCircle>
              <RequestStepLine></RequestStepLine>
              <RequestStepCircle filled={requestStep === 2}>3</RequestStepCircle>
              <RequestStepLine></RequestStepLine>
              <RequestStepCircle filled={requestStep === 3}>4</RequestStepCircle>
            </RequestStepContainer>
            {requestStep === 3 ? (
              <></>
            ) : (
              <>
                <RequestExplanationWrapper>
                  <RequestExplanation fontSize='20px' fontFamily='Pretendard-Regular'>
                    Project Request
                  </RequestExplanation>
                  {requestStep === 0 ? (
                    <RequestExplanation>문의할 프로젝트 항목을 선택해주세요. *</RequestExplanation>
                  ) : requestStep === 1 ? (
                    <RequestExplanation>인적사항을 입력해주세요.</RequestExplanation>
                  ) : (
                    <RequestExplanation>프로젝트 정보를 입력해주세요.</RequestExplanation>
                  )}
                </RequestExplanationWrapper>
                <RequestLeftLogoWrapper>
                  <RequestLeftLogo src={logo} alt='로고' />
                </RequestLeftLogoWrapper>
              </>
            )}
          </RequestLeftContentsContainer>
          {requestStep === 3 ? (
            <RequestRightContentsContainer />
          ) : (
            <RequestRightContentsContainer>
              {requestStep === 0 ? (
                <RequestInputWrapper>
                  <RequestCategoryButtonWrapper>
                    {categories.map((category) => (
                      <RequestCategoryButton
                        key={category.value}
                        checked={selectedCategory === category.value}
                        onClick={() => handleButtonClick(category.value)}
                      >
                        {category.label}
                      </RequestCategoryButton>
                    ))}
                  </RequestCategoryButtonWrapper>
                </RequestInputWrapper>
              ) : requestStep === 1 ? (
                <RequestInputWrapper>
                  <RequestInfoInput
                    autoComplete='off'
                    type='text'
                    placeholder='성함을 입력해주세요 *'
                    value={formData.clientName}
                    name='clientName'
                    onChange={handleDataChange}
                  ></RequestInfoInput>
                  <RequestInfoInput
                    autoComplete='off'
                    type='text'
                    placeholder='기관 혹은 기업명을 입력해주세요 *'
                    value={formData.organization}
                    name='organization'
                    onChange={handleDataChange}
                  ></RequestInfoInput>
                  <RequestInfoInput
                    autoComplete='off'
                    type='text'
                    placeholder='연락처를 입력해주세요 *'
                    value={formData.contact}
                    name='contact'
                    onChange={handleDataChange}
                  ></RequestInfoInput>
                  <RequestInfoInput
                    autoComplete='off'
                    type='email'
                    placeholder='@이하 도메인을 포함한 이메일 주소를 입력해주세요 *'
                    value={formData.email}
                    name='email'
                    onChange={handleDataChange}
                  ></RequestInfoInput>
                  <RequestInfoInput
                    autoComplete='off'
                    type='position'
                    placeholder='직책을 입력해주세요'
                    value={formData.position}
                    name='position'
                    onChange={handleDataChange}
                  ></RequestInfoInput>
                </RequestInputWrapper>
              ) : (
                <RequestInputWrapper>
                  <RequestInfoInput
                    autoComplete='off'
                    ///////////////////////////////////////// 삭제 예정
                    type='text'
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder='제목을 입력해주세요.'
                    /////////////////////////////////////////
                    // type='projectName'
                    //   placeholder='제목을 입력해주세요.'
                    //   value={formData.projectName}
                    //   name='projectName'
                    //   onChange={handleDataChange}
                  ></RequestInfoInput>
                  <RowWrapper>
                    <RequestFileText ref={FileTextRef} type='text' readOnly></RequestFileText>
                    <RequestFileUploadInput
                      id='uploadfile'
                      type='file'
                      accept='*/*'
                      multiple
                      onChange={handleFileChange}
                    />
                    <RequestUploadLabel htmlFor='uploadfile'>파일 선택</RequestUploadLabel>
                  </RowWrapper>
                  <RequestInfoTextarea
                    autoComplete='off'
                    id='myTextarea'
                    placeholder='프로젝트 설명을 적어주세요 *'
                    value={formData.description}
                    name='description'
                    onChange={handleDataChange}
                  ></RequestInfoTextarea>
                </RequestInputWrapper>
              )}
              <RequestStepButtonWrapper>
                <RequestStepButton onClick={handlePrev} disabled={requestStep === 0}>
                  이전
                </RequestStepButton>
                <RequestStepButton onClick={handleNext} disabled={requestStep >= 3}>
                  {requestStep === 3 ? '문의 접수' : '다음'}
                </RequestStepButton>
              </RequestStepButtonWrapper>
            </RequestRightContentsContainer>
          )}
        </RequestContentsContainer>
        {requestStep === 3 ? (
          <>
            <RequestCompleteContentWrapper>
              <RequestExplanation style={{ textAlign: 'center', marginBottom: 30 }}>
                문의가 정상적으로 접수되었습니다.
              </RequestExplanation>
              <RequestExplanation style={{ textAlign: 'center' }} fontSize='20px' fontFamily='Pretendard-Regular'>
                담당자 배정 후 연락 드리겠습니다. 감사합니다.
              </RequestExplanation>
            </RequestCompleteContentWrapper>
            <RequestLeftLogoWrapper style={{ width: '50%', alignItems: 'center' }}>
              <RequestLeftLogo src={logo} alt='로고' />
            </RequestLeftLogoWrapper>
            <BackToMainButton
              onClick={() => {
                console.log(formData);
                navigator(`/${PP_ROUTES.MAIN}`);
              }}
            >
              메인화면으로
            </BackToMainButton>
          </>
        ) : null}
      </RequestSection>
    </Container>
  );
};

export default ContactUsPage;

const Container = styled.div`
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-snap-type: y mandatory; // 수직 스냅
  scrollbar-width: none; // 파이어폭스 스크롤바 숨김
  -ms-overflow-style: none; // 인터넷 익스플로러/엣지 스크롤바 숨김
  &::-webkit-scrollbar {
    display: none; // 크롬/사파리 스크롤바 숨김
  }
`;

const IntroSection = styled.div`
  height: 100vh; // 전체 화면 높이
  scroll-snap-align: start; // 섹션의 시작점에 스냅
  background-color: black;
  position: relative; // 구형 도형의 위치 지정
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BlurryCircle = styled.div`
  position: absolute;
  background-color: rgba(255, 169, 0, 0.3);
  border-radius: 50%;
  width: 450px;
  height: 450px;
  filter: blur(40px);
`;
const IntroTitleWrapper = styled.div`
  display: flex;
  flex-directrion: 'row';
  justify-content: center;
`;
const IntroTitleCONTACT = styled.div`
  font-family: 'Pretendard-Bold';
  font-size: 100px;
  color: #ffffff;
`;
const IntroTitleUS = styled.div`
  margin-left: 20px;
  font-family: 'Pretendard-Bold';
  font-size: 100px;
  color: #ffa900;
`;
const IntroSubTitleWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IntroSubtitle = styled.div`
  font-family: 'Pretendard-SemiBold';
  font-size: 20px;
  color: #ffffff;
`;
const IntroAboutWrapper = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const IntroAdress = styled.div`
  margin-bottom: 20px;
  font-family: 'Pretendard-Medium';
  font-size: 20px;
  color: #8a8a8a;
  text-align: left;
  max-width: 40vw;
  word-wrap: break-word;
`;
const IntroNumberWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;
const IntroNumber = styled.div`
  font-family: 'Pretendard-Medium';
  font-size: 20px;
  color: #8a8a8a;
  text-align: left;
  padding: 10px;
  max-width: 20vw;
  word-wrap: break-word;
`;
const RequestSection = styled.div`
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
`;
const RequestContentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const RequestLeftContentsContainer = styled.div`
  margin-left: 200px;
  display: flex;
  flex-direction: column;
  width: 45%;
`;
const RequestRightContentsContainer = styled.div`
  margin-right: 200px;
  padding-left: 150px;
  display: flex;
  flex-direction: column;
  width: 45%;
  justify-content: center;
  align-items: center;
`;
const RequestStepContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const RequestStepCircle = styled.div<ICircleProps>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid white;
  background-color: ${(props) => (props.filled ? '#ffa900' : 'transparent')};
  display: inline-block;
  font-family: 'Pretendard-SemiBold';
  font-size: 20px;
  color: #ffffff;
  align-content: center;
  text-align: center;
`;
const RequestStepLine = styled.div`
  width: 80px;
  height: 0;
  border: 1px solid white;
`;
const RequestExplanationWrapper = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
`;
const RequestExplanation = styled.div<IFontStyleProps>`
  margin-bottom: 10px;
  font-family: ${(props) => props.fontFamily || 'Pretendard-SemiBold'};
  font-size: ${(props) => props.fontSize || '40px'};
  color: #ffffff;
  text-align: left;
`;
const RequestLeftLogoWrapper = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 100%;
`;
const RequestLeftLogo = styled.img`
  width: 90%;
  height: auto;
  opacity: 0.1;
`;

const RequestInputWrapper = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const RequestCategoryButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const RequestCategoryButton = styled.button<IButtonProps>`
  border: 1px solid white;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.checked ? '#ffa900' : '#212121')};
  }
  height: 70px;
  width: 45%;
  text-align: center;
  align-items: center;
  background-color: ${(props) => (props.checked ? '#ffa900' : 'black')};
  font-family: 'Pretendard-Medium';
  font-size: 30px;
  color: white;
  margin-bottom: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const RequestInfoInput = styled.input`
  margin-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  outline: none;
  border: 2px solid gray;
  background-color: transparent;
  height: 60px;
  width: 100%;
  font-family: 'Pretendard-Medium';
  font-size: 20px;
  color: white;
  line-height: 30px;
`;
const RequestInfoTextarea = styled.textarea`
  box-sizing: border-box;
  padding: 10px;
  resize: none;
  border: 2px solid gray;
  outline: none;
  width: 100%;
  height: 300px;
  font-family: 'Pretendard-Medium';
  font-size: 20px;
  color: white;
  overflow-y: auto;
  line-height: 30px;
  display: block;
  overflow-wrap: break-word;
  background-color: transparent;
`;
const RequestFileText = styled.input`
  margin-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  outline: none;
  border: 2px solid gray;
  background-color: transparent;
  height: 60px;
  width: 100%;
  font-family: 'Pretendard-Medium';
  font-size: 20px;
  color: white;
  line-height: 30px;
`;
const RequestUploadLabel = styled.label`
  margin-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  outline: none;
  border: 2px solid gray;
  background-color: white;
  height: 60px;
  width: 40%;
  font-family: 'Pretendard-Medium';
  font-size: 20px;
  color: black;
  line-height: 30px;
  text-align: center;
  align-items: center;
  align-content: center;
`;
const RequestFileUploadInput = styled.input.attrs({ type: 'file' })`
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0 none;
`;

const RequestStepButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const RequestStepButton = styled.button<IButtonProps>`
  border: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: transform 0.2s;
  &:hover {
    cursor: ${(props) => (props.disabled ? '' : 'pointer')};
    background-color: ${(props) => (props.disabled ? '#ffa900' : '#ff7800')};
    transform: ${(props) => (props.disabled ? 'none' : 'scale(1.01)')}; // 호버 시 크기 증가
  }
  height: 70px;
  width: 45%;
  text-align: center;
  align-items: center;
  background-color: #ffa900;
  font-family: 'Pretendard-SemiBold';
  font-size: 30px;
  color: white;
`;
const RequestCompleteContentWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;
const BackToMainButton = styled.button`
  margin-top: 50px;
  border: 2px solid white;
  transition: transform 0.2s;
  &:hover {
    cursor: pointer;
    background-color: #ffa900;
    transform: scale(1.01);
  }
  height: 70px;
  width: 200px;
  text-align: center;
  align-items: center;
  background-color: transparent;
  font-family: 'Pretendard-SemiBold';
  font-size: 25px;
  color: white;
`;
