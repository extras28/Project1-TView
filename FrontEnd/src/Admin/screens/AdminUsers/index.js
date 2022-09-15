import React from 'react';
import PropTypes from 'prop-types';
import AdminSideBar from '../../components/AdminSideBar';
import AdminPageContent from '../../components/AdminPageContent';

AdminUser.propTypes = {
    
};

function AdminUser(props) {
    return (
        <div className='AdminDashboard d-flex flex-row bg-light'>
            <AdminSideBar />
            <AdminPageContent 
                title='Danh sách tài khoản'
            />
        </div>
    );
}

export default AdminUser;