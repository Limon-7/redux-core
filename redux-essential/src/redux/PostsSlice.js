const { createSlice, nanoid } = require("@reduxjs/toolkit");

const initialState = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    // user: "0",
    // date: sub(new Date(), { minutes: 10 }).toISOString(),
    // reactions: {
    //   thumbsUp: 0,
    //   hooray: 0,
    //   heart: 0,
    //   rocket: 0,
    //   eyes: 0,
    // },
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
    // user: "2",
    // date: sub(new Date(), { minutes: 5 }).toISOString(),
    // reactions: {
    //   thumbsUp: 0,
    //   hooray: 0,
    //   heart: 0,
    //   rocket: 0,
    //   eyes: 0,
    // },
  },
];
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
});
export const { postAdded, postUpdated } = postsSlice.actions;
export default postsSlice.reducer;
