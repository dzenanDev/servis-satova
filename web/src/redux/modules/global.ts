import { createSlice } from '@reduxjs/toolkit';

export enum LOCALE {
  EN = 'en',
}

export type AppState = {
  global: {
    locale: LOCALE;
    collapsed: boolean;
  };
};

const GLOBAL_STATE = 'global';

const slice = createSlice({
  name: GLOBAL_STATE,
  initialState: { locale: LOCALE.EN, collapsed: false },
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
    setSidebarCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
  },
});

export default slice;

export const { setLocale, setSidebarCollapsed } = slice.actions;

export const globalSelector = (state: AppState) => state.global;
