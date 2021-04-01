import {AuthResponse} from "../../utils/interfaces";
import {createSlice} from "@reduxjs/toolkit";
import {loginUser, logoutUser, registerUser, signInWithGoogle} from './thunks'
import {setUser, setName} from './actions'

const initialState: AuthResponse = {
    email: '',
    id: 0,
    user: null,
    isAuth: false,
    username: '',
    error: null,
    loading: false
}

export const defaultError = 'Something went wrong!'


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
        }).addCase(loginUser.rejected, (state, { error }) => {
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
        }).addCase(setName, (state,action) => {
            const {name} = action.payload
            state.username = name
        }).addCase(setUser, (state,action) => {
            const {user} = action.payload
            console.log(user)
            state.user = user
        }).addCase(logoutUser.fulfilled, (state,action) => {
            state.email = ''
            state.username = ''
            state.isAuth = false
            state.loading = false
            state.user = null
        }).addCase(logoutUser.pending, (state) => {
            state.loading = true
            state.error = null
        }).addCase(logoutUser.rejected, (state, {error}) => {
            state.loading = false
            state.error = error.message ?? defaultError
        }).addCase(signInWithGoogle.fulfilled, (state, action) => {
            state.isAuth = true
            state.loading = false
            state.error = null
        }).addCase(signInWithGoogle.rejected, (state, {error}) => {
            state.loading = false
            state.error = error.message ?? defaultError
        }).addCase(signInWithGoogle.pending, (state) => {
            state.loading = true
            state.error = null
        })
        
    }
})


// export const {userExist} = authSlice.actions
export default authSlice.reducer;
