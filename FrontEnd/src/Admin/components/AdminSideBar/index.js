import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppResource from '../../../general/constants/AppResource';
import './style.scss';
import { thunkSignOut } from '../../../app/authSlice';
import AppDeleteModal from 'general/components/AppModalDelete';

AdminSideBar.propTypes = {
    
};

function AdminSideBar(props) {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [modalSignOut, setModalSignOut] = useState(false);

    function handleSignOut(){
        console.log('aaaaa');
        dispatch(thunkSignOut());
        handleOnPage('/');
    }

    function handleOnPage(url){
        navigate(url);
    }

    return (
        <div className="AdminSideBar min-vh-100 d-flex flex-column justify-content-between align-items-start bg-white">
            {/* logo */}
            <div className='mt-5 ms-5 AdminSideBar_Logo' onClick={()=>handleOnPage('/admin')}>
                <img src={AppResource.images.logoWithinText} alt='logo'/>
            </div>

            {/* functional button */}
            <div className='AdminSideBar_Tab my-5 w-100 d-flex flex-column align-items-start ps-5 py-5'>
                <div className='AdminSideBar_Button mt-5' onClick={()=>handleOnPage('/admin/user')}>
                    <i className={`AdminSideBar_Icon${location.pathname === '/admin/user' ?'_On':''} fa-solid fa-users fa-2x me-3 p-3`}></i>
                    <span className={`AdminSideBar_Title${location.pathname === '/admin/user' ?'_On':''}`}>Người dùng</span>
                </div>
                <div className='AdminSideBar_Button mt-5' onClick={()=>handleOnPage('/admin/image')}>
                    <i className={`AdminSideBar_Icon${location.pathname === '/admin/image' ?'_On':''} fa-sharp fa-solid fa-images fa-2x me-3 p-3`}></i>
                    <span className={`AdminSideBar_Title${location.pathname === '/admin/image' ?'_On':''}`}>Ảnh</span>
                </div>
            </div>

            {/* log out button */}
            <div className='AdminSideBar_Logout d-flex flex-row align-items-center m-5' onClick={()=>{
                setModalSignOut(true);
                }}>
                <i className="fa-solid fa-right-from-bracket fa-2x me-3"></i>
                Đăng xuất
            </div>
            <AppDeleteModal
            show={modalSignOut}
            onClose={() => setModalSignOut(false)}
            deleteItem={handleSignOut}
            deleteTitle="Đăng xuất"
            deleteText="Bạn có chắc chắn muốn đăng xuất ?"
            icon={<i className="fad fa-user text-danger fa-6x py-6"></i>}
          />
        </div>
    );
}

export default AdminSideBar;