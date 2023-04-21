import moment from 'moment';
import axios from '../Service';
import 'moment/locale/ru';

moment.locale('ru');
const resource = '/notes';

export default {

  getNotes(params) {
    return axios.get(resource, { params });
  },

  getNote(id) {
    return axios.get(`${resource}/${id}`);
  },

  createNote(data) {
    return axios.post(resource, data);
  },

  editNote(id, data) {
    return axios.put(`${resource}/${id}`, data);
  },

  deleteNote(id) {
    return axios.delete(`${resource}/${id}`);
  },

};
