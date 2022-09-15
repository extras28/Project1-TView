import React from 'react';
import PropTypes from 'prop-types';
import AdminSideBar from '../../components/AdminSideBar';
import AdminPageContent from '../../components/AdminPageContent';


AdminPersonal.propTypes = {
    
};

function AdminPersonal(props) {
    return (
        <div className='AdminPersonal d-flex flex-row bg-light'>
            <AdminSideBar />
            <AdminPageContent 
                title='Trang cá nhân'
            />
        </div>
    );
}

export default AdminPersonal;