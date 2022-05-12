import axios from 'axios';
import stringSimilarity from 'string-similarity';

function SortArray(x:any, y:any) {
  return x.title.localeCompare(y.title);
}

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
      if (state.searchPosts.length < 100 && (state.searchPosts.length > 0)) {
        if (data.checkedId === true && data.checkedAlpha === true) {
          state.searchPosts = state.searchPosts.sort(SortArray);
        } else if (data.checkedId === true && data.checkedAlpha === false) {
          state.searchPosts = state.searchPosts.sort((a:any, b:any) => b.id - a.id);
        } else if (data.checkedId === false && data.checkedAlpha === true) {
          state.searchPosts = state.searchPosts.sort(SortArray);
        } else {
          state.searchPosts = state.searchPosts.sort((a:any, b:any) => a.id - b.id);
        }
        state.limitPosts = state.searchPosts.slice((state.page - 1) * 10, state.page * 10);
      } else {
        if (data.checkedId === true && data.checkedAlpha === true) {
          state.posts = state.posts.sort(SortArray);
        } else if (data.checkedId === true && data.checkedAlpha === false) {
          state.posts = state.posts.sort((a:any, b:any) => b.id - a.id);
        } else if (data.checkedId === false && data.checkedAlpha === true) {
          state.posts = state.posts.sort(SortArray);
        } else {
          state.posts = state.posts.sort((a:any, b:any) => a.id - b.id);
        }
        state.limitPosts = state.posts.slice((state.page - 1) * 10, state.page * 10);
      }
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
        state.searchPosts = [];
        state.limitPosts = state.posts.slice((state.page - 1) * 10, state.page * 10);
        state.limit = Math.ceil(state.posts.length / 10);
      }
      // state.limitPosts = data;
    },
    updatefavoritesPosts(state:any, data:any) {
      localStorage.setItem(`FP${data.id}`, JSON.stringify(data));
      state.favoritesPosts = [...state.favoritesPosts, data];
    },
    deletefavoritesPosts(state:any, data:any) {
      localStorage.removeItem(`FP${data.id}`);
      state.favoritesPosts = state.favoritesPosts.filter((elem:any) => elem.id !== data.id);
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
