import { PA_ROUTES } from '@/constants/routerConstants';
import { theme } from '@/styles/theme';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

enum Categories {
  'CEO' = 'CEO',
  'COMPANY' = 'Company',
  'PARTNER' = 'Partner',
  'CLIENT' = 'Client',
}

export const DATAEDIT_PATH = {
  CEO: `key=0`,
  COMPANY: `key=1`,
  PARTNER: `key=2`,
  CLIENT: `key=3`,
};

const categories = [
  {
    name: Categories.CEO,
    key: 0,
    path: `${PA_ROUTES.DATA_EDIT}/ceo`,
  },
  {
    name: Categories.COMPANY,
    key: 1,
    path: `${PA_ROUTES.DATA_EDIT}/company`,
  },
  {
    name: Categories.PARTNER,
    key: 2,
    path: `${PA_ROUTES.DATA_EDIT}/partner`,
  },
  {
    name: Categories.CLIENT,
    key: 3,
    path: `${PA_ROUTES.DATA_EDIT}/client`,
  },
];

function DetailNavigator() {
  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get('key');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log(`Selected category ID: ${categoryId}`);
  }, [categoryId]);

  return (
    <Wrapper>
      <SideBar>
        {categories.map((category, index) => (
          <CategoryWrapper
            key={index}
            onClick={() => {
              navigate(`${category.path}?key=${category.key}`);
              setSelectedCategory(category.key + '');
            }}
            selected={categoryId === category.key + '' ? true : false}
          >
            <Category>{category.name}</Category>
          </CategoryWrapper>
        ))}
      </SideBar>
    </Wrapper>
  );
}

export default DetailNavigator;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.color.white.light};
  position: fixed;
  left: 120px;
  width: 100%;
  top: 80px;
`;

const SideBar = styled.div`
  display: flex;
  width: 100%;
`;

const CategoryWrapper = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${({ selected }) => (selected ? '900' : '500')};
  color: ${({ selected }) => (selected ? theme.color.black.bold : theme.color.black.light)};
  border-bottom: 2.5px solid ${({ selected }) => (selected ? theme.color.yellow.bold : 'none')};
`;

const Category = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
`;
