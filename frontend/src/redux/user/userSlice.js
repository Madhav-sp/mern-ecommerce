import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";

// 🔐 LOGIN
export const loginUser = createAsyncThunk(
  "user/login",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", formData, {
        withCredentials: true, // ✅ Important when using cookies
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
        withCredentials: true, // ✅ Cookie must be sent
      });
      

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Profile fetch failed"
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
      state.user = action.payload; // ✅ Fixed from userInfo
    },
  },
  extraReducers: (builder) => {
    builder
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

      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })

      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
   },
});

export const { logoutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
