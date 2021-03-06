import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterBody} from "../../utils/interfaces";
import { auth, usersCollection, currentUser } from "../../services/firebase";
// import { userExist } from "./authSlice";
import { toast } from "react-toastify";
import { getName, getUser } from "./authSlice";


export const registerUser = createAsyncThunk('register', async ({email, password,name}: RegisterBody, {dispatch}) => {
    try {
        const createdUserResult = await auth.createUserWithEmailAndPassword(email, password)
        dispatch(getUser(createdUserResult))

        await usersCollection.doc(auth.currentUser?.uid).set({
            email: email.toLowerCase(),
            name,
            userPhoto: null,
            userId: auth.currentUser?.uid
        })
        toast.success("You're registered")

    } catch (error) {
        toast.warning(error.message)
        throw error
    }
    return {email, password, name}
});

export const loginUser = createAsyncThunk('login', async ({email, password}: RegisterBody, {dispatch}) => {
    try {
        const user = await auth.signInWithEmailAndPassword(email, password)
        dispatch(getUser(user))

        const userData = await usersCollection.doc(auth.currentUser?.uid).get();
        const name = userData.data()?.name
        dispatch(getName(name))

        toast.success("Hello! You're Sign in")
    } catch (error) {
        toast.warning(error.message)
        throw error
    }
    return {email, password}
})

export const logoutUser = createAsyncThunk('logout', async (_,{dispatch}) => {
    await auth.signOut()
        .then(() => {
            dispatch(getUser(null))
            toast.success("Goodbye!")
        }).catch((err) => {
            console.log('err', err)
            toast.warning(err.message)
        })
})