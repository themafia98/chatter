import { AppStore, User } from '../../Interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppStore = {
  system: { user: null },
  search: { value: '' },
  users: null,
};

const appReducer = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    setSearchValue: {
      reducer: (state, { payload }: PayloadAction<string>) => {
        state.search.value = payload;
      },
      prepare: (searchValue: string) => ({ payload: searchValue }),
    },
    loadUser: {
      reducer: (state, { payload }: PayloadAction<User>) => {
        state.system.user = payload;
      },
      prepare: (userData: User) => ({ payload: userData }),
    },
    loadUserList: {
      reducer: (state, { payload }: PayloadAction<User[]>) => {
        state.users = payload;
      },
      prepare: (usersList: User[]) => ({ payload: usersList }),
    },
  },
});

export const { setSearchValue, loadUser } = appReducer.actions;

export default appReducer.reducer;