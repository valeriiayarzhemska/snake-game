import { configureStore, getDefaultMiddleware, AnyAction, Reducer, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { watcherSaga } from './sagas';
import { gameReducer, IGlobalState } from './reducers';
import userSlice, { IUserState } from './slices/userSlice';

export interface RootState {
  game: IGlobalState;
  user: IUserState;
}

const sagaMiddleware = createSagaMiddleware();

const rootReducer: Reducer<RootState, AnyAction> = combineReducers<RootState>({
  game: gameReducer,
  user: userSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
});

sagaMiddleware.run(watcherSaga);

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
