import axios from 'axios';
import stringSimilarity from 'string-similarity';

export default {
  state: {
    posts: [],
    limitPosts: [],
    searchPosts: [],
    favoritesPosts: [],
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
      const key = Object.keys(localStorage).filter((elem:any) => elem.includes('FP') === true);
      state.favoritesPosts = key.map((elem:any) => ((localStorage.getItem(elem)
      != null) ? JSON.parse(String(localStorage.getItem(elem))) : ''));
    },
    changePage(state:any, data:any) {
      if (state.searchPosts.length < 100 && (state.searchPosts.length > 0)
      && data <= state.limit && data > 0) {
        state.page = data;
        state.limitPosts = state.searchPosts.slice((state.page - 1) * 10, state.page * 10);
      } else if (data <= state.limit && data > 0) {
        state.page = data;
        state.limitPosts = state.posts.slice((data - 1) * 10, data * 10);
      }
    },
    searchPosts(state:any, data:any) {
      console.log(data.length);
      state.page = 1;
      if (data.length > 20 && data.length <= 100) {
        state.limitPosts = state.posts.filter((elem:any) => stringSimilarity
          .compareTwoStrings(elem.title, data.toLowerCase()) > 0.66 || stringSimilarity
          .compareTwoStrings(elem.body, data.toLowerCase()) > 0.50);
      } else if (data.length > 100) {
        state.limitPosts = state.posts.filter((elem:any) => stringSimilarity
          .compareTwoStrings(elem.title, data.toLowerCase()) > 0.96 || stringSimilarity
          .compareTwoStrings(elem.body, data.toLowerCase()) > 0.82);
      } else if (data.length !== 0 && data.length < 20) {
        state.limitPosts = state.posts.filter((elem:any) => elem.title
          .search(data.toLowerCase()) !== -1 || elem.body.search(data.toLowerCase()) !== -1);
      }
      if (data.length !== 0) {
        state.searchPosts = state.limitPosts;
        state.limit = Math.ceil(state.limitPosts.length / 10);
        state.limitPosts = state.limitPosts.slice((state.page - 1) * 10, state.page * 10);
      } if (data.length === 0) {
        state.limitPosts = state.posts.slice((state.page - 1) * 10, state.page * 10);
        state.limit = Math.ceil(state.posts.length / 10);
      }
      // state.limitPosts = data;
    },
    updatefavoritesPosts(state:any, data:any) {
      localStorage.setItem(`FP${data.id}`, JSON.stringify(data));
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
