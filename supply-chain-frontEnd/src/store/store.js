import { configureStore, isPlainObject } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import appSlice from "./appSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        isSerializable: (value) =>
          isPlainObject(value) || typeof value === "function",
        warnAfter: 32, // Adjust based on your needs
      },
    }),
});
