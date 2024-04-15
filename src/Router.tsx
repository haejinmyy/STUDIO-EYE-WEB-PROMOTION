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
import PAArtworkPage from './pages/PromotionAdmin/ArtworkPage/index';
import PAPageEditPage from './pages/PromotionAdmin/PageEditPage/index';
import PAStatisticsPage from './pages/PromotionAdmin/StatisticsPage/index';
import PAFaqPage from './pages/PromotionAdmin/FaqPage/index';
import PASettingPage from './pages/PromotionAdmin/SettingPage/index';
import AdminLayout from './components/PromotionAdmin/Layout/Layout';
import { PA_ROUTES_CHILD } from '@/constants/routerConstants';
import FaqPage from './pages/PromotionPage/FaqPage/FaqPAge';
import FaqDetailPage from './pages/PromotionPage/FaqPage/FaqDetailPage';
import FAQMainPage from './pages/PromotionAdmin/FaqPage/FAQMainPage';
import FAQWritePage from './pages/PromotionAdmin/FaqPage/FAQWritePage';
import FAQManagePage from './pages/PromotionAdmin/FaqPage/FAQManagePage';
import PARequestDetailPage from '@/pages/PromotionAdmin/RequestPage/RequestDetailPage/RequestDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <PromotionMainpage />,
      },
      {
        path: '/about',
        element: <AboutMainpage />,
      },
      {
        path: '/contents',
        element: <ArtworkMainpage />,
      },
      {
        path: '/detail/:detailId',
        element: <ContentDetailPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },

      {
        path: '/contact',
        element: <ContactPage />,
      },
      {
        path: '/faq',
        element: <FaqPage />,
      },
      {
        path: '/faq/detail/:detailId',
        element: <FaqDetailPage />,
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
          },
          {
            path: PA_ROUTES_CHILD.REQUEST_DETAIL,
            element: <PARequestDetailPage />,
          },
          {
            path: PA_ROUTES_CHILD.ARTWORK,
            element: <PAArtworkPage />,
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
          },
          {
            path: PA_ROUTES_CHILD.SETTING,
            element: <PASettingPage />,
          },
        ],
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
        path: '/admin/faq',
        element: <FAQMainPage />,
        children: [
          {
            path: '',
            element: <FAQManagePage />,
          },
          {
            path: '/admin/faq/write/:faqId',
            element: <FAQManagePage />,
          },
          {
            path: '/admin/faq/write',
            element: <FAQWritePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
