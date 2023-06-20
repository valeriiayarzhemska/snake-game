import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { gameReducer } from './reducers';
import { watcherSaga } from './sagas';
import { IGlobalState } from './reducers';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore<IGlobalState, any, any, any>(
  gameReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(watcherSaga);
