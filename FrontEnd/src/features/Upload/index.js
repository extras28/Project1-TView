import React from 'react';
import PropTypes from 'prop-types';
import HeaderDashboard from '../../general/components/Headers/HaederDashboard';
import BaseTextField from '../../general/components/Forms/BaseTextField';
import AppAvatar from '../../general/components/AppAvatar';
import AppButton from '../../general/components/AppButton';

Upload.propTypes = {
    
};

function Upload(props) {
    return (
        <div>
            <HeaderDashboard isPin={true}/>
            <div className='my-10 d-flex align-items-center justify-content-center'>
                <div className='d-flex flex-lg-row flex-column bg-white w-lg-50 w-75 rounded-5'>

                    {/* iamge input */}
                    <div className='w-lg-50 w-100 p-0'>
                        <div className='bg-light m-10 rounded-2 p-4 h-600px cursor-pointer'>
                            <div className='bg-transparent h-100 d-flex flex-column align-items-center justify-content-center' style={{border: '3px dashed #b5b2b2'}}>
                                <div className='rounded-circle d-flex align-items-center justify-content-center' style={{backgroundColor: '#565656', height: '40px', width: '40px'}}>
                                    <i className="fas fa-arrow-up"></i>
                                </div>
                                <p className='font-weight-bolder mt-5 text-muted' >Nhấp vào để tải lên</p>
                            </div>
                        </div>
                    </div>

                    {/* infor */}
                    <div className='d-flex flex-column justify-content-between w-lg-50 w-100 p-10'>
                        <div>
                            <div className='d-flex flex-row align-items-center my-10'>
                                <AppAvatar 
                                    src=''
                                    size='60px'
                                />
                                <span className='ml-4 font-weight-boldest cursor-pointer' style={{fontSize: '18px'}}>
                                    Nguyễn Anh Dũng
                                </span>
                            </div>
                            <BaseTextField
                                label='Tiêu đề'
                            />
                            <BaseTextField
                                label='Mô tả'
                            />
                        </div>
                        <div className='d-flex justify-content-end'>
                            <AppButton 
                                className='btn-green'
                                width='60px'
                                text='Lưu'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;