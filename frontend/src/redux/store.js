// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// ✅ Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// ✅ Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cart"], // ✅ include cart to persist it too
};

// ✅ Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// ✅ Persistor for <PersistGate>
export const persistor = persistStore(store);
