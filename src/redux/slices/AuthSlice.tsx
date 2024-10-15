import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  email: '',
  password: '',
  idToken: '',
  phoneNumber: '',
  uid: '',
  name: '',
  isloggedIn: false,
  photo: '',
  status: 'offline',
  internet: false,
};

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState: {
    email: '',
    password: '',
    idToken: '',
    phoneNumber: '',
    uid: '',
    name: '',
    isloggedIn: false,
    photo: '',
    status: 'offline',
    internet: false,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setIdToken: (state, action) => {
      state.idToken = action.payload;
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
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
    setInternet: (state, action) => {
      state.internet = action.payload;
    },
    resetState: () => initialState,
  },
});

export const {
  setEmail,
  setPassword,
  setIdToken,
  setPhoneNumber,
  setUid,
  setName,
  setIsLoggedIn,
  setPhoto,
  setInternet,
  resetState,
} = AuthSlice.actions;
export default AuthSlice.reducer;
