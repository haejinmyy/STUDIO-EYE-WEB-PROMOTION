import { getAllArtworks } from '@/apis/PromotionAdmin/artwork';
import { PA_ROUTES } from '@/constants/routerConstants';
import { ArtworkData } from '@/types/PromotionAdmin/artwork';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ArtworkBox from './ArtworkBox';
import CategoryDropDown from './CategoryDropDown';

const Artwork = () => {
  const { data, isLoading, error } = useQuery<ArtworkData[], Error>('artworks', getAllArtworks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  if (isLoading) return <LoadingWrapper>Loading...</LoadingWrapper>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredArtworks = data
    ? data.filter((artwork) => {
        const isMatchingSearch = artwork.name.toLowerCase().includes(searchQuery.toLowerCase());
        const isMatchingCategory = selectedCategory === '' || artwork.category === selectedCategory;
        return isMatchingSearch && isMatchingCategory;
      })
    : [];

  return (
    <Container>
      <ArtworkBoxWrapper>
        <UtilWrapper>
          <SearchWrapper>
            <input
              placeholder='아트워크 이름으로 검색하기'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchWrapper>
          <CategoryWrapper>
            <CategoryDropDown setSelectedCategory={setSelectedCategory} />
          </CategoryWrapper>
        </UtilWrapper>

        {filteredArtworks.length === 0 ? (
          <NoDataWrapper>😊 아트워크 데이터가 존재하지 않습니다.</NoDataWrapper>
        ) : (
          <>
            {filteredArtworks.map((artwork) => (
              <LinkStyle to={`${PA_ROUTES.ARTWORK}/${artwork.id}`} key={artwork.id}>
                <ArtworkBox
                  mainImg={artwork.mainImg}
                  client={artwork.client}
                  name={artwork.name}
                  isPosted={artwork.isPosted}
                  id={artwork.id}
                  department={artwork.department}
                  category={artwork.category}
                  date={artwork.date}
                  link={artwork.link}
                  overView={artwork.overView}
                  projectType={artwork.projectType}
                  projectImages={artwork.projectImages}
                />
              </LinkStyle>
            ))}
          </>
        )}
      </ArtworkBoxWrapper>
      <Outlet />
    </Container>
  );
};

export default Artwork;

const Container = styled.div`
  display: flex;
  width: 100%;
`;
const LinkStyle = styled(Link)`
  text-decoration: none;
  margin-bottom: 20px;
`;
const ArtworkBoxWrapper = styled.div`
  width: 700px;
  height: fit-content;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
`;

const NoDataWrapper = styled.div`
  font-family: 'pretendard-medium';
  font-size: 17px;
`;

const LoadingWrapper = styled.div`
  font-family: 'pretendard-regular';
  font-size: 17px;
`;
const SearchWrapper = styled.div`
  input {
    width: 300px;
    height: 30px;
    padding-left: 20px;
    font-family: 'pretendard-medium';
    outline-style: none;
    border-radius: 5px;
    font-size: 15px;
    border: none;
    background-color: #e9e9e9;
    color: black;
    margin-bottom: 20px;
    &:hover {
      cursor: pointer;
      background-color: #ffffff73;
      transition: all 300ms ease-in-out;
    }
    &:focus {
      background-color: white;
      transition: all 300ms ease-in-out;
    }
    ::placeholder {
      color: #7a7a7a;
    }
  }
`;

const CategoryWrapper = styled.div``;
const UtilWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
