import React, { useEffect, useState } from 'react';
import PropTypes, { func } from 'prop-types';
import HeaderDashboard from '../../general/components/Headers/HaederDashboard';
import { Button, ButtonGroup, Card, Dropdown } from 'react-bootstrap';
import './style.scss';
import AppAvatar from '../../general/components/AppAvatar';
import AppButton from '../../general/components/AppButton';
import BaseTextField from '../../general/components/Forms/BaseTextField';
import AppResource from '../../general/constants/AppResource';
import imageApi from 'api/imageApi';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import g_showPrivateImageDetais from 'general/utils/Globals';

ImageDetailScreen.propTypes = {

};



function ImageDetailScreen(props) {

    const imageDetails = useSelector(state => state?.imageDetail?.image);
    
    return (
        <div className='ImageDetailScreen'>
            <HeaderDashboard isPin={true}/>
            <div className='my-10 d-flex align-items-center justify-content-center'>
                <div className='d-flex flex-lg-row flex-column ImageDetailScreen_Card bg-white w-lg-50 w-75'>

                    {/* iamge */}
                    <div className='ImageDetailScreen_Image  w-lg-50 w-100 p-0'>
                        <img
                            className=''
                            src={imageDetails?.src}
                            alt='imgage'
                        />
                    </div>

                    {/* infor */}
                    <div className='d-flex flex-column w-lg-50 w-100 p-10'>
                        <p className='font-weight-boldest' style={{fontSize: '36px'}}>{imageDetails?.title}</p>
                        <div className='d-flex flex-row align-items-center'>
                            <AppAvatar 
                                src={imageDetails?.avatar}
                                size='48px'
                            />
                            <span className='ml-4 font-weight-boldest cursor-pointer' style={{fontSize: '18px'}}>
                                {imageDetails?.username}
                            </span>
                        </div>
                        <p className='mt-8'>{imageDetails?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageDetailScreen;