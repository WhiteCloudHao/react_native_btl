import { createSlice } from '@reduxjs/toolkit'

const INIT =  {
    userInfor: {},
    userInforSignIn: {
        
    },
    token: "",
}

export const auth = createSlice({
  name: 'auth',
  initialState: INIT,
  reducers: {
    getUserInforSignIn: (state) => {
      return state;
    },
    setUserSignInEmail: (state,action) => {
        state.userInforSignIn.email = action.payload;
        return state;
    },
    setUserSignInPassword: (state,action) => {
        state.userInforSignIn.password = action.payload;
        return state;
    },
    setUserSignInFirstName: (state,action) => {
        state.userInforSignIn.firstName = action.payload;
        return state;
    },
    setUserSignInLastName: (state,action) => {
        state.userInforSignIn.lastName = action.payload;
        return state;
    },
    setUserSignInBirthDay: (state,action) => {
        state.userInforSignIn.birthDay = action.payload;
        return state;
    },
    setToken: (state,action) => {
      state.token = action.payload;
      return state;
    },
    setUserId: (state, action) => {
        state.userInfor.userId = action.payload
        return state
    },
  },
})

// Action creators are generated for each case reducer function
export const { getUserInforSignIn, setUserSignInEmail, setUserSignInPassword, setUserSignInFirstName, setUserSignInLastName, setUserSignInBirthDay, setToken, setUserId } = auth.actions

export default auth.reducer