import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import AppResource from '../../../constants/AppResource';
import { useNavigate } from 'react-router-dom';
import AppButton from '../../AppButton'

HeaderLandingPage.propTypes = {
    authScreen: PropTypes.bool,
};

HeaderLandingPage.defaultProps = {
    authScreen: false
}

function HeaderLandingPage(props) {

    const { authScreen } = props;

    const navigate = useNavigate();

    function handleNavigate(url){
        navigate(url)
    }

    return (
        <>
            <div className='HeaderLandingPage sticky-top bg-white d-flex flex-row align-items-center justify-content-between bg-warning'>
                <div className='ms-3'>
                    <img src={AppResource.images.logoWithinText} alt='logo'/>
                </div>
                {!authScreen && <div className='me-3 d-flex flex-row'>
                    <AppButton 
                        text='Đăng nhập'
                        className='btn-green mr-5'
                        onClick={()=>handleNavigate('/sign-in')}
                    />
                    <AppButton 
                        style={{border: '1px solid #2E8FE9', backgroundColor: '#FFFFFF', color: '#2E8FE9'}}
                        className='btn-white'
                        text='Đăng ký'
                        onClick={()=>handleNavigate('/sign-up')}
                    />
                </div>}
            </div>
        </>
    );
}

export default HeaderLandingPage;