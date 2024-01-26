import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Hacks from './pages/Hacks';
import HackPage from './pages/HackPage';
import Megapack from './pages/Megapack';
import Faq from './pages/Faq';
import Stardisplay from './pages/Stardisplay'
import Error from './pages/Error'
import Streams from './pages/Streams';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/hacks" element={<Hacks />}></Route>
          <Route path="/hacks/:mode?/:hack_url" element={<HackPage />}></Route>
          <Route path="/megapack" element={<Megapack />}></Route>
          <Route path='/faq' element={<Faq />}></Route>
          <Route path='/stardisplay' element={<Stardisplay />}></Route>
          <Route path='/streams' element={<Streams />}></Route>
          <Route path='*' element={<Error />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
