import { createStore } from 'vuex';
import FavoriteModule from './FavoriteModule';
import HomeModule from './HomeModule';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    home: HomeModule,
    favorite: FavoriteModule,
  },
});
