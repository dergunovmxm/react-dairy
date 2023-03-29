import './Pagination.scss';

import { useSelector, useDispatch } from 'react-redux';
import { changePage, changeFirstPage, changeMediumPage, changeLastPage } from '../../redux/slices/pagination';
import { FiChevronsLeft, FiChevronsRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';


const Pagination = () => {

    const dispatch = useDispatch();
    const { selectPage, numPages, firstPage, mediumPage, lastPage, showPages } = useSelector((state) => state.pagination);
    const step = 1

    const pageRight = (step) => {

        if (selectPage === mediumPage) {
            if (lastPage + step <= numPages) {
                dispatch(changeFirstPage(firstPage + step));
                dispatch(changeLastPage(lastPage + step));
                dispatch(changeMediumPage(mediumPage + step));
                dispatch(changePage(selectPage + step));
            } else if (selectPage + step <= numPages) {
                dispatch(changeFirstPage(firstPage + numPages - lastPage));
                dispatch(changeLastPage(lastPage + numPages - lastPage));
                dispatch(changeMediumPage(mediumPage + numPages - lastPage));
                dispatch(changePage(selectPage + step));
            }
        } else if (selectPage < mediumPage) {
            if (selectPage + step > mediumPage) {
                dispatch(changeFirstPage(firstPage + numPages - lastPage));
                dispatch(changeLastPage(lastPage + numPages - lastPage));
                dispatch(changeMediumPage(mediumPage + numPages - lastPage));
                dispatch(changePage(selectPage + step));
            } else {
                dispatch(changePage(selectPage + step));
            }
        } else if (selectPage > mediumPage) {
            if (selectPage + step <= numPages) {
                dispatch(changePage(selectPage + step));
            }
        }
    }

    const pageLeft = (step) => {
        if (selectPage === mediumPage) {
            if (firstPage - step >= 1) {
                dispatch(changeFirstPage(firstPage - step));
                dispatch(changeLastPage(lastPage - step));
                dispatch(changeMediumPage(mediumPage - step));
                dispatch(changePage(selectPage - step));
            } else if (selectPage - step >= 1) {
                dispatch(changeFirstPage(firstPage - 1 + firstPage));
                dispatch(changeLastPage(lastPage - 1 + firstPage));
                dispatch(changeMediumPage(mediumPage - 1 + firstPage));
                dispatch(changePage(selectPage - step));
            }
        } else if (selectPage > mediumPage) {
            if (selectPage - step < mediumPage) {
                dispatch(changeFirstPage(firstPage - 1 + firstPage));
                dispatch(changeLastPage(lastPage - 1 + firstPage));
                dispatch(changeMediumPage(mediumPage - 1 + firstPage));
                dispatch(changePage(selectPage - step));

            } else {
                dispatch(changePage(selectPage - step));
            }
        } else if (selectPage < mediumPage) {
            if (selectPage - step >= 1) {
                dispatch(changePage(selectPage - step));
            }
        }
    }

    return (

        <div className="wrapper">

            <section className="wrapper__pagination">

                <div
                    onClick={() => {
                        dispatch(changeFirstPage(1));
                        dispatch(changeLastPage(showPages));
                        dispatch(changeMediumPage(Math.floor(showPages / 2)));
                        dispatch(changePage(1));
                    }}
                    className="wrapper__pagination__arrow">
                    <FiChevronsLeft />
                </div>

                <div onClick={() => pageLeft(step)} className="wrapper__pagination__arrow">
                    <FiChevronLeft />
                </div>

                <div className="wrapper__pagination__pages">
                    {Array.from({ length: showPages }, (_, i) => firstPage + i).map(
                        (element) => (
                            <div
                                key={element}
                                className={
                                    selectPage === element
                                        ? "wrapper__pagination__pages__select_block"
                                        : "wrapper__pagination__pages__block"
                                }>
                                {element}
                            </div>
                        ),
                    )}
                </div>

                <div onClick={() => pageRight(step)} className="wrapper__pagination__arrow">
                    <FiChevronRight />
                </div>

                <div
                    onClick={() => {
                        dispatch(changeFirstPage(numPages - showPages + 1));
                        dispatch(changeLastPage(numPages));
                        dispatch(changeMediumPage(numPages - Math.ceil(showPages / 2)));
                        dispatch(changePage(numPages));
                    }}
                    className="wrapper__pagination__arrow">
                    <FiChevronsRight />
                </div>

            </section>
        </div>
    );
}

export default Pagination;