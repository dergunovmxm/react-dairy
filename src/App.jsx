import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Diary, DiaryList, CreateNote } from './pages';
import { Header } from './components';
import './index.scss';

function App() {
  return (
    <main className="container">
      <Header />
      <Routes>
        <Route exact path="/" element={<DiaryList />} />
        <Route exact path="/notes/*" element={<Diary />} />
        <Route exact path="/create_note" element={<CreateNote />} />
      </Routes>
    </main>
  );
}

export default App;
