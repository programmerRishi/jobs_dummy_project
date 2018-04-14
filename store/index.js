// import { createStore, compose, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import reducers from '../reducers';
//
// // applyMiddleware not applyMiddleWare; don't use 'W' use 'w'
//  const store = createStore(
//   reducers,
//   {},
//   compose(
//     applyMiddleware(thunk),
//   )
// );
//
// export default store;

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['likedJobs']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    {},
    compose(
      applyMiddleware(thunk),
    )
  );

const persistor = persistStore(store);

export { store, persistor };
