import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import noteRepository from '../API/Repositories/noteRepository';

function useShowNotes(props) {
  const [showNotes, setShowNotes] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sort, setSort] = useState({});
  const [limit] = useState(4);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const page = params.get('_page') || 1;
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const config = {
      title_like: searchValue,
      _page: page,
      _limit: limit,
      _sort: sort.sort,
      _order: sort.order,
    };
    noteRepository
      .getNotes(config)
      .then(({ data }) => {
        setShowNotes(data);
        setIsEdit(false);
      })
      .catch((error) => {
        console.warn(error);
        alert('Не удалось выполниить запрос!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, limit, searchValue, sort]);

  return { showNotes, isLoading, page, limit, searchValue, sort, setSearchValue };
}
export default useShowNotes;
