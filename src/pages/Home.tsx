import React from 'react';
import {useSelector} from 'react-redux'
import { authSelector } from '../redux/auth/selectors';


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