import { configureStore } from "@reduxjs/toolkit";

export const demoStore = configureStore({
  reducer: {
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
