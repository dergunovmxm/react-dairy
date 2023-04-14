import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import close from '../../assets/btn-remove.svg';
import search from '../../assets/search.svg';
import './Filters.scss';
import { Input } from '../UI';

function Filters({
  searchValue, setSearchValue, sort, onClickSort, limit,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState('Сортировка');

  const list = [
    {
      name: 'Сортировка',
    },
    {
      name: 'По дате Up',
      sort: 'date',
      order: 'asc',
    },
    {
      name: 'По дате Down',
      sort: 'date',
      order: 'desc',
    },
    {
      name: 'По алфавиту Up',
      sort: 'title',
      order: 'asc',
    },
    {
      name: 'По алфавиту Down',
      sort: 'title',
      order: 'desc',
    },
  ];

  const onClickItem = (i) => {
    onClickSort(i);
    setOpen(false);
    navigate(
      `?_page=${1}&_limit=${limit}&_sort=${sort.sort}&_order=${sort.order}`,
    );
  };

  return (
    <section className="tools">
      <div className="tools-filtering">
        <div className="tools-filtering__label" onClick={() => setOpen(!open)}>
          <span>{label}</span>
        </div>
        {open ? (
          <div className="tools-filtering__sortList">
            <ul>
              {list.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    onClickItem(item);
                    setLabel(item.name);
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <> </>
        )}
      </div>

      <div className="tools-search">
        <img src={search} alt="Search" />
        <Input
          placeholder="Поиск..."
          value={searchValue}
          setValue={setSearchValue}
          navigate={`?_page=${1}&_limit=${limit}`}
        />
        {searchValue && (
          <img
            className="clear"
            src={close}
            alt="Close"
            onClick={() => setSearchValue('')}
          />
        )}
      </div>

      <Link to="create_note">
        <div className="tools-adding">
          <span>Добавить запись</span>
        </div>
      </Link>
    </section>
  );
}

export default Filters;
