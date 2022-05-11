import axios from 'axios';

export default {
  state: {
    posts: [],
    limitPosts: [],
    searchPosts: [],
    page: 1,
    limit: 10,
  },
  getters: {
  },
  mutations: {
    updatePosts(state:any, data:any) {
      state.posts = data;
      state.limit = Math.ceil(data.length / 10);
    },
    updateLimimPosts(state:any, data:any) {
      state.limitPosts = state.posts.slice((state.page - 1) * 10, state.page * 10);
    },
    changePage(state:any, data:any) {
      if (state.searchPosts.length < 100 && data <= state.limit && data > 0) {
        state.page = data;
        state.limitPosts = state.searchPosts.slice((state.page - 1) * 10, state.page * 10);
      } else if (data <= state.limit && data > 0) {
        state.page = data;
        state.limitPosts = state.posts.slice((data - 1) * 10, data * 10);
      }
    },
    searchPosts(state:any, data:any) {
      state.page = 1;
      state.limitPosts = state.posts.filter((elem:any) => elem.title
        .includes(data.toLowerCase()) === true);
      state.searchPosts = state.limitPosts;
      state.limit = Math.ceil(state.limitPosts.length / 10);
      state.limitPosts = state.limitPosts.slice((state.page - 1) * 10, state.page * 10);
      // state.limitPosts = data;
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
