import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import BasicInfo from './InfoCard/Basic';
import BasicEdit from './EditForm/Basic';
import DetailInfo from './InfoCard/Detail';
import DetailEdit from './EditForm/Detail';
import ImageInfo from './InfoCard/Image';
import ImageEdit from './EditForm/Image';
import IntroductionInfo from './InfoCard/Introduction';
import IntroductionEdit from './EditForm/Introduction';

const CompanyInfo = () => {
  const { data, isLoading, error } = useQuery<ICompanyData, Error>(['client', 'id'], getCompanyData);
  const [editBasic, setEditBasic] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [editIntroduction, setEditIntroduction] = useState(false);
  const [editDetail, setEditDetail] = useState(false);

  const handleEditChange = (editType: string) => {
    if (
      [editBasic, editImage, editIntroduction, editDetail].filter((v) => v).length > 0 &&
      !window.confirm(`변경사항을 잃을 수 있습니다. ${editType}을(를) 수정하시겠습니까?`)
    ) {
      return;
    }
    // 모든 편집 상태를 false로 초기화
    setEditBasic(false);
    setEditImage(false);
    setEditIntroduction(false);
    setEditDetail(false);

    // 선택된 편집 유형에 따라 해당 상태를 true로 설정
    switch (editType) {
      case 'basic':
        setEditBasic(true);
        break;
      case 'image':
        setEditImage(true);
        break;
      case 'introduction':
        setEditIntroduction(true);
        break;
      case 'detail':
        setEditDetail(true);
        break;
      default:
        break;
    }
  };

  if (isLoading) return <>is Loading...</>;
  if (error) return <>{error.message}</>;
  return (
    <>
      <Wrapper>
        {data && (
          <>
            <div>
              {/* Basic */}

              {editBasic ? (
                <BasicEdit setEditBasic={setEditBasic} />
              ) : (
                <BasicInfo setEditBasic={() => handleEditChange('basic')} />
              )}

              {/* Image */}

              {editImage ? (
                <ImageEdit setEditImage={setEditImage} />
              ) : (
                <ImageInfo setEditImage={() => handleEditChange('image')} />
              )}
            </div>

            <div>
              {/* Introduntion */}

              {editIntroduction ? (
                <IntroductionEdit setEditIntroduction={setEditIntroduction} />
              ) : (
                <IntroductionInfo setEditIntroduction={() => handleEditChange('introduction')} />
              )}

              {/* Detail */}
              {editDetail ? (
                <DetailEdit setEditDetail={setEditDetail} />
              ) : (
                <DetailInfo setEditDetail={() => handleEditChange('detail')} />
              )}
            </div>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default CompanyInfo;

const Wrapper = styled.div`
  display: flex;

  input,
  textarea {
    outline: none;
  }

  input:focus,
  textarea:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }
`;
