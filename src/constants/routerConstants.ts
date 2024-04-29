// 추후에 진짜 PA, PP로 반영하여 추가

export const PA_ROUTES = {
  HOME: '/pa-test/home',
  REQUEST: '/pa-test/request',
  ARTWORK: '/pa-test/artwork',
  PAGE_EDIT: '/pa-test/pageEdit',
  STATISTICS: '/pa-test/statistics',
  FAQ: '/pa-test/faq',
  SETTING: '/pa-test/setting',
};

export const PA_ROUTES_CHILD = {
  HOME: 'home',
  REQUEST: 'request',
  REQUEST_DETAIL: 'request/:id',
  ARTWORK: 'artwork',
  PAGE_EDIT: 'pageEdit',
  STATISTICS: 'statistics',
  FAQ: 'faq',
  SETTING: 'setting',
};

export const PP_ROUTES_CHILD = {
  REQUEST: 'request',
  ARTWORK: 'artwork',
  ARTWORK_DETAIL: 'artwork/:id',
  CONTACT: 'contact',
};
