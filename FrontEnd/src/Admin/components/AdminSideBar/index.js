import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import AppResource from '../../../general/constants/AppResource';
import './style.scss';

AdminSideBar.propTypes = {
    
};

function AdminSideBar(props) {

    const navigate = useNavigate();
    const location = useLocation();

    function handleOnPage(url){
        navigate(url);
    }

    return (
        <div className="AdminSideBar min-vh-100 d-flex flex-column justify-content-between align-items-start bg-white">
            {/* logo */}
            <div className='mt-5 ms-5 AdminSideBar_Logo' onClick={()=>handleOnPage('/admin/dashboard')}>
                <img src={AppResource.images.logoWithinText} alt='logo'/>
            </div>

            {/* functional button */}
            <div className='AdminSideBar_Tab my-5 w-100 d-flex flex-column align-items-start ps-5 py-5'>
                <div className='AdminSideBar_Button mt-5' onClick={()=>handleOnPage('/admin/dashboard')}>
                    <i className={`AdminSideBar_Icon${location.pathname === '/admin/dashboard' ?'_On':''} fa-solid fa-house-user fa-2x me-3 p-3`}></i>
                    <span className={`AdminSideBar_Title${location.pathname === '/admin/dashboard' ?'_On':''}`}>Trang chủ</span>
                </div>
                <div className='AdminSideBar_Button mt-5' onClick={()=>handleOnPage('/admin/user')}>
                    <i className={`AdminSideBar_Icon${location.pathname === '/admin/user' ?'_On':''} fa-solid fa-users fa-2x me-3 p-3`}></i>
                    <span className={`AdminSideBar_Title${location.pathname === '/admin/user' ?'_On':''}`}>Người dùng</span>
                </div>
                <div className='AdminSideBar_Button mt-5' onClick={()=>handleOnPage('/admin/image')}>
                    <i className={`AdminSideBar_Icon${location.pathname === '/admin/image' ?'_On':''} fa-sharp fa-solid fa-images fa-2x me-3 p-3`}></i>
                    <span className={`AdminSideBar_Title${location.pathname === '/admin/image' ?'_On':''}`}>Ảnh</span>
                </div>
                <div className='AdminSideBar_Button mt-5' onClick={()=>handleOnPage('/admin/personal')}>
                    <i className={`AdminSideBar_Icon${location.pathname === '/admin/personal' ?'_On':''} fa-solid fa-user fa-2x me-3 p-3`}></i>
                    <span className={`AdminSideBar_Title${location.pathname === '/admin/personal' ?'_On':''}`}>Trang cá nhân</span>
                </div>
            </div>

            {/* log out button */}
            <div className='AdminSideBar_Logout d-flex flex-row align-items-center m-5 '>
                <i className="fa-solid fa-right-from-bracket fa-2x me-3"></i>
                Đăng xuất
            </div>
        </div>
    );
}

export default AdminSideBar;