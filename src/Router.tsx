import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import PromotionMainpage from './pages/MainPage/PromotionMainPage';
import AboutMainpage from './pages/AboutPage/AboutMainPage';
import ArtworkMainpage from './pages/ArtworkPage/ArtworkMainPage';
import ContentDetailPage from './pages/DetailPage/ContentDetailPage';
import AdminMainPage from './pages/AdminPage/AdminMainPage';
import AdminEditPage from './pages/AdminPage/AboutEditPage';
import ArtworkEditPage from './pages/AdminPage/ArtworkEditPage';
import ContactEditPage from './pages/AdminPage/ContactEditPage';
import MainEditPage from './pages/AdminPage/MainEditPage';
import ContactPage from './pages/ContactPage/ContactPage';
import LoginPage from './pages/LoginPage/LoginMainPage';
import PAHomePage from './pages/PromotionAdmin/HomePage/index';
import PARequestPage from './pages/PromotionAdmin/RequestPage/index';
import PAArtworkPage from './pages/PromotionAdmin/ArtworkPage/Artwork';
import PAPageEditPage from './pages/PromotionAdmin/PageEditPage/index';
import PAStatisticsPage from './pages/PromotionAdmin/StatisticsPage/index';
import PAFaqPage from './pages/PromotionAdmin/FaqPage/index';
import PASettingPage from './pages/PromotionAdmin/SettingPage/index';
import AdminLayout from './components/PromotionAdmin/Layout/Layout';
import { PA_ROUTES, PA_ROUTES_CHILD, PP_ROUTES_CHILD } from '@/constants/routerConstants';
import FaqPage from './pages/PromotionPage/FaqPage/FaqPage';
import FaqDetailPage from './pages/PromotionPage/FaqPage/FaqDetailPage';
import FAQWritePage from './pages/PromotionAdmin/FaqPage/FAQWritePage';
import FAQManagePage from './pages/PromotionAdmin/FaqPage/FAQManagePage';
import PARequestDetailPage from '@/pages/PromotionAdmin/RequestPage/RequestCheckPage';
import FAQEditPage from './pages/PromotionAdmin/FaqPage/FAQEditPage';
import FAQCheckPage from './pages/PromotionAdmin/FaqPage/FAQCheckPage';
import PALogin from './pages/PromotionAdmin/Login/Login';
import RequestManagePage from './pages/PromotionAdmin/RequestPage/RequestManagePage';
import RequestCheckPage from './pages/PromotionAdmin/RequestPage/RequestCheckPage';
import PAArtworkDetail from '@/pages/PromotionAdmin/ArtworkPage/ArtworkDetail';
import ArtworkDetailPage from './pages/PromotionPage/ArtworkPage/ArtworkDetailPage';
import ArtworkPage from './pages/PromotionPage/ArtworkPage/ArtworkPage';
import ArtworkLayout from './components/PromotionPage/Artwork/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Root />,
        children: [
          {
            path: '',
            element: <PromotionMainpage />,
          },
          {
            path: 'ABOUT',
            element: <AboutMainpage />,
          },
          {
            path: 'CONTENTS',
            element: <ArtworkMainpage />,
          },
          {
            path: 'DETAIL/:detailId',
            element: <ContentDetailPage />,
          },
          {
            path: 'login',
            element: <PALogin />,
          },

          {
            path: 'CONTACT',
            element: <ContactPage />,
          },
        ],
      },
      // {
      //   path: '/admin',
      //   element: <AdminMainPage />,
      //   children: [
      //     {
      //       path: 'admin/about',
      //       element: <AdminEditPage />,
      //     },
      //     {
      //       path: 'admin/artwork',
      //       element: <ArtworkEditPage />,
      //     },
      //     {
      //       path: 'admin/contact',
      //       element: <ContactEditPage />,
      //     },
      //     {
      //       path: 'admin/mainpage',
      //       element: <MainEditPage />,
      //     },
      //   ],
      // },
      {
        path: '/pa-test',
        element: <AdminLayout />,
        children: [
          {
            path: PA_ROUTES_CHILD.HOME,
            element: <PAHomePage />,
          },
          {
            path: PA_ROUTES_CHILD.REQUEST,
            element: <PARequestPage />,
            children: [
              {
                path: '',
                element: <RequestManagePage />,
                children: [
                  {
                    path: `${PA_ROUTES.REQUEST}/:requestId`,
                    element: <RequestCheckPage />,
                  },
                ],
              },
            ],
          },
          {
            path: PA_ROUTES_CHILD.REQUEST_DETAIL,
            element: <PARequestDetailPage />,
          },
          {
            path: PA_ROUTES_CHILD.ARTWORK,
            element: <PAArtworkPage />,
            children: [
              {
                path: `${PA_ROUTES.ARTWORK}/:artworkId`,
                element: <PAArtworkDetail />,
              },
            ],
          },

          {
            path: PA_ROUTES_CHILD.PAGE_EDIT,
            element: <PAPageEditPage />,
          },
          {
            path: PA_ROUTES_CHILD.STATISTICS,
            element: <PAStatisticsPage />,
          },
          {
            path: PA_ROUTES_CHILD.FAQ,
            element: <PAFaqPage />,
            children: [
              {
                path: '',
                element: <FAQManagePage />,
                children: [
                  {
                    path: `${PA_ROUTES.FAQ}/:faqId`,
                    element: <FAQCheckPage />,
                  },
                  {
                    path: `${PA_ROUTES.FAQ}/write/:faqId`,
                    element: <FAQEditPage />,
                  },
                ],
              },
              {
                path: `${PA_ROUTES.FAQ}/write`,
                element: <FAQWritePage />,
              },
            ],
          },
          {
            path: PA_ROUTES_CHILD.SETTING,
            element: <PASettingPage />,
          },
        ],
      },

      {
        path: PP_ROUTES_CHILD.ARTWORK,
        element: <ArtworkLayout />,
        children: [
          {
            path: '',
            element: <ArtworkPage />,
          },
        ],
      },

      {
        path: PP_ROUTES_CHILD.ARTWORK_DETAIL,
        element: <ArtworkDetailPage />,
      },
      {
        path: '/admin/artwork',
        element: <ArtworkEditPage />,
      },
      {
        path: '/admin/contact',
        element: <ContactEditPage />,
      },
      {
        path: '/admin/mainpage',
        element: <MainEditPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      },
      // {
      //   path: "/contact",
      //   element: <ContactPage2 />,
      // },
      {
        path: '/faq',
        element: <FaqPage />,
      },
      {
        path: '/faq/detail/:detailId',
        element: <FaqDetailPage />,
      },
    ],
  },
]);

export default router;
