import { createStore } from 'vuex';

// Cargar el usuario desde localStorage si existe
const savedUser = JSON.parse(localStorage.getItem('user'));

const store = createStore({
    state: {
        user: savedUser || null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;

            localStorage.setItem('user', JSON.stringify(user));
        },
        clearUser(state) {
            state.user = null;

            localStorage.removeItem('user');
        }
    },
    actions: {
        loginStore({ commit }, user) {
            commit('setUser', user);
        },
        logoutStore({ commit }) {
            commit('clearUser');
        }
    },
    getters: {
        isAuthenticated: state => !!state.user,
        getUser: state => state.user,
    }
});

export default store;
