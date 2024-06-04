import { getAllArtworks } from '@/apis/PromotionAdmin/artwork';
import { PA_ROUTES } from '@/constants/routerConstants';
import { ArtworkData } from '@/types/PromotionAdmin/artwork';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArtworkBox from './ArtworkBox';
import CategoryDropDown from '../CategoryDropDown';
import { useRecoilState } from 'recoil';
import { backdropState } from '@/recoil/atoms';
import BackDrop from '@/components/Backdrop/Backdrop';
import ArtworkCreating from '../ArtworkCreating/ArtworkCreating';
import Pagination from '@/components/Pagination/Pagination';

const Artwork = () => {
  const { data, isLoading, error, refetch } = useQuery<ArtworkData[], Error>('artworks', getAllArtworks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [producingIsOpend, setProducingIsOpened] = useRecoilState(backdropState);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 6;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page') || '1', 10) - 1; // 페이지 인덱스를 0부터 시작하게 조정
    setCurrentPage(page);
  }, [location.search, selectedCategory]);

  if (isLoading) return <LoadingWrapper>Loading...</LoadingWrapper>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredArtworks = data
    ? data.filter((artwork) => {
        const isMatchingSearch = artwork.name.toLowerCase().includes(searchQuery.toLowerCase());
        const isMatchingCategory = selectedCategory === '' || artwork.category.includes(selectedCategory);
        return isMatchingSearch && isMatchingCategory;
      })
    : [];

  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = currentPage * postsPerPage;
  const currentArtworks = filteredArtworks.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber - 1); // 페이지 인덱스를 0부터 시작하게 조정
    navigate(`?page=${pageNumber}`); // URL 쿼리 매개변수 업데이트
  };

  return (
    <>
      {producingIsOpend && <BackDrop children={<ArtworkCreating />} isOpen={producingIsOpend} />}
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
          <ArtworkProducingWrapper onClick={() => setProducingIsOpened(!producingIsOpend)}>
            아트워크 생성하기
          </ArtworkProducingWrapper>

          {filteredArtworks.length === 0 ? (
            <NoDataWrapper>😊 아트워크 데이터가 존재하지 않습니다.</NoDataWrapper>
          ) : (
            <>
              {currentArtworks.map((artwork) => (
                <LinkStyle to={`${PA_ROUTES.ARTWORK}/${artwork.id}?page=${currentPage + 1}`} key={artwork.id}>
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
                    sequence={artwork.sequence}
                    mainSequence={artwork.mainSequence}
                  />
                </LinkStyle>
              ))}
            </>
          )}
          <Pagination postsPerPage={postsPerPage} totalPosts={filteredArtworks.length} paginate={paginate} />
        </ArtworkBoxWrapper>
        <Outlet />
      </Container>
    </>
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
  min-width: 700px;
  height: fit-content;
  min-height: 100px;
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

const CategoryWrapper = styled.div`
  width: 200px;
`;

const UtilWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ArtworkProducingWrapper = styled.div`
  cursor: pointer;
  width: fit-content;
  font-family: 'pretendard-semibold';
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border-radius: 5px;
  margin-bottom: 30px;

  &:hover {
    background-color: #5a6268;
  }
`;
