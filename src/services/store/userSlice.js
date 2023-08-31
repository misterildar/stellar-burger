import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';



export const registerUser = createAsyncThunk(
  'user/register',
  async function (body, { rejectWithValue }) {
    try {
      const res = await api.getRegister('auth/register', body)
      localStorage.setItem("accessToken", res.accessToken, { 'max-age': 1200 });
      localStorage.setItem("refreshToken", res.refreshToken);
      return res
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  'user/login',
  async function (body, { rejectWithValue }) {
    try {
      const res = await api.getLogin('auth/login', body)
      localStorage.setItem("accessToken", res.accessToken, { 'max-age': 1200 });
      localStorage.setItem("refreshToken", res.refreshToken);
      return res
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);


export const logOutUser = createAsyncThunk(
  'user/logout',
  async function (body, { rejectWithValue }) {
    try {
      const data = await api.getLogOut(body)
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const ubdateTokenUser = createAsyncThunk(
  'user/token',
  async function ({ rejectWithValue }) {
    try {
      const data = await api.getUpdateToken()
      return data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const forgotPasswordUser = createAsyncThunk(
  'user/forgotPassword',
  async function (email, { rejectWithValue }) {
    try {
      const data = await api.getForgotPassword(email)
      localStorage.setItem('resetEmail', email);
      return data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const resetPasswordUser = createAsyncThunk(
  'user/resetPassword',
  async function (body, { rejectWithValue }) {
    try {
      const data = await api.getReserPassword(body)
      return data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)



export const getUser = createAsyncThunk(
  'user/updateUser',
  async function ({ rejectWithValue }) {
    try {
      const data = await api.getUserData()
      return data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async function (form, { rejectWithValue }) {
    try {
      const data = await api.getUpdateUserData(form)
      return data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)



const initialState = {
  user: null,
  email: null,
  name: null,
  password: '',

  accessToken: null,
  refreshToken: null,

  isRequest: false,
  isFailed: false,

  isAuthChecked: false,
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

  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isRequest = true;
    },
    [registerUser.rejected]: (state, action) => {
      state.isRequest = false;
      state.isFailed = action.payload
      alert(action.payload)
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isRequest = false;
      state.isFailed = false
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthChecked = true;
      state.user = true;
    },


    [forgotPasswordUser.pending]: (state) => {
      state.isForgotPasswordRequest = true;
    },
    [forgotPasswordUser.rejected]: (state) => {
      state.isForgotPasswordRequest = false;
    },
    [forgotPasswordUser.fulfilled]: (state) => {
      state.isForgotPasswordRequest = true;
    },


    [loginUser.pending]: (state) => {
      state.isRequest = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.isRequest = false;
      state.isFailed = action.payload
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isRequest = false;
      state.isFailed = false
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthChecked = true;
      state.user = true;
    },


    [logOutUser.pending]: (state) => {
      state.isRequest = true;
    },
    [logOutUser.rejected]: (state, action) => {
      state.isRequest = false;
      state.isFailed = action.payload
    },
    [logOutUser.fulfilled]: (state) => {
      state.isRequest = false;
      state.isFailed = false
      state.email = null;
      state.name = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },


    [ubdateTokenUser.pending]: (state) => {
      state.isRequest = true;
    },
    [ubdateTokenUser.rejected]: (state, action) => {
      state.isRequest = false;
      state.isFailed = action.payload
    },
    [ubdateTokenUser.fulfilled]: (state, action) => {
      state.isRequest = false;
      state.isFailed = false
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthChecked = true;
    },


    [getUser.pending]: (state) => {
      state.isRequest = true;
    },
    [getUser.rejected]: (state, action) => {
      state.isRequest = false;
      state.isFailed = action.payload
    },
    [getUser.fulfilled]: (state, action) => {
      state.isRequest = false;
      state.isFailed = false
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthChecked = true;
      state.user = true;
    },


    [updateUser.pending]: (state) => {
      state.isRequest = true;
    },
    [updateUser.rejected]: (state, action) => {
      state.isRequest = false;
      state.isFailed = action.payload
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isRequest = false;
      state.isFailed = false
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthChecked = true;
      state.user = true;
    },
  }
})

export const { setAuthChecked, setUser } = userSlice.actions;

export default userSlice.reducer






