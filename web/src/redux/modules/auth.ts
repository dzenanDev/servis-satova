import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import fetchHelper from '@utils/apiHelper';
export type RootState = any;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

const auth = 'auth';

export interface AuthError {
  message: string;
}

export interface CurrentUser {
  id?: string;
  isAdmin?: boolean;
  display_name?: string;
  email?: string;
  photo_url?: string;
}

export interface AuthState {
  isAuth: boolean;
  isAdmin: boolean;
  currentUser: CurrentUser;
  isLoading: boolean;
  error: AuthError;
}

export const initialState: AuthState = {
  isAuth: false,
  isAdmin: false,
  isLoading: false,
  currentUser: {
    id: undefined,

    display_name: undefined,
    email: undefined,
    photo_url: undefined,
  },
  error: { message: 'An Error occurred' },
};

const slice = createSlice({
  name: auth,
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setAuthSuccess: (state, { payload }: PayloadAction<any>) => {
      state.currentUser = payload;
      state.isAuth = true;
      state.isAdmin = payload;
    },
    setLogOut: state => {
      state.isAuth = false;
      state.isAdmin = false;
      state.currentUser = {
        id: undefined,

        display_name: undefined,
        email: undefined,
        photo_url: undefined,
      };
    },
    setAuthFailed: (state, { payload }: PayloadAction<any>) => {
      state.error = payload;
      state.isAuth = false;
      state.isAdmin = false;
    },
  },
});

export const {
  setAuthSuccess,
  setLogOut,
  setLoading,
  setAuthFailed,
} = slice.actions;

export const login = (values: any): AppThunk => async dispatch => {
  try {
    dispatch(setLoading(true));

    await fetchHelper('/api/login', values, {
      method: 'POST',
    }).then(response => {
      const obj2 = JSON.stringify(response.auth);
      const err = JSON.stringify(response.message);

      if (response.auth == false) {
        console.log(response.message);
        dispatch(
          setAuthFailed({
            error: err,
          })
        );
      } else {
        const isAdmin: boolean = response.isAdmin;
        dispatch(
          setAuthSuccess({
            isAdmin: isAdmin,
            display_name: values.office,
          })
        );
      }
    });
  } catch (error) {
    dispatch(setAuthFailed(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logOut = (): AppThunk => async dispatch => {
  try {
    dispatch(setLoading(true));
    // await apiCallendUserSession();
    dispatch(setLogOut());
  } catch (error) {
    dispatch(setAuthFailed(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export default slice;
export const authSelector = (state: { auth: AuthState }) => state.auth;
