import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import BaseTextField from 'general/components/Forms/BaseTextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AppButton from 'general/components/AppButton';
import Utils from 'general/utils/Utils';
import accountApi from 'api/accountApi';
import ToastHelper from 'general/helpers/ToastHelper';

ModalChangePassword.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    handleChange: PropTypes.func,
};

ModalChangePassword.defaultProps = {
    show: false,
    onClose: null,
    handleChange: null,
}

function ModalChangePassword(props) {
    const { show, onClose, handleChange } = props;

    function handleClose(){
        if(onClose){
            onClose();
        }
    };

    const formik = useFormik({
        initialValues: {
            password: '',
            newPassword: '',
            confirmPassword: '',
        },
        onSubmit: async (values) => {
            try {
                const params = {
                    ...values
                };
                delete params.confirmPassword;
                const res = await accountApi.changePassword(params);
                if (res) {
                    ToastHelper.showSuccess('Đổi mật khẩu thành công');
                    handleClose();
                }
            } catch (error) {
                console.log(`Change password error: ${error}`);
            }
        },
        validationSchema: Yup.object({
            password: Yup.string().required('Bạn chưa nhập mật khẩu cũ'),
            newPassword: Yup.string().required('Bạn chưa nhập mật khẩu mới'),
            confirmPassword: Yup.string()
            .required('Bạn chưa nhập lại mật khẩu mới')
            .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp')
        }),
    })


    return (
        <Modal
            show={show}
            centered
            size='md'
            onHide={handleClose}
        >
        <form onSubmit={formik.handleSubmit}>
            <Modal.Header className='d-flex align-items-center justify-content-center'>
                <span className='font-weight-bolder' style={{color: '#4A5677'}}>Đổi mật khẩu</span>
            </Modal.Header>
            <Modal.Body className='bg-light'>
                <div>
                    <BaseTextField
                        label='Mật khẩu cũ'
                        placeholder='Nhập mật khẩu'
                        name='password'
                        type='password'
                        fieldHelper={formik.getFieldHelpers('password')}
                        fieldProps={formik.getFieldProps('password')}
                        fieldMeta={formik.getFieldMeta('password')}
                    />
                    <BaseTextField
                        label='Mật khẩu mới'
                        placeholder='Nhập mật khẩu'
                        name='newPassword'
                        type='password'
                        fieldHelper={formik.getFieldHelpers('newPassword')}
                        fieldProps={formik.getFieldProps('newPassword')}
                        fieldMeta={formik.getFieldMeta('newPassword')}
                    />
                    <BaseTextField
                        label='Nhập lại mật khẩu mới'
                        placeholder='Nhập mật khẩu'
                        name='confirmPassword'
                        type='password'
                        fieldHelper={formik.getFieldHelpers('confirmPassword')}
                        fieldProps={formik.getFieldProps('confirmPassword')}
                        fieldMeta={formik.getFieldMeta('confirmPassword')}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex flex-row align-items-center justify-content-center py-2 flex-nowrap ">
                <AppButton
                className="btn-grey mr-3"
                text="Hủy"
                onClick={handleClose}
                width="47%"
                />
                <AppButton
                className="btn-red ml-3"
                text="Lưu"
                width="47%"
                />
            </Modal.Footer>
        </form>
        </Modal>
    );
}

export default ModalChangePassword;