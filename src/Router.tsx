import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import PromotionMainpage from './Pages/MainPage/PromotionMainPage';
import AboutMainpage from './Pages/AboutPage/AboutMainPage';
import ArtworkMainpage from './Pages/ArtworkPage/ArtworkMainPage';
import ContentDetailPage from './Pages/DetailPage/ContentDetailPage';
import AdminMainPage from './Pages/AdminPage/AdminMainPage';
import AdminEditPage from './Pages/AdminPage/AboutEditPage';
import ArtworkEditPage from './Pages/AdminPage/ArtworkEditPage';
import ContactEditPage from './Pages/AdminPage/ContactEditPage';
import MainEditPage from './Pages/AdminPage/MainEditPage';
import ContactPage from './Pages/ContactPage/ContactPage';
import LoginPage from './Pages/LoginPage/LoginMainPage';
import PAHomePage from './Pages/PromotionAdmin/HomePage/index';
import PARequestPage from './Pages/PromotionAdmin/RequestPage/index';
import PAArtworkPage from './Pages/PromotionAdmin/ArtworkPage/index';
import PAPageEditPage from './Pages/PromotionAdmin/PageEditPage/index';
import PAStatisticsPage from './Pages/PromotionAdmin/StatisticsPage/index';
import PAFaqPage from './Pages/PromotionAdmin/FaqPage/index';
import PASettingPage from './Pages/PromotionAdmin/SettingPage/index';
import AdminLayout from './Components/PromotionAdmin/Layout/Layout';
import { PA_ROUTES_CHILD } from '@/constants/routerConstants';
import FaqPage from './Pages/FaqPage/FaqPAge';
import FaqDetailPage from './Pages/DetailPage/FaqDetailPage';
import FAQMainPage from './Pages/PromotionAdmin/FaqPage/FAQMainPage';
import FAQWritePage from './Pages/PromotionAdmin/FaqPage/FAQWritePage';
import FAQManagePage from './Pages/PromotionAdmin/FaqPage/FAQManagePage';
import PARequestDetailPage from '@/Pages/PromotionAdmin/RequestPage/RequestDetailPage/RequestDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <PromotionMainpage />,
        children: [
          {
            path: 'about',
            element: <AboutMainpage />,
          },
          {
            path: 'contents',
            element: <ArtworkMainpage />,
          },
          {
            path: 'detail/:detailId',
            element: <ContentDetailPage />,
          },
          {
            path: 'login',
            element: <LoginPage />,
          },

          {
            path: 'contact',
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
        path: '/faq',
        element: <FaqPage />,
      },
      {
        path: '/faq/detail/:detailId',
        element: <FaqDetailPage />,
      },
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
