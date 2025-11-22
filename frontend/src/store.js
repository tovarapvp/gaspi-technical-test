import { configureStore } from '@reduxjs/toolkit';
import providerReducer from './features/providers/providerSlice';

export const store = configureStore({
    reducer: {
        providers: providerReducer,
    },
});
