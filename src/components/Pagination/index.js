import "./Pagination.scss"
const Pagination = ({ limit, totalNotes, setDairyPage }) => {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalNotes / limit); i++) {
        pageNumbers.push(i)
    }   
    
    return (
        <ul className="pagination__container__list">
            {   
                pageNumbers.map((number) => (
                    <li className="page-item"  key={number} onClick={() => setDairyPage(number)}>
                        {number}
                    </li>
                ))
                
            }
        </ul>
    )
}

export default Pagination