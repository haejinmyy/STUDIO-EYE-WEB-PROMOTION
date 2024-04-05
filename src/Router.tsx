import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import PromotionMainpage from "./pages/MainPage/PromotionMainPage";
import AboutMainpage from "./pages/AboutPage/AboutMainPage";
import ArtworkMainpage from "./pages/ArtworkPage/ArtworkMainPage";
import ContentDetailPage from "./pages/DetailPage/ContentDetailPage";
import AdminMainPage from "./pages/AdminPage/AdminMainPage";
import AdminEditPage from "./pages/AdminPage/AboutEditPage";
import ArtworkEditPage from "./pages/AdminPage/ArtworkEditPage";
import ContactEditPage from "./pages/AdminPage/ContactEditPage";
import MainEditPage from "./pages/AdminPage/MainEditPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import LoginPage from "./pages/LoginPage/LoginMainPage";
import ContactPage2 from "./pages/ContactPage/ContactPage2";
import PAHome from '@/components/PromotionAdmin/Navigation/index'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <PromotionMainpage />,
      },
      {
        path: "/about",
        element: <AboutMainpage />,
      },
      {
        path: "/contents",
        element: <ArtworkMainpage />,
      },
      {
        path: "/detail/:detailId",
        element: <ContentDetailPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/admin",
        element: <AdminMainPage />,
      },
      {
        path: "/admin/about",
        element: <AdminEditPage />,
      },
      {
        path: "/admin/artwork",
        element: <ArtworkEditPage />,
      },
      {
        path: "/admin/contact",
        element: <ContactEditPage />,
      },
      {
        path: "/admin/mainpage",
        element: <MainEditPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      // {
      //   path: "/contact",
      //   element: <ContactPage2 />,
      // },
      {
        path:'/pa-home-test',
        element: <PAHome />
      },
      {
        path:'/pa-request-test',
        element: <ContactEditPage />
      },
      {
        path:'/pa-artwork-test',
        element: <ContactEditPage />
      },
      {
        path:'/pa-pageEdit-test',
        element: <ContactEditPage />
      },
      {
        path:'/pa-statistics-test',
        element: <ContactEditPage />
      },
      {
        path:'/pa-faq-test',
        element: <ContactEditPage />
      },    
      {
        path:'/pa-setting-test',
        element: <ContactEditPage />
      },
    ],
  },
]);

export default router;
