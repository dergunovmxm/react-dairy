import './Pagination.scss';
import { FiChevronsLeft, FiChevronsRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Pagination = ({ page, numPages, limit }) => {

    const navigate = useNavigate()

    return (

        <div className="wrapper">

            <section className="wrapper__pagination">

                <div
                    onClick={() => {
                        navigate(`?_page=${1}&_limit=${limit}`)
                    }}
                    className="wrapper__pagination__arrow">
                    <FiChevronsLeft />
                </div>

                <div onClick={() => { navigate(`?_page=${Number(page) === 1 ? page : page - 1}&_limit=${limit}`) }} className="wrapper__pagination__arrow">
                    <FiChevronLeft />
                </div>

                <div className="wrapper__pagination__pages">
                    {Array.from({
                        length: (Number(page) === 1
                            ? (Number(page) === Number(numPages) ? 1 : 2)
                            : (Number(page) === Number(numPages) ? 2 : 3))
                    },
                        (_, i) => (Number(page) === 1 ? Number(page) : Number(page - 1)) + i).map(
                            (element) => (
                                <div
                                    key={element}
                                    className={
                                        Number(page) === Number(element)
                                            ? "wrapper__pagination__pages__select_block"
                                            : "wrapper__pagination__pages__block"
                                    }>
                                    {element}
                                </div>
                            ),
                        )}
                </div>

                <div onClick={() => { navigate(`?_page=${Number(page) + 1 > numPages ? page : Number(page) + 1}&_limit=${limit}`) }} className="wrapper__pagination__arrow">
                    <FiChevronRight />
                </div>

                <div
                    onClick={() => {
                        navigate(`?_page=${numPages}&_limit=${limit}`)
                    }}
                    className="wrapper__pagination__arrow">
                    <FiChevronsRight />
                </div>

            </section>
        </div>
    );
}

export default Pagination;