import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PromotionMainpage from "./Pages/MainPage/PromotionMainPage";
import AboutMainpage from "./Pages/AboutPage/AboutMainPage";
import { AnimatePresence, motion } from 'framer-motion';
import ArtworkMainpage from "./Pages/ArtworkPage/ArtworkMainPage";
import AdminLoginPage from "./Pages/LoginPage/LoginMainPage";
import AdminMainPage from "./Pages/AdminPage/AdminMainPage";
import AboutEditPage from "./Pages/AdminPage/AboutEditPage";
import ArtworkEditPage from "./Pages/AdminPage/ArtworkEditPage";
import ContactEditPage from "./Pages/AdminPage/ContactEditPage";
import MainEditPage from "./Pages/AdminPage/MainEditPage";
import ContactPage from './Pages/ContactPage/ContactPage';
import ContentDetailPage from "./Pages/DetailPage/ContentDetailPage";

function App() {
    const [showInsertPage, setShowInsertPage] = React.useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowInsertPage(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            <BrowserRouter>
                <AnimatePresence>

                    <Routes>

                        <Route path="/" element={<PromotionMainpage />} />
                        <Route path="/About" element={<AboutMainpage />} />
                        <Route path="/Contents" element={<ArtworkMainpage />} />
                        <Route path="/detail/:id" element={<ContentDetailPage />} />
                        {/*<Route path="/notice" element={<NoticeMainPage />} />*/}
                        <Route path="/login" element={<AdminLoginPage />} />
                        <Route path="/admin" element={<AdminMainPage />} />
                        <Route path="/admin/about" element={<AboutEditPage />} />
                        <Route path="/admin/artwork" element={<ArtworkEditPage />} />
                        <Route path="/admin/contact" element={<ContactEditPage />} />
                        <Route path="/admin/mainPage" element={<MainEditPage />} />
                        <Route path="/Contact" element={<ContactPage />} />
                    </Routes>
                </AnimatePresence>
            </BrowserRouter>
        </>
    );
}

export default App;
