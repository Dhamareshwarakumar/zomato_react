import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/authSlice';
import errorsReducer from '../features/errorsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        error: errorsReducer,
    },
});