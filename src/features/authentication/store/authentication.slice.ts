import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthUser, LoadingState } from "../../../core/types/common.types"
import { APP_CONFIG, STORAGE_KEYS } from "../../../core/constants/app-constants"

interface AuthenticationState extends LoadingState {
  currentUser: AuthUser | null
  isAuthenticated: boolean
  sessionToken: string | null
}

const initialState: AuthenticationState = {
  currentUser: null,
  isAuthenticated: false,
  sessionToken: null,
  isLoading: false,
  error: null,
}

// Async Thunks
export const authenticateUser = createAsyncThunk(
  "authentication/authenticateUser",
  async (credentials: { email: string; password: string }) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock authentication logic
    if (credentials.email === APP_CONFIG.demo.email && credentials.password === APP_CONFIG.demo.password) {
      const mockUser: AuthUser = {
        id: "usr_001",
        email: credentials.email,
        firstName: "Alex",
        lastName: "Morgan",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        role: "admin",
        permissions: ["read", "write", "delete", "admin"],
      }

      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(mockUser))
      }

      return {
        user: mockUser,
        token: "mock_jwt_token_" + Date.now(),
      }
    } else {
      throw new Error("Invalid credentials. Please check your email and password.")
    }
  },
)

export const logoutUser = createAsyncThunk("authentication/logoutUser", async () => {
  // Clear localStorage
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEYS.user)
  }

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return true
})

// Slice
export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null
    },
    restoreSession: (state, action: PayloadAction<AuthUser>) => {
      state.currentUser = action.payload
      state.isAuthenticated = true
      state.sessionToken = "restored_session"
    },
  },
  extraReducers: (builder) => {
    builder
      // Authenticate User
      .addCase(authenticateUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentUser = action.payload.user
        state.sessionToken = action.payload.token
        state.isAuthenticated = true
        state.lastUpdated = new Date().toISOString()
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Authentication failed"
        state.isAuthenticated = false
        state.currentUser = null
        state.sessionToken = null
      })
      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.currentUser = null
        state.sessionToken = null
        state.isAuthenticated = false
        state.error = null
      })
  },
})

export const { clearAuthError, restoreSession } = authenticationSlice.actions
