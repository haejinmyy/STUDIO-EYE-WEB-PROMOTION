import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import PromotionMainpage from "./Pages/MainPage/PromotionMainPage";
import AboutMainpage from "./Pages/AboutPage/AboutMainPage";
import ArtworkMainpage from "./Pages/ArtworkPage/ArtworkMainPage";
import ContentDetailPage from "./Pages/DetailPage/ContentDetailPage";
import AdminMainPage from "./Pages/AdminPage/AdminMainPage";
import AdminEditPage from "./Pages/AdminPage/AboutEditPage";
import ArtworkEditPage from "./Pages/AdminPage/ArtworkEditPage";
import ContactEditPage from "./Pages/AdminPage/ContactEditPage";
import MainEditPage from "./Pages/AdminPage/MainEditPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import LoginPage from "./Pages/LoginPage/LoginMainPage";
import ContactPage2 from "./Pages/ContactPage/ContactPage2";
import FaqPage from "./Pages/FaqPage/FaqPAge";
import FaqDetailPage from "./Pages/DetailPage/FaqDetailPage";
import FAQMainPage from "./Pages/PromotionAdmin/FAQPage/FAQMainPage";
import FAQWritePage from "./Pages/PromotionAdmin/FAQPage/FAQWritePage";
import FAQManagePage from "./Pages/PromotionAdmin/FAQPage/FAQManagePage";

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
        path: "/faq",
        element: <FaqPage />,
      },
      {
        path: "/faq/detail/:detailId",
        element: <FaqDetailPage />,
      },
      {
        path: "/admin/faq",
        element: <FAQMainPage />,
        children: [
          {
            path: "",
            element: <FAQManagePage />,
          },
          {
            path: "/admin/faq/write/:faqId",
            element: <FAQManagePage />,
          },
          {
            path: "/admin/faq/write",
            element: <FAQWritePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
