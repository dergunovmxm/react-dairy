import axios from '../Service';

const resource = '/comments';
export default {
  createComment(data) {
    return axios.post(resource, data);
  },
  getComments(noteId) {
    return axios.get(`${resource}?noteId=${noteId}`);
  },

};
