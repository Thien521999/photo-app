import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import Storekeys from 'constants/storage-key';

// First, create the thunk
export const register = createAsyncThunk('user/register', async (payload) => {
  //call api to register
  const data = await userApi.register(payload);
  console.log(data);
  //save local storage
  localStorage.setItem(Storekeys.TOKEN, data.jwt);
  localStorage.setItem(Storekeys.USER, JSON.stringify(data.user));
  return data.user;
});

export const login = createAsyncThunk('user/login', async (payload) => {
  //call api to login
  const data = await userApi.login(payload);
  console.log(data);
  //save local storage
  localStorage.setItem(Storekeys.TOKEN, data.jwt);
  localStorage.setItem(Storekeys.USER, JSON.stringify(data.user));
  return data.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(Storekeys.USER)) || {},
    setting: {},
  },
  reducers: {
    logout(state,action) {
      //clear localstorage
      localStorage.removeItem(Storekeys.TOKEN);
      localStorage.removeItem(Storekeys.USER);
      //update current = {}
      state.current={};
    }
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const {logout} = actions;
export default reducer;
