import moment from 'moment';
import axios from './axios';
import 'moment/locale/ru';

moment.locale('ru');
const resource = '/notes';

export default {

  getAllNotes(params) {
    return axios
      .get(`${resource}?title_like=${params.searchValue}&_page=${params.page}&_limit=${params.limit}&_sort=${params.sort.sort}&_order=${params.sort.order}`)
      .then(({ data }) => {
        params.setNotes(data);
        params.setIsEdit(false);
      })
      .catch((error) => {
        console.warn(error);
        alert('Не удалось выполниить запрос!');
      })
      .finally(() => {
        params.setIsLoading(false);
      });
  },

  getOneNote(params) {
    return axios
      .get(`${resource}/${params.diaryId}`)
      .then(({ data }) => {
        params.setItems(data);
        setTimeout(() => {
          params.setIsLoading(false);
        }, 100);
      })
      .catch((error) => {
        alert('Не удалось выполниить запрос!');
        console.warn(error);
      })
      .finally(() => {
        params.setIsLoading(false);
      });
  },

  searchNotes(params) {
    return axios
      .get(`${resource}?title_like=${params.searchValue}`)
      .then(({ data }) => {
        params.setCountNotes(data.length);
      })
      .catch((error) => {
        console.warn(error);
        alert('Не удалось выполниить запрос!');
      })
      .finally(() => {
        params.setIsLoading(false);
      });
  },

  creatingNote(params) {
    const data = {
      title: params.values.title,
      description: params.values.description,
      image: params.noteImage,
      date: moment().format('LLL'),
    };
    axios
      .post(`${resource}`, data)
      .then(() => {
        alert('Запись создана!');
        params.navigate('/');
      })
      .catch((error) => {
        console.warn(error);
        alert('Не удалось выполниить запрос!');
      });
  },

  editNote(params) {
    const data = {
      title: params.values.title,
      description: params.values.description,
      image: params.noteImage,
      date: moment().format('LLL'),
    };

    axios
      .put(`${resource}/${params.id}`, data)
      .then(() => {
        alert('Запись изменена!');
        params.setIsEdit(true);
        params.setEditOpen(false);
      })
      .catch((error) => {
        console.warn(error);
        alert('Не удалось выполниить запрос!');
      });
  },

  getData(params) {
    axios
      .get(`${resource}/${params.id}`)
      .then(({ data }) => {
        params.setEditTitle(data.title);
        params.setEditDescription(data.description);
        params.setEditImage(data.image);
        params.setIsEdit(false);
      })
      .catch((error) => {
        console.warn(error);
        alert('Не удалось выполниить запрос!');
      });
  },
  removeNote(params) {
    if (window.confirm('Вы действительно хотите удалить запись?')) {
      params.setIsLoading(true);
      axios.delete(`${resource}/${params.id}`)
        .then(() => {
          params.setCountNotes(params.countNotes - 1);
          axios
            .get(`${resource}?title_like=${params.searchValue}&_page=${params.page}&_limit=${params.limit}&_sort=${params.sort.sort}&_order=${params.sort.order}`)
            .then(({ data }) => {
              if (!data.length) {
                params.navigate(`?_page=${params.page - 1}&_limit=${params.limit}`);
              } else {
                params.setNotes(data);
                params.setIsLoading(false);
              }
            })
            .catch((error) => {
              console.warn(error);
              alert('Не удалось выполниить запрос!');
            });
        });
    }
  },
};
