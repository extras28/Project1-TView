import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminUser from './screens/AdminUsers';
import AdminImage from './screens/AdminImage';

Admin.propTypes = {
    
};

function Admin(props) {
    return (
        <div>
            <Routes>
                <Route path='' element={<Navigate to='user'/>} />
                <Route path='user' element={<AdminUser />} />
                <Route path='image' element={<AdminImage />} />
            </Routes>
        </div>
    );
}

export default Admin;