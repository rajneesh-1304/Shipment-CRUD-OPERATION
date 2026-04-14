import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import schemaReducer from './features/schema/schemaSlice';
import shipmentReducer from './features/shipment/shipmentSlice';
import stopReducer from './features/stops/stopsSlice'

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["schema", "shipment", "stop"], 
};

const rootReducer = combineReducers({
  schema: schemaReducer,
  shipment: shipmentReducer,
  stop: stopReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
