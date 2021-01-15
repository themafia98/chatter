import { AppStore } from '../../Interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppStore = {
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
  },
});

export const { setSearchValue } = appReducer.actions;

export default appReducer.reducer;