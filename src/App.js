import { useState } from "react";
import { DiaryCard, Pagination, Header } from "./components";
import img1 from "./components/assets/img1.jpg"
import img2 from "./components/assets/img2.jpg"
import img3 from "./components/assets/img3.jpg"


function App() {

  const data = {
    "img1": img1,
    "img2": img2,
    "img3": img3
  }

  const dairy = [
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />, <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img1} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img2} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
    <DiaryCard img={data.img3} />,
  ]

  const [dairyPage, setDairyPage] = useState(1)
  const [dairyPerPage] = useState(10)

  const lastDairyIndex = dairyPage * dairyPerPage
  const firstDairyPage = lastDairyIndex - dairyPerPage
  const currentDairy = dairy.slice(firstDairyPage, lastDairyIndex)

  const paginate = pageNumber => setDairyPage(pageNumber)

  return (
    <div className="container">

      <Header/>
      <div className="dairy__items">
        {
          currentDairy.map((item) => item)
        }
      </div>

      <Pagination
        dairyPerPage={dairyPerPage}
        totalDairy={dairy.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
