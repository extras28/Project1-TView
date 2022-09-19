import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Utils from '../../general/utils/Utils';
import UserHelper from '../../general/helpers/UserHelper';
import { thunkGetAccountInfor } from '../../app/authSlice';

AccountListener.propTypes = {

};

const sTag = '[AccountListener]';

function AccountListener(props) {

    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.auth.currentAccount);

    useEffect(() => {
        console.log(`${sTag} loggedInUser changed`);
        if (Utils.isObjectEmpty(loggedInUser) && UserHelper.checkAccessTokenValid()) {
            dispatch(thunkGetAccountInfor());
        }

    }, [loggedInUser]); 



    return (
        <></>
    );
}

export default AccountListener;