import React from 'react';
import PropTypes from 'prop-types';
import HeaderLandingPage from '../../../../general/components/Headers/HeaderLandingPage';
import AuthContent from '../../components/AuthContent';
import AppButton from '../../../../general/components/AppButton';
import { Card } from 'react-bootstrap';
import BaseTextField from '../../../../general/components/Forms/BaseTextField';
import BaseCheckBox from '../../../../general/components/Forms/BaseCheckBox';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Utils from '../../../../general/utils/Utils';
import * as Yup from 'yup';
import './style.scss';
import PreferenceKeys from '../../../../general/constants/PreferenceKeys';
import authApi from '../../../../api/authApi';
import ToastHelper from '../../../../general/helpers/ToastHelper'

SignUpScreen.propTypes = {
    
};

const sTag = '[signUpScreen]';

function SignUpScreen(props) {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirm: true,
        },
        onSubmit: async (values) => {
            const params = {
                ...values
            };
            delete params['confirm'];
            console.log(`${sTag} on submit: ${JSON.stringify(params)}`);
            try {
                const res = await authApi.signUp(params);
                if (res) {
                    ToastHelper.showSuccess('Đăng ký thành công');
                    navigate('/sign-in');
                }
            } catch (err) {
                console.log(`${sTag} sign up account error: ${err.message}`);
            }

        },
        validationSchema: Yup.object({
            email: Yup.string().required('Bạn chưa nhập email').email('Email không hợp lệ'),
            password: Yup.string().required('Bạn chưa nhập mật khẩu'),
            confirm: Yup.boolean().test('isTrue', 'Bạn phải đồng ý với điều khoản của chúng tôi để tiếp tục', (value) => value === true)
        }),
    });
    return (
        <div className="SignUpScreen min-vh-100 d-flex flex-column">
            <HeaderLandingPage authScreen={true} />
            <AuthContent 
                rightElement={(
                    <div>
                        <Card>
                        <form onSubmit={formik.handleSubmit}>
                            <Card.Header>
                                <div>
                                    <p 
                                        className='font-weight-bolder text-center m-0' 
                                        style={{fontSize: 20, lineHeight: '32px', color: '#18214D'}}
                                    >
                                        Đăng ký tài khoản TView
                                    </p>
                                    <p 
                                        className='font-size-base font-weight-bolder text-center mt-3 mb-0' 
                                        style={{lineHeight: '17px'}}>
                                        <span 
                                            style={{color: '#4A5677'}}
                                        >
                                            Bạn đã có tài khoản ?
                                        </span>
                                        <span
                                            className='ms-3 cursor-pointer hover-opacity-60'
                                            style={{color: '#E92E4E'}}
                                            onClick={() => {
                                                navigate('/sign-in')
                                            }}
                                        >
                                            ĐĂNG NHẬP
                                        </span>
                                    </p>
                                </div>
                            </Card.Header>

                            <Card.Body className='p-0'>
                                    <div className='bg-light p-5'>
                                        <div>
                                            <BaseTextField
                                                label='Họ tên'
                                                name='username'
                                                type='text'
                                                placeholder='Nhập họ tên'
                                                fieldHelper={formik.getFieldHelpers('username')}
                                                fieldProps={formik.getFieldProps('username')}
                                                fieldMeta={formik.getFieldMeta('username')}
                                            />
                                        </div>
                                        <div className='row'>
                                            <div>
                                                <BaseTextField 
                                                    label='Email (*)'
                                                    name='email'
                                                    type='text'
                                                    placeholder='Nhập email'
                                                    fieldHelper={formik.getFieldHelpers('email')}
                                                    fieldProps={formik.getFieldProps('email')}
                                                    fieldMeta={formik.getFieldMeta('email')}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <BaseTextField 
                                                label='Mật khẩu (*)'
                                                name='password'
                                                type='password'
                                                placeholder='Nhập mật khẩu'
                                                fieldHelper={formik.getFieldHelpers('password')}
                                                fieldProps={formik.getFieldProps('password')}
                                                fieldMeta={formik.getFieldMeta('password')}
                                            />
                                        </div>
                                    </div>
                            </Card.Body>

                            <Card.Footer className='p-0 d-flex flex-column'>
                                <div className='d-flex flex-row align-items-center p-5'>
                                    <BaseCheckBox 
                                        name='checkboxConfirm'
                                        additionClassName='m-0'
                                        additionLabelStyle={{color: "#4A5677", lineHeight: '17px', fontWeight: '500'}}
                                        fieldHelper={formik.getFieldHelpers('confirm')}
                                        fieldProps={formik.getFieldProps('confirm')}
                                        fieldMeta={formik.getFieldMeta('confirm')}
                                        labelElement={(
                                        <span>
                                            <span className='font-size-base font-weight-bolder' style={{color: '#4A5677'}}>Tôi đã hiểu và đồng ý với</span>
                                            <span className='mx-1 font-size-base font-weight-bolder cursor-pointer' style={{color: '#E92E4E'}}>Điều khoản dịch vụ</span>
                                            <span className='font-size-base font-weight-bolder' style={{color: '#4A5677'}}>do TView cung cấp</span>
                                        </span>
                                    )}
                                    />
                                    
                                </div>
                                <div className='px-5 pb-5'>
                                    <AppButton 
                                        className={`btn-green${formik.getFieldProps('confirm').value ?'': '-disabled'} w-100`}
                                        text='Đăng ký'
                                    />
                                </div>
                            </Card.Footer>
                            </form>
                        </Card>
                    </div>
                )}
            />
        </div>
    );
}

export default SignUpScreen;