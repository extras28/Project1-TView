import React from 'react';
import PropTypes from 'prop-types';
import AdminSideBar from '../../components/AdminSideBar';
import AdminPageContent from '../../components/AdminPageContent';


AdminDashboard.propTypes = {
    
};

function AdminDashboard(props) {
    return (
        <div className='AdminDashboard d-flex flex-row bg-light'>
            <AdminSideBar />
            <AdminPageContent 
                title='Dashboard'
            />
        </div>
    );
}

export default AdminDashboard;