import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import AppSearchBar from '../../AppSearchBar';
import AppResource from '../../../constants/AppResource';
import AppAvatar from '../../AppAvatar';
import { useNavigate } from 'react-router-dom';
HeaderDashboard.propTypes = {
    
};

function HeaderDashboard(props) {

    const navigate = useNavigate();

    function handleNavigate(url){
        navigate(url)
    }
    return (
        <>
            <div className='HeaderDashboard sticky-top d-flex flex-row align-items-center justify-content-between bg-white'>
                <img src={AppResource.images.logoWithoutText} alt='logo' className='ms-5 HeaderDashboard_Logo' onClick={()=>handleNavigate('/dashboard')}/>
                <AppSearchBar placeholder='Search' name='searchBarDashboard'/>
                <AppAvatar src='https://scontent.fhan5-2.fna.fbcdn.net/v/t1.6435-9/154736541_2996524153926002_2036828814064585917_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=9bcs9tDn568AX9ZrTZN&_nc_ht=scontent.fhan5-2.fna&oh=00_AT-DfIA8PmUDBBv5rT3KlUOBsFLLBZQUWd_TaB1OASptqQ&oe=633F2C3B' size='50px' className='me-5' onClick={()=>handleNavigate('/account')}/>
            </div>
        </>
    );
}

export default HeaderDashboard;