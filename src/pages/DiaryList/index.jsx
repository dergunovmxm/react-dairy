import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Pagination, Filters, DiaryCard,
} from '../../components';
import Loading from '../../components/UI/Loading';
import empty from '../../assets/empty.png';
import './DiaryList.scss';
import useShowNotes from '../../hooks/useShowNotes';
import noteRepository from '../../API/Repositories/noteRepository';

function DiaryList() {
  const navigate = useNavigate();
  const {
    showNotes,
    isLoading,
    setIsLoading,
    limit,
    page,
    countNotes,
    setCountNotes,
    setIsEdit,
    sort,
    setSort,
    searchValue,
    setSearchValue,
    setShowNotes,
  } = useShowNotes();

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
      noteRepository.deleteNote(id)
        .then(() => {
          setCountNotes(countNotes - 1);
          noteRepository.getNotes(config)
            .then(({ data }) => {
              if (!data.length) {
                navigate(`?_page=${page - 1}&_limit=${limit}`);
              } else {
                setShowNotes(data);
                setIsLoading(false);
              }
            })
            .catch(() => {
              alert('Не удалось выполниить запрос!');
            });
        });
    }
  };

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
            {!isLoading && showNotes.length ? (
              showNotes.map((item) => (
                <DiaryCard
                  {...item}
                  key={item.id}
                  removeNote={removeNote}
                  setIsEdit={setIsEdit}
                  setIsLoading={setIsLoading}
                  setCountNotes={setCountNotes}
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

          {!isLoading && showNotes.length ? (
            <Pagination
              page={page}
              countNotes={countNotes}
              limit={limit}
            />
          ) : null}

        </>
      )}
    </>
  );
}

export default DiaryList;
