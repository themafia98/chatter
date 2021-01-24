import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import chatReducer from './chatReducer/chatReducer.slice';
import appReducer from './appReducer/appReducer.slice';

const middleware = getDefaultMiddleware({
  immutableCheck: true,
  serializableCheck: true,
  thunk: true,
});

export default configureStore({
  reducer: { chatReducer, appReducer },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});