import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './style.scss';
import BaseTextField from 'general/components/Forms/BaseTextField';
import { useFormik } from 'formik';
import AppButton from 'general/components/AppButton';
import { useState } from 'react';
import AppLoader from 'general/components/AppLoader';
import { useEffect } from 'react';

ModalEditImage.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
};

ModalEditImage.defaultProps = {
    show: false,
    onClose: null,
}

function ModalEditImage(props) {
    const {show, onClose} = props;
    const [edit, setEdit] = useState();

    const formik = useFormik({
        initialValues:{
            title: '',
            description: '',
        },
        onSubmit:{

        },
        // validationSchema:{

        // }
    })

    function handleClose(){
        if(onClose){
            onClose();
        }
    }
    const imageDetails = useSelector(state => state?.imageDetail?.image);
    const loading = useSelector(state => state?.imageDetail?.isGettingImage);

    useEffect(()=>{
        formik.getFieldHelpers('title').setValue(imageDetails.title);
        formik.getFieldHelpers('description').setValue(imageDetails.description);
    },[imageDetails])

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            size='lg'
            
        >

            {loading
            ? <AppLoader 
                customHeight='100%'
            />
            :<div className='ModalEditImage d-flex flex-lg-row flex-column'>
                {/* iamge */}
                <div className='ModalEditImage_Image w-lg-50 w-100 p-0'>
                    <img
                        className='rounded-left'    
                        src={imageDetails.src}
                        alt='imgage'
                    />
                </div>
    
                {/* input */}
                <div className='w-lg-50 w-100 p-0 d-flex flex-column justify-content-start'>
                    <div className='w-100 d-flex flex-row justify-content-between border-bottom pb-2 align-items-center'>
                        <span className='font-weight-bolder p-4' style={{ fontSize: '20px', color: '#4A5677' }}>Thông tin ảnh</span>
                        <div>
                            <AppButton
                                className='btn-white border m-4'
                                beforIcon={(<i className='fas fa-times' style={{color:'#4A5677'}}></i>)}
                                onClick = {
                                    () => {
                                        handleClose(); 
                                    }
                                }
                            />
                        </div>
                    </div>
                    {!edit
                    ?<div className='mx-10 py-10'>
                        <p className='font-weight-boldest mb-10' style={{fontSize: '24px'}}>
                            {imageDetails.title}
                        </p>
                        <p>
                            {imageDetails.description}
                        </p>
                    </div>
                    :<div className='mx-10 py-10'>
                        <BaseTextField 
                            name='title'
                            label='Tiêu đề'
                            fieldProps={formik.getFieldProps('title')}
                            fieldHelpers={formik.getFieldHelpers('title')}
                            fieldMeta={formik.getFieldMeta('title')}
                        />
                        <BaseTextField 
                            name='description'
                            label='Mô tả'
                            fieldProps={formik.getFieldProps('description')}
                            fieldHelpers={formik.getFieldHelpers('description')}
                            fieldMeta={formik.getFieldMeta('description')}
                        />
                    </div>}
                    <>
                        {edit
                        ?<div className='d-flex flex-row justify-content-end mr-4 mb-4'>
                            <AppButton 
                                text='Hủy'
                                className='btn-grey mr-4'
                                onClick={()=>setEdit(false)}
                            />
                            <AppButton
                                text='Lưu'
                                className='btn-green'
                            />
                        </div>
                        :<div className='d-flex flex-row justify-content-end mr-4 mb-4'>
                            <AppButton
                                text='Chỉnh sửa'
                                className='btn-white border h-100 h-sm-100'
                                beforIcon={(<i className='fas fa-edit mr-2' style={{color:'#4A5677'}}></i>)}
                                onClick = {
                                    () => {
                                        setEdit(true);
                                    }
                                }
                            />
                        </div>}
                    </>
                </div>
            </div>}
        </Modal>
    );
}

export default ModalEditImage;