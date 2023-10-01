import { api } from '../../utils/api';
import { TuserSlice, TUser } from '../../utils/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'user/register',
  async function (body: TUser, { rejectWithValue }) {
    try {
      const res = await api.getRegister('auth/register', body);
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  'user/login',
  async function (body: TUser, { rejectWithValue }) {
    try {
      const res = await api.getLogin('auth/login', body);
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res;
    } catch (error: any) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'user/logout',
  async function (_, { rejectWithValue }) {
    try {
      const data = await api.getLogOut();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const ubdateTokenUser = createAsyncThunk(
  'user/token',
  async function (_, { rejectWithValue }) {
    try {
      const data = await api.getUpdateToken();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const forgotPasswordUser = createAsyncThunk(
  'user/forgotPassword',
  async function (email: string, { rejectWithValue }) {
    try {
      const data = await api.getForgotPassword(email);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPasswordUser = createAsyncThunk(
  'user/resetPassword',
  async function (body: TUser, { rejectWithValue }) {
    try {
      const data = await api.getReserPassword(body);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async function (_, { rejectWithValue }) {
    try {
      const data = await api.getUserData();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async function (form: TUser, { rejectWithValue }) {
    console.log(form);

    try {
      const data = await api.getUpdateUserData(form);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: TuserSlice = {
  user: null,
  email: null,
  name: null,
  password: '',

  accessToken: null,
  refreshToken: null,

  isRequest: false,
  isFailed: false,

  isAuthChecked: false,
  isForgotPasswordRequest: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isRequest = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isRequest = false;
        state.isFailed = action.payload;
        alert(action.payload);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRequest = false;
        state.isFailed = false;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthChecked = true;
        state.user = true;
      })

      .addCase(forgotPasswordUser.pending, (state) => {
        state.isForgotPasswordRequest = true;
      })
      .addCase(forgotPasswordUser.rejected, (state) => {
        state.isForgotPasswordRequest = false;
      })
      .addCase(forgotPasswordUser.fulfilled, (state) => {
        state.isForgotPasswordRequest = true;
      })

      .addCase(loginUser.pending, (state) => {
        state.isRequest = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isRequest = false;
        state.isFailed = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isRequest = false;
        state.isFailed = false;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthChecked = true;
        state.user = true;
      })

      .addCase(logOutUser.pending, (state) => {
        state.isRequest = true;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isRequest = false;
        state.isFailed = action.payload;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.isRequest = false;
        state.isFailed = false;
        state.email = null;
        state.name = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
      })

      .addCase(ubdateTokenUser.pending, (state) => {
        state.isRequest = true;
      })
      .addCase(ubdateTokenUser.rejected, (state, action) => {
        state.isRequest = false;
        state.isFailed = action.payload;
      })
      .addCase(ubdateTokenUser.fulfilled, (state, action) => {
        state.isRequest = false;
        state.isFailed = false;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthChecked = true;
      })

      .addCase(getUser.pending, (state) => {
        state.isRequest = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isRequest = false;
        state.isFailed = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isRequest = false;
        state.isFailed = false;
        state.email = action.payload.user?.email;
        state.name = action.payload.user?.name;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthChecked = true;
        state.user = true;
      })

      .addCase(updateUser.pending, (state) => {
        state.isRequest = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isRequest = false;
        state.isFailed = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isRequest = false;
        state.isFailed = false;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthChecked = true;
        state.user = true;
      });
  },
});

export const { setAuthChecked, setUser } = userSlice.actions;

export default userSlice.reducer;
