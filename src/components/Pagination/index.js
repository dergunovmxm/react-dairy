
import "./Pagination.scss"

const Pagination = ({ dairyPerPage, totalDairy, paginate }) => {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalDairy / dairyPerPage); i++) {
        pageNumbers.push(i)
    }   
    
    return (
        <ul className="pagination__container__list">
            {
                pageNumbers.map((number) => (
                    <li className="page-item" key={number} onClick={() => paginate(number)}>
                        {number}
                    </li>
                ))
            }
        </ul>
    )
}

export default Pagination