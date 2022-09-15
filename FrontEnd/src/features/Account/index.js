import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Route, Routes } from 'react-router-dom';
import PersonalPage from './screens/PersonalPage';

Account.propTypes = {
    
};

function Account(props) {
    return (
        <div>
            <Routes>
                <Route path='' element={<Navigate to='home' />} />
                <Route path='home' element={<PersonalPage />} />
            </Routes>
        </div>
    );
}

export default Account;