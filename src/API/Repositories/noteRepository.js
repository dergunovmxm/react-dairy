import moment from 'moment';
import axios from '../Service';
import 'moment/locale/ru';

moment.locale('ru');
const resource = '/notes';

export default {

  getNotes(params) {
    return axios.get(resource, { params });
  },

  getNote(params) {
    return axios.get(`${resource}/${params}`);
  },

  creatingNote(data) {
    return axios.post(resource, data);
  },

  edit(params) {
    return axios.put(`${resource}/${params.edit.editId}`, params.data);
  },

  delete(params) {
    return axios.delete(`${resource}/${params}`);
  },

};
