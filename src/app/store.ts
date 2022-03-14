import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer, { ticketSlice } from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    ticket: ticketSlice.reducer,
    
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
