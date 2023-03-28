import { changePage, changeFirstPage, changeMediumPage, changeLastPage } from '../redux/slices/pagination';

const pageRight = (step, dispatch, selectPage, numPages, firstPage, mediumPage, lastPage) => {

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

export default pageRight