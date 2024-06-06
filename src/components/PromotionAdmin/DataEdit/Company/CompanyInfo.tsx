import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import BasicInfo from './InfoCard/Basic';
import BasicEdit from './EditForm/Basic';
import DetailInfo from './InfoCard/Detail';
import DetailEdit from './EditForm/Detail';
import Image from './EditForm/Image';
import IntroductionInfo from './InfoCard/Introduction';
import IntroductionEdit from './EditForm/Introduction';

const CompanyInfo = () => {
  const { data, isLoading, error } = useQuery<ICompanyData, Error>(['client', 'id'], getCompanyData);
  const [editBasic, setEditBasic] = useState(false);
  const [editIntroduction, setEditIntroduction] = useState(false);
  const [editDetail, setEditDetail] = useState(false);

  if (isLoading) return <>is Loading...</>;
  if (error) return <>{error.message}</>;
  return (
    <>
      <Wrapper>
        {data && (
          <>
            <div>
              {/* Basic */}
              {editBasic ? <BasicEdit setEditBasic={setEditBasic} /> : <BasicInfo setEditBasic={setEditBasic} />}

              {/* Image */}
              <Image />
            </div>

            <div>
              {/* Introduntion */}
              {editIntroduction ? (
                <IntroductionEdit setEditIntroduction={setEditIntroduction} />
              ) : (
                <IntroductionInfo setEditIntroduction={setEditIntroduction} />
              )}

              {/* Detail */}
              {editDetail ? <DetailEdit setEditDetail={setEditDetail} /> : <DetailInfo setEditDetail={setEditDetail} />}
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
