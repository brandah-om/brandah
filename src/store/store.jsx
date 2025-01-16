import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
export const store = configureStore({
    reducer: {},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
});
