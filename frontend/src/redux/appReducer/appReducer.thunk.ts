import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_VERSION } from '../../App.config.json';

export const loadSession = createAsyncThunk(
  `/api/${API_VERSION}/system/session`,
  async (a, b): Promise<null> => null
);