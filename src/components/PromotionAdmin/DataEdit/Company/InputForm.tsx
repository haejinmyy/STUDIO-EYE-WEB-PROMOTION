import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface IFormData {
  mainOverview: string;
  commitment: string;
  address: string;
  fax: string;
  introduction: string;
  phone: string;
  detailInformation: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  };
}

const InputForm = () => {
  const navigator = useNavigate();

  return (
    <>
      <Wrapper>
        write
        <form>
          <ContentBlock>
            <Title>Basic</Title>
            <InputWrapper>
              <p>Address</p>
              <input />
              <p>Phone Number</p>
              <input />
              <p>Fax Number</p>
              <input />
            </InputWrapper>
          </ContentBlock>

          <ContentBlock>
            <Title>Introduction</Title>
            <InputWrapper>
              <p>Main Overview</p>
              <input />
              <p>Commitment</p>
              <input />
              <p>Introduction</p>
              <input />
            </InputWrapper>
          </ContentBlock>

          <ContentBlock>
            <Title>Detail</Title>
            <InputWrapper>
              <p>1</p>
              <input />
              <p>2</p>
              <input />
              <p>3</p>
              <input />
            </InputWrapper>
          </ContentBlock>

          <ContentBlock>
            <Title>Logo & Slogan</Title>
            <InputWrapper>
              <LogoWrapper>
                {/* <img src={postData.logoImg} /> */}
                <label htmlFor='file'>
                  <div>Logo Upload</div>
                  <input
                    id='file'
                    type='file'
                    accept='image/*'
                    //    onChange={handleImageChange}
                  />
                </label>
                {/* <img src={postData.logoImg} /> */}
                <label htmlFor='file'>
                  <div>Slogan Upload</div>
                  <input
                    id='file'
                    type='file'
                    accept='image/*'
                    //    onChange={handleImageChange}
                  />
                </label>
              </LogoWrapper>
            </InputWrapper>
          </ContentBlock>
        </form>
      </Wrapper>
    </>
  );
};

export default InputForm;

const Wrapper = styled.div`
  width: 800px;
`;
const ContentBlock = styled.div`
  display: flex;
  /* background-color: pink; */
  padding: 25px 10px;
  /* border-top: 1px solid ${(props) => props.theme.color.black.pale}; */
  border-bottom: 2px solid ${(props) => props.theme.color.black.pale};
`;
const Title = styled.div`
  font-size: 22px;
  font-family: 'pretendard-medium';
  width: 300px;
`;
const InputWrapper = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
  font-family: 'pretendard-light';
  p {
    font-size: 18px;
    padding-top: 7px;
    padding-bottom: 3px;
  }
  input {
    height: 30px;
  }
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
