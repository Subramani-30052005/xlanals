import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 🧪 Dummy login function to simulate backend
export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  if (email === 'test@example.com' && password === '123456') {
    return {
      token: 'dummy-jwt-token-123',
      user: { email: 'test@example.com' }
    };
  } else {
    throw new Error('Invalid credentials');
  }
});

export const register = createAsyncThunk('auth/register', async ({ email,  }) => {
  // Simulate registration (use real API later)
  return {
    token: 'registered-token-456',
    user: { email }
  };
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
