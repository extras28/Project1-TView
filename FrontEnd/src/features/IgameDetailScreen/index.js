import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeaderDashboard from '../../general/components/Headers/HaederDashboard';
import { Card } from 'react-bootstrap';
import './style.scss';
import AppAvatar from '../../general/components/AppAvatar';
import AppButton from '../../general/components/AppButton';
import BaseTextField from '../../general/components/Forms/BaseTextField';
import AppResource from '../../general/constants/AppResource';

ImageDetailScreen.propTypes = {
    
};

function ImageDetailScreen(props) {

    const [showComment, setShowComment] = useState(false);

    return (
        <div className='ImageDetailScreen'>
            <HeaderDashboard isPin={true}/>
            <div className='my-10 d-flex align-items-center justify-content-center'>
                <div className='d-flex flex-lg-row flex-column ImageDetailScreen_Card bg-white w-lg-50 w-75'>

                    {/* iamge */}
                    <div className='ImageDetailScreen_Image  w-lg-50 w-100 p-0'>
                        <img
                            className=''
                            src='https://i.pinimg.com/564x/4e/75/e1/4e75e14922f26778554b2c8f8eda5365.jpg'
                            alt='imgage'
                        />
                    </div>

                    {/* infor */}
                    <div className='d-flex flex-column w-lg-50 w-100 p-10'>
                        <p className='font-weight-boldest' style={{fontSize: '36px'}}>Blue aesthetic wallpapers by nndtx.</p>
                        <div className='d-flex flex-row align-items-center'>
                            <AppAvatar 
                                src='https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/299961861_1432442603886651_6267294896068632718_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Ngw4ny7rcS0AX8xjB8f&tn=x9_hkC0FKZrBPJAp&_nc_ht=scontent.fhan5-11.fna&oh=00_AT8dqAY2zoteTvUvDPho7qb6GcH-jAFHi5l4vgy4EbSrEw&oe=632B3718'
                                size='48px'
                            />
                            <span className='ml-4 font-weight-boldest cursor-pointer' style={{fontSize: '18px'}}>
                                Nguyễn Thu Trang
                            </span>
                        </div>
                        <p className='mt-8'>Sage aesthetic wallpaper</p>

                        {/* comment */}
                        <div>
                            <div className='d-flex flex-row align-items-center mb-10'>
                                <p className='font-weight-boldest m-0' style={{fontSize: '20px'}}>33 Nhận xét</p>
                                <AppButton 
                                    beforIcon={showComment?(<i className="fas fa-caret-down"></i>):(<i className="fas fa-caret-right"></i>)}
                                    className='btn-white rounded-circle ml-4 p-2'
                                    onClick={()=>{
                                        setShowComment(!showComment)
                                    }}
                                />
                            </div>

                            {showComment 
                            && <div>
                                <div className='d-flex flex-row w-100'>
                                    <AppAvatar 
                                        src='https://i.pinimg.com/564x/3a/bd/98/3abd98a01edbba1ac48de7e505e53bab.jpg'
                                        size='32px'
                                    />
                                    <p className='mt-2 ml-3' style={{width: '90%'}}>
                                    "Nắn nót cho nhau trở nên hoàn hảo, để rồi sự hoàn hảo ấy dành cho người sau.." 
                                    "Nắn nót cho nhau trở nên hoàn hảo, để rồi sự hoàn hảo ấy dành cho người sau.." 
                                    "Nắn nót cho nhau trở nên hoàn hảo, để rồi sự hoàn hảo ấy dành cho người sau.." 
                                    "Nắn nót cho nhau trở nên hoàn hảo, để rồi sự hoàn hảo ấy dành cho người sau.." 
                                    "Nắn nót cho nhau trở nên hoàn hảo, để rồi sự hoàn hảo ấy dành cho người sau.." 
                                    "Nắn nót cho nhau trở nên hoàn hảo, để rồi sự hoàn hảo ấy dành cho người sau.." 
                                    </p>
                                </div>
                                <div className='d-flex flex-row w-100'>
                                    <AppAvatar 
                                        src='https://i.pinimg.com/564x/3a/bd/98/3abd98a01edbba1ac48de7e505e53bab.jpg'
                                        size='32px'
                                    />
                                    <p className='mt-2 ml-3' style={{width: '90%'}}>
                                    "Nắn nót cho nhau trở nên hoàn hảo, để rồi sự hoàn hảo ấy dành cho người sau.." 
                                    "Nắn nót cho nhau trở nên hoàn hảo, để rồi sự hoàn hảo ấy dành cho người sau.." 
                                    "Nắn nót cho nhau trở nên hoàn hảo, để rồi sự hoàn hảo ấy dành cho người sau.." 
                                    "Nắn nót cho nhau trở nên hoàn hảo, để rồi sự hoàn hảo ấy dành cho người sau.." 
                                    "Nắn nót cho nhau trở nên hoàn hảo, để rồi sự hoàn hảo ấy dành cho người sau.." 
                                    "Nắn nót cho nhau trở nên hoàn hảo, để rồi sự hoàn hảo ấy dành cho người sau.." 
                                    </p>
                                </div>
                                <div className='d-flex flex-row align-items-center justify-content-between mt-6'>
                                    <AppAvatar 
                                        src='https://scontent.fhan5-2.fna.fbcdn.net/v/t1.6435-9/154736541_2996524153926002_2036828814064585917_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=tOD9kXOdpIMAX8Wfnhf&_nc_ht=scontent.fhan5-2.fna&oh=00_AT9iFtEaqwK7OQRMiKw2fw5AyWP-assk2Ppg-4AQV-LUvA&oe=634B09BB'
                                        size='48px'
                                    />
                                    <BaseTextField 
                                        className='m-0'
                                    />
                                    <i className="fas fa-paper-plane" style={{color: AppResource.colors.mainBGColor}}></i>
                                </div>
                            </div>}
                        <div/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageDetailScreen;