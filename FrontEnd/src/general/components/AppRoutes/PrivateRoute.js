import React from 'react';
import { Navigate } from 'react-router-dom';
import UserHelper from '../../helpers/UserHelper';


// route require Logging in

function PrivateRoute(props) {

    const isAuth = UserHelper.checkAccessTokenValid();

    return isAuth
        ? props.children
        : <Navigate to='/sign-in' />
}

export default PrivateRoute;