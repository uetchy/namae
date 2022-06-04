import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import { GlobalStyle } from './theme';
import { useOpenSearch } from './util/hooks';

export default function App() {
  const OpenSearch = useOpenSearch('/opensearch.xml');

  return (
    <>
      <GlobalStyle />
      <OpenSearch />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/s/:query" element={<Search />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}
