import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.scss';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route exact path='/' element={<App />} />
      </Routes>
    </Provider>
  </BrowserRouter>


);