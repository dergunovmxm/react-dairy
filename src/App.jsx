import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Diary, DiaryList, CreateNote } from './pages';
import './index.scss';
import MainLayout from './MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route exact index element={<DiaryList />} />
        <Route exact path="notes/*" element={<Diary />} />
        <Route exact path="create_note" element={<CreateNote />} />
      </Route>
    </Routes>
  );
}

export default App;
