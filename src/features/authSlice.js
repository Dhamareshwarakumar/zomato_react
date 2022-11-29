import { createSlice } from '@reduxjs/toolkit';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


const initialState = {
    isAuthenticated: false,
    user: null, // { user_id, email, role }
    loading: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const decoded = jwt_decode(action.payload);

            if (Date.now() / 1000 > decoded.exp) {
                console.log(`logging Out...`)
                return logout();
            }

            state.isAuthenticated = true;
            state.user = {
                user_id: decoded.user_id,
                email: decoded.email,
                role: decoded.role,
            };

            localStorage.setItem('auth_token', action.payload);
            setAuthToken(action.payload);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;

            localStorage.removeItem('auth_token');
            setAuthToken();
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
});

export const { login, logout, setLoading } = authSlice.actions

export default authSlice.reducer