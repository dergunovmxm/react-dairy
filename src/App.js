import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DiaryCard, Pagination, Header } from "./components";
import { CreateNote } from "./pages";
import DiaryList from "./components/DiaryList";
import { fetchNotes } from "./redux/actions";
import Diary from './pages/Diary';
import { Routes, Route } from 'react-router-dom'


function App() {


  return (
    <div className="container" >
      <Header />
      <Routes>
        <Route exact path='/' element={<DiaryList/>} />
        <Route exact path='/notes/*' element={<Diary />} />
        <Route exact path='/create_note' element={<CreateNote />} />
      </Routes>

    </div>
  );
}

export default App;
