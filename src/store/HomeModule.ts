import axios from 'axios';

export default {
  state: {
    posts: [],
  },
  getters: {
  },
  mutations: {
    updatePosts(state:any, data:any) {
      state.posts = data;
    },
  },
  actions: {
    actionGetPosts({
      commit,
    }:any) {
      axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
        // console.log(response.data, this)
        console.log(response);
        commit('updatePosts', response.data);
      });
    },
  },
  modules: {
  },
  namespaced: true,
};
