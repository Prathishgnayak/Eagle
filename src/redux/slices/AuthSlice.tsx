import {createSlice} from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState: {email: '', password: '', phoneNumber: '', uid: ''},
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
  },
});

export const {setEmail, setPassword, setPhoneNumber, setUid} = AuthSlice.actions;
export default AuthSlice.reducer;
