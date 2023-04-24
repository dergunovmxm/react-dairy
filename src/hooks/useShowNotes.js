import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import noteRepository from '../API/Repositories/noteRepository';

function useShowNotes() {
  const [showNotes, setShowNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [countNotes, setCountNotes] = useState(0);
  const [limit] = useState(4);
  const [searchValue, setSearchValue] = useState('');
  const [sort, setSort] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const page = params.get('_page') || 1;

  useEffect(() => {
    noteRepository.getAllNotes()
      .then(({ data }) => {
        setCountNotes(data.length);
      });
  }, []);
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
  }, [page, limit, searchValue, sort, isEdit]);

  return {
    showNotes,
    isLoading,
    setIsLoading,
    page,
    limit,
    countNotes,
    setCountNotes,
    sort,
    setSort,
    searchValue,
    setSearchValue,
    setShowNotes,
    setIsEdit,
  };
}
export default useShowNotes;
