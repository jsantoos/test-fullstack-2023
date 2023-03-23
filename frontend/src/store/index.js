import { createStore } from 'vuex';

const store = createStore({
  state: {
    token: localStorage.getItem('token') || '',
    userRole: localStorage.getItem('userRole') || '',
  },
  mutations: {
    auth_success(state, { token, userRole }) {
      state.token = token;
      state.userRole = userRole;
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', userRole);
    },
    logout(state) {
      state.token = '';
      state.userRole = '';
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    },
  },
  actions: {
    login({ commit }, { token, userRole }) {
      commit('auth_success', { token, userRole });
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.userRole === 'admin',
  },
});

export default store;
