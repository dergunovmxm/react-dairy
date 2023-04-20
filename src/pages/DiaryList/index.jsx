import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Pagination, Filters, DiaryCard,
} from '../../components';
import Loading from '../../components/UI/Loading';
import empty from '../../assets/empty.png';
import './DiaryList.scss';
import noteRepository from '../../API/Repositories/noteRepository';

function DiaryList() {
  const [notes, setNotes] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [sort, setSort] = useState({});
  const navigate = useNavigate();
  const [countNotes, setCountNotes] = useState(0);
  const [limit] = useState(4);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const page = params.get('_page') || 1;

  const removeNote = (id) => {
    const config = {
      title_like: searchValue,
      _page: page,
      _limit: limit,
      _sort: sort.sort,
      _order: sort.order,
    };

    if (window.confirm('Вы действительно хотите удалить запись?')) {
      setIsLoading(true);
      noteRepository.delete(id)
        .then(() => {
          setCountNotes(countNotes - 1);
          noteRepository.getNotes(config)
            .then(({ data }) => {
              if (!data.length) {
                navigate(`?_page=${page - 1}&_limit=${limit}`);
              } else {
                setNotes(data);
                setIsLoading(false);
              }
            })
            .catch(() => {
              alert('Не удалось выполниить запрос!');
            });
        });
    }
  };

  useEffect(() => {
    const config = {
      title_like: searchValue,
    };
    noteRepository.getNotes(config)
      .then(({ data }) => {
        setCountNotes(data.length);
      })
      .catch((error) => {
        console.warn(error);
        alert('Не удалось выполниить запрос!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchValue]);

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
        setNotes(data);
        setIsEdit(false);
      })
      .catch((error) => {
        console.warn(error);
        alert('Не удалось выполниить запрос!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, searchValue, isEdit, sort]);

  return (
    <>
      {' '}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Filters
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            sort={sort}
            onClickSort={(i) => setSort(i)}
            limit={limit}
          />
          <section className="dairy-items">
            {!isLoading && notes.length ? (
              notes.map((item) => (
                <DiaryCard
                  {...item}
                  key={item.id}
                  removeNote={removeNote}
                  setIsEdit={setIsEdit}
                  setIsLoading={setIsLoading}
                  setCountNotes={setCountNotes}
                  isEdit={isEdit}
                  sort={sort}
                  navigate={navigate}
                />
              ))
            ) : (
              <div className="emptySearch">
                <img src={empty} alt="emptySearch" />
                <span>Ничего не найдено</span>
              </div>
            )}
          </section>

          {!isLoading && notes.length ? (
            <Pagination
              page={page}
              numPages={Math.ceil(countNotes / limit)}
              limit={limit}
            />
          ) : null}

        </>
      )}
    </>
  );
}

export default DiaryList;
