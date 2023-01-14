import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from "./components"
import './index.scss';
import App from './App';
import Diary from './pages/Diary';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <BrowserRouter>
    <Provider store={store}>
    <Header/>
      <Routes>
        <Route exact path='/' element={<App />} />
        <Route exact path='/notes/*' element={<Diary />} />
      </Routes>
    </Provider>
  </BrowserRouter>


);