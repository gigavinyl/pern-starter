import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/reducer';
import thunk from 'redux-thunk';

export function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ));
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/reducer', () => {
      const nextReducer = require('../reducers/reducer');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
