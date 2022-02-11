import axios from 'axios';

export default {
  data() {
    return {
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
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });
        this.posts = response.data;
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert('Error');
        this.isPostLoading = true;
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert('Error');
        this.isPostLoading = true;
      } finally {
        this.isPostsLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      // eslint-disable-next-line max-len
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
    },
    sortedDate() {
      return [...this.sortedPosts].sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    sortedAndSearchedPosts() {
      return this.sortedDate.filter((post) => post.title.toLowerCase().includes(this.searchQuery));
    },
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // },
  },
};
