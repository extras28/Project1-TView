import React from 'react';
import PropTypes from 'prop-types';
import HeaderLandingPage from '../../../../general/components/Headers/HeaderLandingPage';
import AuthContent from '../../../../features/Auth/components/AuthContent';
import './style.scss';
import AppButton from '../../../../general/components/AppButton';
import { Card } from 'react-bootstrap';
import BaseTextField from '../../../../general/components/Forms/BaseTextField';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authApi from '../../../../api/authApi';
import ToastHelper from '../../../../general/helpers/ToastHelper';
import { useNavigate } from 'react-router-dom';
import PreferenceKeys from '../../../../general/constants/PreferenceKeys';


ForgotPasswordScreen.propTypes = {
    
};

function ForgotPasswordScreen(props) {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: async (values) => {
            try{
                const res = await authApi.requestToResetPassword({'email': values.email});
                console.log(res);
                if (res){
                    ToastHelper.showSuccess('Kiểm tra email để lấy mã');
                    navigate('/reset-pass');
                    localStorage.setItem(PreferenceKeys.savedResetPasswordEmail, values.email);
                }
            } catch(error) {
                console.log(error);
                ToastHelper.showError('Gửi mã không thành công');
            }
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Bạn chưa nhập email').email('Email không hợp lệ'),
        }),
    })

    return (
        <div className='ForgotPasswordScreen min-vh-100 d-flex flex-column'>
            <HeaderLandingPage isSignUpPage={true}/>
            <AuthContent 
                rightElement={(
                    <div className=''>
                            <Card>
                                <Card.Body className='bg-white py-40'>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div>
                                            <p className='font-weight-bolder ' style={{fontSize: 30, lineHeight: '32px', color: '#18214D'}}>Quên mật khẩu ?</p>
                                            <p className='text-muted'>
                                                Nhập email của bạn để lấy lại mật khẩu
                                            </p>
                                            <BaseTextField 
                                                name='reset'
                                                className=''
                                                placeholder='Nhập email ...'
                                                fieldHelper={formik.getFieldHelpers('email')}
                                                fieldProps={formik.getFieldProps('email')}
                                                fieldMeta={formik.getFieldMeta('email')}
                                            />
                                            <div className='d-flex flex-row mt-8'>
                                                <AppButton 
                                                    style={{width: '80px'}}
                                                    className='btn-green mr-5'
                                                    text='Gửi mã'
                                                />
                                                <AppButton 
                                                    style={{border: '1px solid #2E8FE9', backgroundColor: '#FFFFFF', color: '#2E8FE9', width: '80px'}}
                                                    className='btn-white'
                                                    text='Hủy'
                                                    onClick={()=>navigate('/sign-in')}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </Card.Body>
                            </Card>
                    </div>
                )}
            />
        </div>
    );
}

export default ForgotPasswordScreen;