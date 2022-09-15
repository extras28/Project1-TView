import React from 'react';
import PropTypes from 'prop-types';
import HeaderLandingPage from '../../../../general/components/Headers/HeaderLandingPage';
import PreferenceKeys from '../../../../general/constants/PreferenceKeys';
import Utils from '../../../../general/utils/Utils';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card } from 'react-bootstrap';
import AuthContent from '../../components/AuthContent';
import BaseTextField from '../../../../general/components/Forms/BaseTextField';
import BaseCheckBox from '../../../../general/components/Forms/BaseCheckBox';
import AppButton from '../../../../general/components/AppButton'
import './style.scss';
import { unwrapResult } from '@reduxjs/toolkit';
import { thunkSignIn } from '../../../../app/authSlice';
import UserHelper from '../../../../general/helpers/UserHelper';
import ToastHelper from '../../../../general/helpers/ToastHelper';
import { useDispatch } from 'react-redux';

SignInScreen.propTypes = {
    
};

const sTag = '[SignInScreen]'

function SignInScreen(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: localStorage.getItem(PreferenceKeys.savedEmail) ?? '',
            password: localStorage.getItem(PreferenceKeys.savedPassword) ?? '',
            remember: true
        },
        onSubmit: async (values) => {
            const params = { ...values };
            delete params['remember'];
            // let inputPassword = params.password;
            // params.password = Utils.sha256(inputPassword);
            console.log(`${sTag} on submit: ${JSON.stringify(params)}`);
            try {
                const res = unwrapResult(await dispatch(thunkSignIn(params)));
                if (res) {
                    const displayName = UserHelper.getDisplayName(res.account);
                    ToastHelper.showSuccess(`Xin chào, ${displayName}`);
                    navigate('/dashboard');
                }
            } catch (error) {
                console.log(`${sTag} loggin error: ${error.message}`);
                ToastHelper.showError('Đăng nhập không thành công');
            }
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Bạn chưa nhập email').email('Email không hợp lệ'),
            password: Yup.string().required('Bạn chưa nhập mật khẩu'),
        }),
    })

    function handleNavigate(url) {
        if(url){
            navigate(url);
        }
    }
    return (
        <div className='SignInScreen min-vh-100 d-flex flex-column'>
            <HeaderLandingPage authScreen={true}/>
            <AuthContent 
                rightElement={(
                    <div className='pb-20'>
                            <form onSubmit={formik.handleSubmit}>
                        <Card>
                            <Card.Header>
                                <p className='font-weight-bolder text-center m-0' style={{fontSize: 20, lineHeight: '32px', color: '#18214D'}}>Đăng Nhập TView</p>
                            </Card.Header>

                            <Card.Body className='bg-light py-0'>
                                <div className='mt-5'>
                                        <BaseTextField
                                            name='email'
                                            placeholder='Nhập email...'
                                            label='Email'
                                            fieldHelper={formik.getFieldHelpers('email')}
                                            fieldProps={formik.getFieldProps('email')}
                                            fieldMeta={formik.getFieldMeta('email')}
                                        />

                                        <BaseTextField 
                                            name='password'
                                            placeholder='Nhập mật khẩu...'
                                            label='Mật khẩu'
                                            type='password'
                                            fieldHelper={formik.getFieldHelpers('password')}
                                            fieldProps={formik.getFieldProps('password')}
                                            fieldMeta={formik.getFieldMeta('password')}
                                        />

                                </div>
                                <div className='d-flex flex-row justify-content-between'>
                                    <span 
                                        className='font-size-base font-weight-bolder cursor-pointer' 
                                        style={{color: '#93CD54'}}
                                        onClick={()=>handleNavigate('/forgot-pass')}
                                    >
                                        Quên mật khẩu
                                    </span>
                                    <BaseCheckBox 
                                        name='checkboxRemember'
                                        label='Ghi nhớ tài khoản'
                                        additionLabelStyle={{color: "#4A5677", lineHeight: '17px', fontWeight: '500'}}
                                        fieldHelper={formik.getFieldHelpers('remember')}
                                        fieldProps={formik.getFieldProps('remember')}
                                        fieldMeta={formik.getFieldMeta('remember')}
                                    />
                                </div>
                            </Card.Body>

                            <Card.Footer>
                                <AppButton 
                                    type='submit'
                                    className='btn-green'
                                    text='Đăng nhập'
                                    width='100%'
                                />

                                <p className='font-size-base font-weight-bolder text-center border-top mt-5 pt-5' style={{color: '#4A5677', lineHeight: '17px'}}>Bạn chưa có tài khoản TView ?</p>

                                <AppButton 
                                    style={{border: '1px solid #2E8FE9', backgroundColor: '#FFFFFF', color: '#2E8FE9'}}
                                    className='btn-white'
                                    text='Đăng ký ngay'
                                    width='100%'
                                    onClick={()=>handleNavigate('/sign-up')}
                                    type='submit'
                                />
                            </Card.Footer>
                        </Card>
                            </form>
                    </div>
                )}
            />
        </div>
    );
}

export default SignInScreen;