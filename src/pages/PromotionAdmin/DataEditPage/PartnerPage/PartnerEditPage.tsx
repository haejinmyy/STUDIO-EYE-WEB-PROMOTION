import { getPartnersData } from '@/apis/PromotionAdmin/dataEdit';
import { DATAEDIT_PATH } from '@/components/PromotionAdmin/DataEdit/DetailNavigator';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { PA_ROUTES } from '@/constants/routerConstants';
import { IPartnersData } from '@/types/PromotionAdmin/dataEdit';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function PartnerEditPage() {
  const { data, isLoading } = useQuery<IPartnersData[]>(['partners', 'id'], getPartnersData);
  const navigator = useNavigate();
  const partnerEditMatch = useMatch(`${PA_ROUTES.DATA_EDIT}/partner/:partnerId`);
  const clickedPartner =
    partnerEditMatch?.params.partnerId &&
    data?.find((p) => String(p.partnerInfo.id) === partnerEditMatch.params.partnerId);

  const { register, handleSubmit } = useForm<IPartnersData>({
    defaultValues: {
      logoImg: clickedPartner ? clickedPartner.logoImg : '',
      partnerInfo: {
        id: clickedPartner ? clickedPartner.partnerInfo.id : 0,
        is_main: clickedPartner ? clickedPartner.partnerInfo.is_main : true,
        link: clickedPartner ? clickedPartner.partnerInfo.link : '',
      },
    },
  });

  const [putData, setPutData] = useState({
    partnerInfo: {
      id: clickedPartner && clickedPartner.partnerInfo.id,
      is_main: clickedPartner && clickedPartner.partnerInfo.is_main,
      link: clickedPartner && clickedPartner.partnerInfo.link,
    },
    logoImg: clickedPartner && clickedPartner.logoImg,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPutData((prevData) => ({
      ...prevData,
      partnerInfo: {
        ...prevData.partnerInfo,
        [name]: value,
      },
    }));
  };

  const [logoImage, setLogoImage] = useState(clickedPartner ? clickedPartner.logoImg : '');

  const onValid = (data: IPartnersData) => {
    const formData = {
      logoImg: data.logoImg,
      partnerInfo: {
        id: data.partnerInfo.id,
        is_main: data.partnerInfo.is_main,
        link: data.partnerInfo.link,
      },
    };
    // if (window.confirm('수정하시겠습니까?')) {
    //   axios
    //     .put(`${PROMOTION_BASIC_PATH}/api/partners`, formData)
    //     .then((response) => {
    //       alert('FAQ가 수정되었습니다.');
    //     })
    //     .catch((error) => console.log(error));
    // }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .delete(`${PROMOTION_BASIC_PATH}/api/partners/${id}`)
        .then((response) => {})
        .catch((error) => console.log(error));

      alert('삭제되었습니다.');
      navigator(`${PA_ROUTES.DATA_EDIT}/partner?${DATAEDIT_PATH.PARTNER}`);
    }
  };

  if (isLoading) return <>is Loading..</>;
  return (
    <Wrapper>
      {clickedPartner && (
        <form onSubmit={handleSubmit(onValid)}>
          <VisibilityWrapper>
            공개여부
            <input
              type='checkbox'
              defaultChecked={clickedPartner ? clickedPartner.partnerInfo.is_main : true}
              {...register('partnerInfo.is_main')}
            />
          </VisibilityWrapper>

          <Content>
            <Title>Link</Title>
            <input
              {...register('partnerInfo.link', {
                required: '링크를 입력해주세요',
              })}
              placeholder='링크를 입력해주세요'
            />
          </Content>

          <Content>
            <Title>Logo</Title>
            <input type='file' accept='image/*' onChange={handleImageChange} />
            <ImgWrapper>
              <img src={logoImage} />
            </ImgWrapper>
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
