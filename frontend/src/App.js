import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import { Toaster } from './components/ui/toaster';
import LoadingBar from './components/common/LoadingBar';
import BackToTop from './components/common/BackToTop';

function App() {
  return (
    <ThemeProvider>
      <div className="App min-h-screen bg-background text-foreground">
        <LoadingBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
        <BackToTop />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
