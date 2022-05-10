import axios from 'axios';

export default {
  state: {
    posts: [],
    limitPosts: [],
    page: 1,
    limit: 10,
  },
  getters: {
  },
  mutations: {
    updatePosts(state:any, data:any) {
      state.posts = data;
      state.limit = data.length / 10;
    },
    updateLimimPosts(state:any, data:any) {
      state.limitPosts = state.posts.slice((state.page - 1) * 10, state.page * 10);
    },
    changePage(state:any, data:any) {
      if (data <= state.limit && data > 0) {
        state.page = data;
        state.limitPosts = state.posts.slice((data - 1) * 10, data * 10);
      }
    },
    searchPosts(state:any, data:any) {
      state.limitPosts = data;
    },
  },
  actions: {
    actionGetPosts({
      commit,
    }:any) {
      axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
        commit('updatePosts', response.data);
        commit('updateLimimPosts', response.data);
      });
    },
  },
  modules: {
  },
  namespaced: true,
};
