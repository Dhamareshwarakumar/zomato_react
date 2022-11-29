import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    err: {},
}

const errorsSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setErrors: (state, action) => {
            state.err = action.payload;
        }
    }
});

export const { setErrors } = errorsSlice.actions;

export default errorsSlice.reducer;