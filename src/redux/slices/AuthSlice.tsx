import {createSlice} from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState: {
    email: '',
    password: '',
    phoneNumber: '',
    uid: '',
    name: '',
    isloggedIn: '',
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setUid: (state, action) => {
      state.uid = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isloggedIn = action.payload;
    },
  },
});

export const {
  setEmail,
  setPassword,
  setPhoneNumber,
  setUid,
  setName,
  setIsLoggedIn,
} = AuthSlice.actions;
export default AuthSlice.reducer;
