export const state = () => ({
  posts: null,
  comments: null
});

export const getters = {
  posts: (state) => state.posts,
  comments: (state) => state.comments
};

export const mutations = {
  saveComments(state, comments) {
    const { data } = comments;
    state.comments = data;
  },
  savePosts(state, posts) {
    const { data } = posts;
    state.posts = data;
  }
};

export const actions = {
  async getComments({ commit }, query) {
    const { data } = await this.$axios.get(`/api/comments?${query}`);
    commit("saveComments", data);
  },
  async getPosts({ commit }, query) {
    const { data } = await this.$axios.get(`/api/submissions?${query}`);
    commit("savePosts", data);
  }
};
