import { useState } from "react"
import DairyCard from "../DiaryCard"
import Pagination from "../Pagination"
import { useDispatch, useSelector } from 'react-redux'
import { loadNotes } from "../../redux/actions"
import { useEffect } from "react"

const DiaryList = ({ }) => {


    let dispatch = useDispatch()
    const notes = useSelector((state) => state.notes)


    const [dairyPage, setDairyPage] = useState(1)
    const [dairyPerPage] = useState(8)

    const lastDairyIndex = dairyPage * dairyPerPage
    const firstDairyPage = lastDairyIndex - dairyPerPage
    const currentDairy = notes.slice(firstDairyPage, lastDairyIndex)
    const paginate = pageNumber => setDairyPage(pageNumber)

    useEffect(() => {
        dispatch(loadNotes())
    }, [])

    return (
        <>
            <div className="dairy__items">
                {currentDairy && currentDairy.map((item) => <DairyCard {...item} />)}

            </div>

            <Pagination
                    dairyPerPage={dairyPerPage}
                    totalDairy={notes.length}
                    paginate={paginate}
                />
        </>



    )
}

export default DiaryList