import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DiaryCard, Pagination, Header } from "./components";
import img1 from "./components/assets/img1.jpg"
import img2 from "./components/assets/img2.jpg"
import img3 from "./components/assets/img3.jpg"
import DiaryList from "./components/DiaryList";
import { fetchNotes } from "./redux/actions";



function App() {

  return (

    
    <div className="container">

      <Header/>
      <DiaryList/>
      {/* <Pagination
                    dairyPerPage={dairyPerPage}
                    totalDairy={notes.length}
                    paginate={paginate}
                /> */}
    </div>
  );
}

export default App;
