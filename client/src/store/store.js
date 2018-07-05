import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/main';

const configureStore = () => {
  return createStore(rootReducer, null, applyMiddleware(thunk));
};

export default configureStore();
