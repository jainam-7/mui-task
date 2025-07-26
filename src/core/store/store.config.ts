import { configureStore } from "@reduxjs/toolkit";
import { authenticationSlice } from "../../features/authentication/store/authentication.slice";
import { userManagementSlice } from "../../features/user-management/store/user-management.slice";

export const demoStore = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
    userManagement: userManagementSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof demoStore.getState>;
export type AppDispatch = typeof demoStore.dispatch;
