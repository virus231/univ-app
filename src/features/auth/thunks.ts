import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterBody} from "../../utils/interfaces";
import { auth, usersCollection } from "../../services/firebase";
// import { userExist } from "./authSlice";
import { toast } from "react-toastify";


export const registerUser = createAsyncThunk('register', async ({email, password,name}: RegisterBody) => {
    try {
        const user = await auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                toast.success("You're registered")
            })
        await usersCollection.doc(auth.currentUser?.uid).set({
            email: email.toLowerCase(),
            name,
            userId: auth.currentUser?.uid
        })
    } catch (error) {
        toast.warning(error.message)
        throw error
    }
    return {email, password, name}
});

export const loginUser = createAsyncThunk('login', async ({email, password}: RegisterBody) => {
    try {
        const user = await auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                toast.success("Hello! You're Sign in")
            })
    } catch (error) {
        console.log(error)
        toast.warning(error.message)
        throw error
    }
    return {email, password}
})