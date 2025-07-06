import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";

// 🔐 LOGIN
export const loginUser = createAsyncThunk(
  "user/login",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", formData, {
        withCredentials: true,
      });
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

// ✍️ REGISTER
export const registerUser = createAsyncThunk(
  "user/register",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post("/users/register", formData, {
        withCredentials: true,
      });
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// 👤 GET PROFILE
export const getUserProfile = createAsyncThunk(
  "user/profile",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/users/profile", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Profile fetch failed"
      );
    }
  }
);

// 🚪 LOGOUT FROM SERVER
export const logoutFromServer = createAsyncThunk(
  "user/logoutServer",
  async (_, thunkAPI) => {
    try {
      await axios.delete("/users/logout", {
        withCredentials: true,
      });
      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Logout failed"
      );
    }
  }
);

// 🧠 USER SLICE
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // REGISTER
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })

      // GET PROFILE
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
        state.loading = false;
      })

      // LOGOUT
      .addCase(logoutFromServer.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      })
      .addCase(logoutFromServer.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logoutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
