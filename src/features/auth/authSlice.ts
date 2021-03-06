import {AuthResponse} from "../../utils/interfaces";
import {createSlice, createAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {loginUser, logoutUser, registerUser} from './thunks'

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

export const getName = createAction('getName', function getName(name: string) {
    return {
        payload: {
            name
        }
    }
})
export const getUser = createAction('getUser', function getUser(user: any) {
    return {
        payload: {
            user
        }
    }
})

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
        }).addCase(getName, (state,action) => {
            const {name} = action.payload
            state.username = name
        }).addCase(getUser, (state,action) => {
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
        })
        
    }
})


// export const {userExist} = authSlice.actions
export const authSelector = (state: RootState) => state.auth
export default authSlice.reducer;
