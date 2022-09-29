import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AppButton from 'general/components/AppButton';
import { useState } from 'react';
import { thunkSignOut } from 'app/authSlice';
import { useDispatch } from 'react-redux';
// import AppDeleteModal from 'general/components/AppDeleteModal';
import ModalChangePassword from '../AccountChangePassModal';
import AppDeleteModal from 'general/components/AppModalDelete';

AccountContent.propTypes = {
    title: PropTypes.string,
    cotent: PropTypes.element,
    setting: PropTypes.bool,
};

AccountContent.defaultProps = {
    title: '',
    content: (<div></div>),
    setting: false
}

function AccountContent(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        title,
        content,
        setting
    } = props;
    const [modalSignOut, setModalSignOut] = useState(false);
    const [modalChangePassword, setModalChangePassword] = useState(false);


    function handleNavigate() {
        navigate('/account')
    };

    function handleSignOut() {
        dispatch(thunkSignOut());
        navigate("/");
    };
    return (
        <div className="container-fluid mt-10" style={{ filter: 'drop-shadow(0px 10px 60px rgba(0, 0, 0, 0.15))' }}>
            <div className="border">
                {/* Header */}
                <div className="bg-white p-5 border-bottom d-flex flex-row justify-content-between align-items-center">
                    <div>
                        <span className='font-weight-bold cursor-pointer' style={{ fonntSize: '16px', lineHeight: '24px', color: '#E92E4E' }} onClick={handleNavigate}>Thiết lập  /</span>
                        <span className='font-weight-bold ms-1' style={{ fonntSize: '16px', lineHeight: '24px', color: '#4A5677' }}>{title}</span>
                    </div>
                    {setting 
                    && <div className='d-flex flex-sm-row flex-column'>
                        <AppButton 
                            
                            text='Đổi mật khẩu'
                            className='btn-white border order-2 order-sm-1 mt-2 mt-sm-0'
                            onClick={()=>setModalChangePassword(true)}
                        />
                        <AppButton 
                            
                            text='Đăng xuất'
                            className='btn-red ml-4  order-1 order-sm-2'
                            onClick={()=>{setModalSignOut(true)}}
                        />
                    </div>}
                </div>

                {/* Content */}
                <div className='p-3' style={{ background: '#F6F7FB' }}>
                    {content}
                </div>
            </div>
            <AppDeleteModal
                show={modalSignOut}
                onClose={() => setModalSignOut(false)}
                deleteItem={handleSignOut}
                deleteTitle="Đăng xuất"
                deleteText="Bạn có chắc chắn muốn đăng xuất ?"
                icon={<i className="fad fa-user text-danger fa-6x py-6"></i>}
            />
            <ModalChangePassword 
                show={modalChangePassword}
                onClose={()=>setModalChangePassword(false)}
            />
        </div>
    );
}

export default AccountContent;