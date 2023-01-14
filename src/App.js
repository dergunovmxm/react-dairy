import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { DiaryCard, Pagination, Header } from "./components";
import DiaryList from "./components/DiaryList";
import { fetchNotes } from "./redux/actions";
import Diary from './pages/Diary';
import { Routes, Route } from 'react-router-dom'


function App() {

  const [searchValue, setSearchValue] = useState('');

  const onChangeSearchInput = (event) => {

    setSearchValue(event.target.value);
  };
  console.log(searchValue)

  return (
    <div className="container">
      <Header
        onChangeSearchInput={onChangeSearchInput}
        searchValue={searchValue}
        setSearchValue={setSearchValue} />
      <Routes>
        <Route exact path='/' element={<DiaryList searchValue={searchValue} />} />
        <Route exact path='/notes/*' element={<Diary />} />
      </Routes>

    </div>
  );
}

export default App;
