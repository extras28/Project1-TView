import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Route, Routes } from 'react-router-dom';
import PersonalPage from './screens/PersonalPage';
import AccountInforScreen from './screens/AccountInforScreen';

Account.propTypes = {
    
};

function Account(props) {
    return (
        <div>
            <Routes>
                <Route path='' element={<Navigate to='home' />} />
                <Route path='home' element={<PersonalPage />} />
                <Route path='profile' element={<AccountInforScreen />} />
            </Routes>
        </div>
    );
}

export default Account;