import { createStore, applyMiddleware, Store } from 'redux';
import { logger } from '../middleware';
import rootReducer, { RootState } from '../reducers';
import thunk from 'redux-thunk';
export default function configureStore(initialState?: RootState): Store<RootState> {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore;

  const createStoreWithMiddleware = applyMiddleware(thunk, logger)<RootState>(create);

  const store = createStoreWithMiddleware(rootReducer, initialState) as Store<RootState>;

  if ((module as any).hot) {
    (module as any).hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
