// 추후에 진짜 PA, PP로 반영하여 추가

export const PA_ROUTES = {
  HOME: '/pa-test/home',
  REQUEST: '/pa-test/request',
  ARTWORK: '/pa-test/artwork',
  DATA_EDIT: '/pa-test/dataEdit',
  STATISTICS: '/pa-test/statistics',
  FAQ: '/pa-test/faq',
  SETTING: '/pa-test/setting',
};

export const PA_ROUTES_CHILD = {
  HOME: 'home',
  REQUEST: 'request',
  REQUEST_DETAIL: 'request/:id',
  ARTWORK: 'artwork',
  DATA_EDIT: 'dataEdit',
  STATISTICS: 'statistics',
  FAQ: 'faq',
  SETTING: 'setting',
};

export const PP_ROUTES_CHILD = {
  MAIN: '',
  ABOUT: 'about',
  REQUEST: 'request',
  ARTWORK: 'artwork',
  ARTWORK_DETAIL: 'artwork/:id',
  CONTACT: 'contact',
};

export const PP_ROUTES = {
  MAIN: '',
  ABOUT: '/about',
  REQUEST: '/request',
  ARTWORK: '/artwork',
  ARTWORK_DETAIL: 'artwork/:id',
  CONTACT: '/contact',
};
