import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import noteRepository from '../API/Repositories/noteRepository';

function useShowNote() {
  const [items, setItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const diaryId = params.get('id');

  useEffect(() => {
    noteRepository.getNote(diaryId)
      .then(({ data }) => {
        setItems(data);
      })
      .catch((error) => {
        alert('Не удалось выполниить запрос!');
        console.warn(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return {
    items,
    isLoading,
    diaryId,
  };
}

export default useShowNote;
