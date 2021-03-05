import React from 'react';
import {useSelector} from 'react-redux'
import { authSelector } from '../features/auth/authSlice';


export const Home = () => {
    const {loading, error, isAuth } = useSelector(authSelector)

    if(loading) {
        return (
            <p>Welcome</p>
        )
    }

    return (
        <div>Home</div>
    )
}