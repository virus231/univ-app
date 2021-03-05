import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import {authSelector} from "../features/auth/authSlice";


interface Props extends RouteProps {
    component: any;
}

const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) => {
    const {isAuth} = useSelector(authSelector)


    return(
        <Route {...rest} render={props => isAuth ? <Component {...props} /> : <Redirect to="/auth/login" />} />
    );
}

export default PrivateRoute;