// REDUX STORE WHOLES THE STATE TREE OF APP. 
// ONLY WAY TO CHANGE THE STATE INSIDE IS TO DISPATCH AN ACTION ON IT
// STORE IS AN OBJECT WITH A FEW METHODS TO GET STATE / DISPATCH ACTION / 

import {configureStore, combineReducers} from "@reduxjs/toolkit";
import cartReducer from './cartRedux';
import userReducer from './userRedux';
import wishlistReducer from "./wishlistRedux";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER} from "redux-persist";
  import storage from "redux-persist/lib/storage";

  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
  // turns object whose values are different reducing functions into a single reducing function to pass to createStore
  const rootReducer = combineReducers({user: userReducer, cart:cartReducer, wishlist:wishlistReducer});
  const persistedReducer = persistReducer(persistConfig, rootReducer);

// configureStore combines slice reducers and add redux middleware supplied
export const store =  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

export let persistor = persistStore(store);