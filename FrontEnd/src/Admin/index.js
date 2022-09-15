import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboard from './screens/AdminDashboard';
import AdminUser from './screens/AdminUsers';
import AdminImage from './screens/AdminImage';
import AdminPersonal from './screens/AdminPersonal';

Admin.propTypes = {
    
};

function Admin(props) {
    return (
        <div>
            <Routes>
                <Route path='' element={<Navigate to='dashboard'/>} />
                <Route path='dashboard' element={<AdminDashboard />} />
                <Route path='user' element={<AdminUser />} />
                <Route path='image' element={<AdminImage />} />
                <Route path='personal' element={<AdminPersonal />} />
            </Routes>
        </div>
    );
}

export default Admin;