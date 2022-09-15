import React from 'react';
import { Navigate } from 'react-router-dom';
import PreferenceKeys from '../../constants/PreferenceKeys';
import UserHelper from '../../helpers/UserHelper';


// route require Logging in

function GuestRoute(props) {

    const isAuth = UserHelper.checkAccessTokenValid();

    return !isAuth
        ? props.children
        : <Navigate to='/dashboard' />
}

export default GuestRoute;