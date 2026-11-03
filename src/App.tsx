import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Work from './pages/Work';
import Contacts from './pages/Contacts';
import ProjectDetail from './pages/ProjectDetail';
import CustomCursor from './components/CustomCursor';
import { AnimatePresence, motion } from 'framer-motion';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <React.Fragment key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<PageTransition><Work /></PageTransition>} />
          <Route path="/archive" element={<Navigate to="/" replace />} />
          <Route path="/contacts" element={<PageTransition><Contacts /></PageTransition>} />
          <Route path="/studio" element={<Navigate to="/contacts" replace />} />
          <Route path="/contact" element={<Navigate to="/contacts" replace />} />
          <Route path="/work/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
        </Routes>
      </React.Fragment>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <CustomCursor />
      <ScrollToTop />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
};

export default App;
