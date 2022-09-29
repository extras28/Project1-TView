import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import AppSearchBar from '../../AppSearchBar';
import AppButton from '../../AppButton';
import AppResource from '../../../constants/AppResource';
import AppAvatar from '../../AppAvatar';
import { thunkSignOut } from '../../../../app/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppDeleteModal from '../../AppModalDelete';
import { thunkGetOwnImages } from 'features/Account/AccountSlice';

HeaderDashboard.propTypes = {
    isPin: PropTypes.bool,
    isAdmin: PropTypes.bool,
};

HeaderDashboard.defaultProps = {
    isPin: false,
    isAdmin: false,
}

function HeaderDashboard(props) {

    const { isPin, isAdmin } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modalSignOut, setModalSignOut] = useState(false);
    const currentAccount = useSelector(state => state?.auth?.currentAccount);

    function handleNavigate(url){
        navigate(url)
    };

    function handleSignOut(){
        console.log('aaaaa');
        dispatch(thunkSignOut());
        handleNavigate('/');
    }
    return (
        <>
            <div className='HeaderDashboard sticky-top d-flex flex-row align-items-center justify-content-between bg-white'>
                <div className='d-flex flex-row'>
                    <img src={AppResource.images.logoWithoutText} alt='logo' className='ms-5 HeaderDashboard_Logo' onClick={()=>handleNavigate('/dashboard')}/>
                    {!isAdmin && <AppButton
                        beforIcon={(<i className="fas fa-arrow-up text-white mr-2"></i>)}
                        className='btn-green ml-4'
                        text='Tạo'
                        onClick={()=>handleNavigate('/upload')}
                    />}
                </div>

                <div className='d-flex flex-row'>
                    <AppAvatar 
                        src = {
                            currentAccount ?.avatar
                        }
                        size = '50px'
                        onClick = {
                            () => {
                                handleNavigate('/account');
                            }
                        }
                    />
                    <div>
                    <AppButton 
                        className='btn-red mx-4'
                        text='Đăng xuất'
                        onClick={()=>{
                            setModalSignOut(true);
                        }}
                    />
                </div>
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
        </>
    );
}

export default HeaderDashboard;