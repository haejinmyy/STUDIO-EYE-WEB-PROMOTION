import { getPartnersData } from '@/apis/PromotionAdmin/dataEdit';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import { IPartnersData } from '@/types/PromotionAdmin/dataEdit';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface IFormData {
  is_main: boolean;
  link: string;
}

function PartnerEditPage() {
  const { data, isLoading, error } = useQuery<IPartnersData[], Error>(['partners', 'id'], getPartnersData);
  const navigator = useNavigate();
  const partnerEditMatch = useMatch(`${PA_ROUTES.DATA_EDIT}/partner/:partnerId`);
  const clickedPartner =
    partnerEditMatch?.params.partnerId &&
    data?.find((p) => String(p.partnerInfo.id) === partnerEditMatch.params.partnerId);
  const [imgChange, setImgChange] = useState(false);

  const { register, handleSubmit, reset } = useForm<IFormData>({
    defaultValues: {
      is_main: clickedPartner ? clickedPartner.partnerInfo.is_main : true,
      link: clickedPartner ? clickedPartner.partnerInfo.link : '',
    },
  });

  const [putData, setPutData] = useState({
    partnerInfo: {
      id: clickedPartner && clickedPartner.partnerInfo.id,
      is_main: clickedPartner && clickedPartner.partnerInfo.is_main,
      link: clickedPartner && clickedPartner.partnerInfo.link,
    },
    logoImg: clickedPartner ? clickedPartner.logoImg : '',
  });

  useEffect(() => {
    if (clickedPartner) {
      reset({
        link: clickedPartner.partnerInfo.link,
      });
      setPutData({
        partnerInfo: {
          id: clickedPartner.partnerInfo.id,
          is_main: clickedPartner.partnerInfo.is_main,
          link: clickedPartner.partnerInfo.link,
        },
        logoImg: clickedPartner.logoImg,
      });
    }
  }, [partnerEditMatch?.params.partnerId, reset]);

  const onValid = (data: IFormData) => {
    handleSaveClick(data);
  };

  const handleSaveClick = async (data: IFormData) => {
    const formData = new FormData();

    formData.append(
      'partnerInfo',
      new Blob(
        [
          JSON.stringify({
            id: putData.partnerInfo.id,
            is_main: data.is_main,
            link: data.link,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    if (window.confirm('수정하시겠습니까?')) {
      if (imgChange) {
        // 이미지를 변경한 경우
        const file = await urlToFile(putData.logoImg, 'Logo.png');
        if (file) {
          formData.append('logoImg', file);
        } else {
          console.error('로고 이미지 가져오기 실패');
        }

        axios
          .put(`${PROMOTION_BASIC_PATH}/api/partners`, formData)
          .then((response) => {
            console.log('Partner updated:', response);
            alert('수정되었습니다.');
            navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_PARTNER}`);
          })
          .catch((error) => console.error('Error updating partner:', error));
      } else {
        // 이미지를 변경하지 않은 경우
        axios
          .put(`${PROMOTION_BASIC_PATH}/api/partners/modify`, formData)
          .then((response) => {
            console.log('Partners updated:', response);
            alert('수정되었습니다.');
            navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_PARTNER}`);
          })
          .catch((error) => console.error('Error updating partner:', error));
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const logoImg = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPutData((prevData) => ({
          ...prevData,
          logoImg: reader.result as string,
        }));
      };
      reader.readAsDataURL(logoImg);
      setImgChange(true);
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

  const handleDelete = (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .delete(`${PROMOTION_BASIC_PATH}/api/partners/${id}`)
        .then((response) => {})
        .catch((error) => console.log(error));

      alert('삭제되었습니다.');
      navigator(`${PA_ROUTES.DATA_EDIT}/partner`);
    }
  };

  if (isLoading) return <>is Loading..</>;
  if (error) return <>{error.message}</>;
  return (
    <Wrapper>
      {clickedPartner && (
        <form onSubmit={handleSubmit(onValid)}>
          <VisibilityWrapper>
            공개여부
            <input
              type='checkbox'
              defaultChecked={clickedPartner ? clickedPartner.partnerInfo.is_main : true}
              {...register('is_main')}
            />
          </VisibilityWrapper>

          <Content>
            <Title>Link</Title>
            <input
              {...register('link', {
                required: '링크를 입력해주세요',
              })}
              placeholder='링크를 입력해주세요'
            />
          </Content>

          <Content>
            <Title>Logo</Title>
            {/* <input type='file' accept='image/*' onChange={handleImageChange} />
            <ImgWrapper>
              <img src={putData.logoImg} />
            </ImgWrapper> */}

            <LogoWrapper>
              <img src={putData.logoImg} />
              <label htmlFor='file'>
                <div>Logo Upload</div>
                <input id='file' type='file' accept='image/*' onChange={handleImageChange} />
              </label>
            </LogoWrapper>
          </Content>
          <button>Submit</button>
          <button
            onClick={() => {
              handleDelete(clickedPartner.partnerInfo.id);
            }}
          >
            Delete
          </button>
        </form>
      )}
    </Wrapper>
  );
}

export default PartnerEditPage;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  font-size: 1.3rem;
`;

const Content = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  position: fixed;
  left: 50vw;
  margin-left: 100px;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.color.white.bold};
  width: 40vw;
  height: 70vh;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.color.black.bold};
  margin-bottom: 20px;
  border-radius: 10px;
  width: 100%;

  img {
    width: 100px;
  }
`;

const VisibilityWrapper = styled.div`
  font-size: 12px;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  div {
    cursor: pointer;
    border: none;
    background-color: ${(props) => props.theme.color.white.bold};
    box-shadow: 1px 1px 4px 0.1px #c6c6c6;
    padding: 0.4rem 1.4rem;
    border-radius: 0.2rem;
    transition: 0.2s;
    width: 130px;
    display: flex;
    justify-content: center;
    font-weight: 700;
    margin-right: 20px;

    &:hover {
      background-color: ${(props) => props.theme.color.yellow.light};
    }
  }

  input {
    display: none;
  }

  img {
    width: 200px;
    margin-bottom: 10px;
  }
`;
