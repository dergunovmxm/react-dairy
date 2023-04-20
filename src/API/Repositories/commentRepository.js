import axios from '../Service';

const resource = '/comments';
export default {
  create(data) {
    return axios.post(resource, data);
  },
};
