import {AuthResponse, RegisterBody} from "../../utils/interfaces";
import {createSlice, PayloadAction, createAction} from "@reduxjs/toolkit";
import {AppThunk, RootState} from "../../app/store";
import {loginUser, registerUser} from './thunks'

const initialState: AuthResponse = {
    email: '',
    id: 0,
    user: '',
    isAuth: false,
    username: '',
    error: null,
    loading: false
}

export const defaultError = 'Somthing went wrong!'


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
            state.error = null
        }).addCase(registerUser.fulfilled, (state, action) => {
            const {email, name} = action.payload
            state.email = email
            state.username = name
            state.isAuth = true
            state.loading = false
            state.error = null
        }).addCase(registerUser.rejected, (state, { error }) => {
            state.error = error.message ?? defaultError
            state.loading = false
        })
            .addCase(loginUser.rejected, (state, { error }) => {
            state.loading = false
            state.error = error.message ?? defaultError
        }).addCase(loginUser.fulfilled, (state, action) => {
            const {email} = action.payload
            state.email = email
            state.loading = false
            state.isAuth = true
            state.error = null
        }).addCase(loginUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        
    }
})

// export const {userExist} = authSlice.actions
export const authSelector = (state: RootState) => state.auth
export default authSlice.reducer;
