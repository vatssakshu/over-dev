import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { persistReducer, persistStore } from 'redux-persist'


const storage = {
    getItem(key) {
      return Promise.resolve(localStorage.getItem(key));
    },
    setItem(key, value) {
      return Promise.resolve(localStorage.setItem(key, value));
    },
    removeItem(key) {
      return Promise.resolve(localStorage.removeItem(key));
    },
  };

const rootReducer = combineReducers({
    user: userReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export const persistor = persistStore(store);