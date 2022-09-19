import React from 'react';
import PropTypes from 'prop-types';
import HeaderLandingPage from '../../../../general/components/Headers/HeaderLandingPage';
import AuthContent from '../../../../features/Auth/components/AuthContent';
import BaseTextField from '../../../../general/components/Forms/BaseTextField';
import AppButton from '../../../../general/components/AppButton';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import PreferenceKeys from '../../../../general/constants/PreferenceKeys';
import * as Yup from 'yup';
import { Card } from 'react-bootstrap';
import Utils from '../../../../general/utils/Utils';
import ToastHelper from '../../../../general/helpers/ToastHelper';
import authApi from '../../../../api/authApi';

ResetPasswordScreen.propTypes = {
    
};

function ResetPasswordScreen(props) {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            resetPasswordToken: '',
            newPassword: '',
            email: localStorage.getItem(PreferenceKeys.savedResetPasswordEmail),
            confirmNewPassword: '',
        },
        onSubmit: async (values) => {
            const params = {...values}
            delete params['confirmNewPassword'];
            const inputNewPassword = Utils.sha256(params.newPassword);
            params.newPassword = inputNewPassword;
            console.log(params);
            try{
                const res = await authApi.resetPassword(params);
                console.log(res);
                if (res){
                    ToastHelper.showSuccess('Đổi mật khẩu thành công');
                    navigate('/sign-in');
                }
                localStorage.removeItem(PreferenceKeys.savedResetPasswordEmail);
            } catch(error) {
                console.log(error);
                ToastHelper.showError('ĐỔi mật khẩu không thành công');
            }
        },
        validationSchema: Yup.object().shape({
            confirmNewPassword: Yup.string()
            .required('')
            .oneOf([Yup.ref('newPassword'), null], 'Nhập lại mật khẩu không trùng khớp')
          }),
    })

    return (
        <div className='ResetPasswordScreen min-vh-100 d-flex flex-column'>
            <HeaderLandingPage isSignUpPage={true}/>
            <AuthContent 
                rightElement={(
                    <div className=''>
                            <Card>
                                <Card.Header>
                                    <p className='font-weight-bolder text-center m-0' style={{fontSize: 20, lineHeight: '32px', color: '#18214D'}}>Thay đổi mật khẩu</p>
                                </Card.Header>
                                <Card.Body className='bg-white pb-20'>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div>
                                            <BaseTextField 
                                                name='resetToken'
                                                className=''
                                                label='Nhập mã'
                                                placeholder='Nhập mã...'
                                                fieldHelper={formik.getFieldHelpers('resetPasswordToken')}
                                                fieldProps={formik.getFieldProps('resetPasswordToken')}
                                                fieldMeta={formik.getFieldMeta('resetPasswordToken')}
                                            />
                                            <BaseTextField 
                                                name='resetNewPassword'
                                                className='mt-5'
                                                type='password'
                                                label='Mật khẩu mới'
                                                placeholder='Mật khẩu mới..'
                                                fieldHelper={formik.getFieldHelpers('newPassword')}
                                                fieldProps={formik.getFieldProps('newPassword')}
                                                fieldMeta={formik.getFieldMeta('newPassword')}
                                            />
                                            <BaseTextField 
                                                name='resetConfirmNewPassword'
                                                className='mt-5'
                                                type='password'
                                                label='Nhập lại mật khẩu mới'
                                                placeholder='Mật khẩu mới'
                                                fieldHelper={formik.getFieldHelpers('confirmNewPassword')}
                                                fieldProps={formik.getFieldProps('confirmNewPassword')}
                                                fieldMeta={formik.getFieldMeta('confirmNewPassword')}
                                            />
                                            <div className='d-flex flex-row mt-8'>
                                                <AppButton 
                                                    style={{width: '80px'}}
                                                    className='btn-red mr-5'
                                                    text='Lưu'
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

export default ResetPasswordScreen;