import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const postModule = {
  state: () => ({
    posts: [],
    dialogVisible: false,
    isPostLoading: false,
    selectedSort: '',
    searchQuery: '',
    page: 1,
    limit: 10,
    totalPages: 0,
    sortOptions: [
      { value: 'title', name: 'По названию' },
      { value: 'body', name: 'По содержанию' },
    ],
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts]
        .sort((post1, post2) => post1[state
          .selectedSort]?.localeCompare(post2[state
          .selectedSort]));
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedDate
        .filter((post) => post.title.toLowerCase()
          .includes(state.searchQuery));
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostLoading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setLoading', true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit,
          },
        });
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / this.limit));
        commit('setPosts', response.data);
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert('Error');
      } finally {
        commit('setLoading', false);
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit('setPage', state.page + 1);
        // eslint-disable-next-line no-undef
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit,
          },
        });
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', [...this.posts, ...response.data]);
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert('loadMorePosts Error');
        this.isPostLoading = true;
      } finally {
        this.isPostsLoading = false;
      }
    },
  },
  namespaced: true,
};
