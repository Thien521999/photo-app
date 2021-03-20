import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'features/Auth/userSlice';
import photoReducer from 'features/Photo/PhotoSlice';

//2.setup redux store
const rootReducer = {
  photos: photoReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
