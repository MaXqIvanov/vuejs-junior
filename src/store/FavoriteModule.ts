export default {
  state: {
    favoritesPosts: [],
  },
  getters: {
  },
  mutations: {
    getFavoritesPosts(state:any, data:any) {
      const key = Object.keys(localStorage).filter((elem:any) => elem.includes('FP') === true);
      state.favoritesPosts = key.map((elem:any) => ((localStorage.getItem(elem)
      != null) ? JSON.parse(String(localStorage.getItem(elem))) : ''));
    },
    deleteFavoritePost(state:any, data:any) {
      state.favoritesPosts = state.favoritesPosts.filter((elem:any) => elem.id !== data.id);
      localStorage.removeItem(`FP${data.id}`);
    },
  },
  actions: {
  },
  modules: {
  },
  namespaced: true,
};
