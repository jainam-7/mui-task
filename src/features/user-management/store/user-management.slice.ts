import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { UserProfile, LoadingState } from "../../../core/types/common.types"

interface UserManagementState extends LoadingState {
  usersList: UserProfile[]
  allUsers: UserProfile[]
  pagination: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
  analyticsLoading: boolean
  analyticsError: string | null
}

const initialState: UserManagementState = {
  usersList: [],
  allUsers: [],
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  },
  isLoading: false,
  error: null,
  analyticsLoading: false,
  analyticsError: null,
}

// transform API data to our user profile type
const transformApiUser = (apiUser: any): UserProfile => ({
  id: apiUser.id,
  firstName: apiUser.firstName,
  lastName: apiUser.lastName,
  username: apiUser.username,
  email: apiUser.email,
  phone: apiUser.phone,
  website: apiUser.domain ? `https://${apiUser.domain}` : `https://${apiUser.username}.example.com`,
  avatar: apiUser.image,
  age: apiUser.age,
  gender: apiUser.gender,
  birthDate: apiUser.birthDate,
  bloodGroup: apiUser.bloodGroup,
  height: apiUser.height,
  weight: apiUser.weight,
  eyeColor: apiUser.eyeColor,
  company: apiUser.company
    ? {
        name: apiUser.company.name,
        department: apiUser.company.department,
        title: apiUser.company.title,
      }
    : undefined,
  address: apiUser.address
    ? {
        city: apiUser.address.city,
        state: apiUser.address.state,
        country: apiUser.address.country,
        street: apiUser.address.address,
        postalCode: apiUser.address.postalCode,
        coordinates: apiUser.address.coordinates,
      }
    : undefined,
  isActive: true,
  createdAt: new Date().toISOString(),
})

export const fetchUsers = createAsyncThunk(
  "userManagement/fetchUsers",
  async ({ page, limit }: { page: number; limit: number }) => {
    const skip = (page - 1) * limit
    const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.users || !Array.isArray(data.users)) {
      throw new Error("Invalid response format from API")
    }

    const transformedUsers = data.users.map(transformApiUser)

    return {
      users: transformedUsers,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: data.total,
        totalPages: Math.ceil(data.total / limit),
      },
    }
  },
)

export const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearAnalyticsError: (state) => {
      state.analyticsError = null
    },
    updatePagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.usersList = action.payload.users
        state.pagination = action.payload.pagination
        state.lastUpdated = new Date().toISOString()
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch users"
      })
  },
})

export const { clearError, clearAnalyticsError, updatePagination } = userManagementSlice.actions
