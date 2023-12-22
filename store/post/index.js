import { createSlice } from '@reduxjs/toolkit'

const INIT =  {
    allPosts: {
        posts : null,
        comment : null
    },
    newPosts: {
        post: null,
    }
}

export const post = createSlice({
    name: 'post',
    initialState: INIT,
    reducers: {
        getAllPostSuccess: (state, action) => {
            state.allPosts.posts = action.payload;
            return state;
        },
        getNewPostSuccess:(state, action) => {
            state.newPosts.post = action.payload;
            return state;
        }
    },
})

export const {
    getAllPostSuccess,
    getNewPostSuccess,
} = post.actions;

export default post.reducer;