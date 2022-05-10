import { createStore } from 'vuex';
import HomeModule from './HomeModule';

export default createStore({
  state: {
    anyNum: 0,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    home: HomeModule,
  },
});
