import { configureStore } from "@reduxjs/toolkit";

// slices
import authReducer from "src/features/auth/authSlice";
import packageSlice from "src/features/package/packageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    package: packageSlice
  }
});
