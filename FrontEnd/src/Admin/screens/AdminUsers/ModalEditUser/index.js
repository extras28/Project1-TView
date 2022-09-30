import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import BaseDropdownSelect from 'general/components/Forms/BaseDropdownSelect';
import BaseTextField from 'general/components/Forms/BaseTextField';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Utils from 'general/utils/Utils';
import { unwrapResult } from '@reduxjs/toolkit';
import ToastHelper from 'general/helpers/ToastHelper';
import * as Yup from 'yup';
import AppResource from 'general/constants/AppResource';
import AppButton from 'general/components/AppButton';
import adminApi from 'api/adminApi';
import { thunkEditAccount } from 'Admin/adminSlice';
import AppLoader from 'general/components/AppLoader';

ModalEditUser.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    userId: PropTypes.string,
};

ModalEditUser.defaultProps = {
    show: false,
    onClose: null,
    userId: ''
}

const genders = [
    { value: 'MALE', text: 'Nam' },
    { value: 'FEMALE', text: 'Nữ' },
    { value: 'UNKNOWN', text: 'Không xác định' },
]

const fields = [
    { label: 'Họ tên', field: 'username' },
    { label: 'Email', field: 'email' },
    { label: 'Số điện thoại', field: 'phone' },
    { label: 'Địa chỉ', field: 'address' },
    { label: 'Giới tính', field: 'gender' },
    { label: 'Ngày sinh', field: 'dob' },
]

function ModalEditUser(props) {
    const {show, onClose, userId} = props;
    function handleClose(){
        if(onClose){
            onClose();
        }
    }
    
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [editedAvatar, setEditedAvatar] = useState();
    const [imageToBase64, setImageToBase64] = useState('');
    const accountInforAvatar = useRef();

    const currentAccount = useSelector(state => state?.admin?.account);
    const  loading = useSelector(state => state?.admin?.editingProfile);



    const formik = useFormik({
        initialValues: {
            username: '',
            phone: '',
            address: '',
            dob: '',
            gender: 'MALE',
        },
        onSubmit: (values) => {
            const params = { ...values };
            params.dob = Utils.formatAddDateTime(values.dob);
            params.userId = userId
            handleDeleteNullField(params);
            try {
                dispatch(thunkEditAccount(params));
                ToastHelper.showSuccess('Thay đổi thông tin tài khoản thành công');
                setIsEditing(false);
            } catch (err) {
                ToastHelper.showError('Thay đổi thông tin thất bại')
            }
        },
        validationSchema: Yup.object({
            phone: Yup.string().trim().matches(/(\+84|03|05|07|08|09)+([0-9]{8,15})\b/, 'số điện thoại không hợp lệ'),  
        })
    });

    function handleDeleteNullField(params) {
        if (params.dob === null || params.dob === undefined || params.dob === '' || params.dob === 'Invalid date') {
            delete params.dob;
        };
        if (params.fullname === null || params.fullname === undefined || params.fullname === '') {
            delete params.fullname;
        };
        if (params.phone === null || params.phone === undefined || params.phone === '') {
            delete params.phone;
        };
        if (params.address === null || params.address === undefined || params.address === '') {
            delete params.address;
        };
        if (params.personalIdentificationNumber === null || params.personalIdentificationNumber === undefined || params.personalIdentificationNumber === '') {
            delete params.personalIdentificationNumber;
        };
        if (params.gender === null || params.gender === undefined || params.gender === '') {
            delete params.gender;
        };
        return params;
    }

    function handleEditInfor() {
        if (editedAvatar) {
            dispatch(thunkEditAccount({
                userId: userId,
                avatar: imageToBase64,
                username: currentAccount.username,
                phone: currentAccount.phone,
                address: currentAccount.address,
                dob: currentAccount.dob,
                gender: currentAccount.gender,
            }));
            setEditedAvatar();
            setImageToBase64('');
        } else{
            formik.handleSubmit();
        }
    }


    // change avatar avatar
    useEffect(() => {
        return () => {
            editedAvatar && URL.revokeObjectURL(editedAvatar.preview)
        }
    }, [editedAvatar]);

    function handleChangeAvatarInput(e) {
        const file = e.target.files[0];

        if (file) {
            file.preview = URL.createObjectURL(file);
            setEditedAvatar(file);
            setIsEditing(true);
            e.target.value = null;
            getBase64(file);
        }
    };

    function getBase64(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageToBase64(reader.result);
        };
    }

    function handleChangeAvatarClick() {
        accountInforAvatar.current.click();
    };



    useEffect(() => {
        fields.map((item, index) => {
            formik.getFieldHelpers(`${item.field}`).setValue(currentAccount?.[`${item.field}`]);
        })

    }, [currentAccount]);
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            size='xl'
        >
            {loading
            ? <AppLoader 
                customHeight='100%'
            />
            :<div className='d-flex flex-column align-items-end'>
                <div>
                    <AppButton 
                        beforIcon={(<i class="fas fa-times text-dark"></i>)}
                        className='btn-grey m-4'
                        onClick={handleClose}
                    />
                </div>
             <div>      
                            {/* thong tin nguoi dung */}
                            <div className='bg-white border m-3 p-5'>
                                <div className='row d-flex align-items-start justify-content-center'>
    
                                    {/* avatar */}
                                    <div className='col-md-4 col-lg-2 col-8 mb-10 mb-md-0'>
                                        <div className='AccountInforScreen_Avatar border p-3 rounded '>
                                            {editedAvatar
                                                ? <img
                                                    className='rounded border'
                                                    src={editedAvatar.preview}
                                                    alt="preview avatar"
                                                />
                                                : <img
                                                    className='rounded border'
                                                    src={Utils.getFullUrl(currentAccount?.avatar) || AppResource.images.defaultAvatar}
                                                    onError={
                                                        (e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = AppResource.images.imgDefaultAvatar
                                                        }
                                                    }
                                                    alt="avatar"
                                                />}
                                            <input
                                                type='file'
                                                ref={accountInforAvatar}
                                                onChange={handleChangeAvatarInput}
                                                style={{ display: 'none' }}
                                            />
                                            <button
                                                className='AccountInforScreen_Avatar_Button'
                                                onClick={handleChangeAvatarClick}
                                            >
                                                <i className="fas fa-pen" style={{ color: '#4A5677' }}></i>
                                            </button>
                                        </div>
                                    </div>
    
                                    {/* information */}
                                    <div className='col-md-8 col-lg-10 col-12 d-flex flex-column justify-content-between'>
                                        <div className='w-100 d-flex flex-row justify-content-between border-bottom pb-2'>
                                            <span className='font-weight-bolder' style={{ fontSize: '20px', color: '#4A5677' }}>Thông Tin Người Dùng</span>
                                            <div className='d-flex flex-column flex-sm-row'>
                                                {(isEditing || editedAvatar)
                                                ? <>
                                                    <AppButton 
                                                        text='Hủy'
                                                        className={`btn-white border h-10px h-sm-100 mr-sm-3 mb-3 mb-sm-0`}
                                                        beforIcon={(<i className="fas fa-times mr-2" style={{color: '#4A5677'}}></i>)}
                                                        onClick={()=>{
                                                            setIsEditing(false);
                                                            setEditedAvatar();
                                                            }}
                                                    />
                                                    <AppButton 
                                                        text='Lưu'
                                                        className='btn-green h-10px h-sm-100'
                                                        beforIcon={(<i className='fas fa-check mr-2' style={{color:'#FFFFFF'}}></i>)}
                                                        onClick = {
                                                            () => {
                                                                handleEditInfor();
                                                            }
                                                        }
                                                        />
                                                    </>
                                                    : <AppButton
                                                        text='Chỉnh sửa'
                                                        className='btn-white border h-100 h-sm-100'
                                                        beforIcon={(<i className='fas fa-user-edit mr-2' style={{color:'#4A5677'}}></i>)}
                                                        onClick = {
                                                            () => {
                                                                setIsEditing(true);
                                                            }
                                                        }
                                                    />
                                                }
                                            </div>
                                        </div>
    
                                        {/* form */}
                                        <form className='row mt-5'>
                                            {
                                                fields.map(
                                                    (item, index) => {
                                                        return <div key={index} className='col-lg-3 col-md-6 col-12'>
                                                            {
                                                                (!isEditing || index === 1)
                                                                    ? <div className='mb-7'>
                                                                        <span className='text-muted'>{item.label}</span>
                                                                        <div className='rounded w-100 mt-2 d-flex flex-column justify-content-center' style={{ backgroundColor: '#F2F3F7', height: '40px' }}>
                                                                            <span className='ml-4 font-weight-bold' style={{ color: '#4A5677' }}>
                                                                                {index === 4
                                                                                    ? genders.find(item => item.value === currentAccount?.['gender'])?.text
                                                                                    : (index === 5
                                                                                        ? (currentAccount?.['dob'] === null
                                                                                            ? 'Nhập ngày sinh...'
                                                                                            :Utils.formatDateTime(currentAccount?.['dob'], 'DD/MM/YYYY'))
                                                                                        : currentAccount?.[`${item.field}`]
                                                                                    )}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    : (index === 4
                                                                        ? <BaseDropdownSelect
                                                                            column={true}
                                                                            label='Giới tính'
                                                                            name='infor'
                                                                            options={genders}
                                                                            fieldHelpers={formik.getFieldHelpers(`${item.field}`)}
                                                                            fieldProps={formik.getFieldProps(`${item.field}`)}
                                                                            fieldMeta={formik.getFieldMeta(`${item.field}`)}
                                                                            additionContainerSelectClass='w-100 mt-2'
                                                                        />
                                                                        : <BaseTextField
                                                                            name='infor'
                                                                            type={index === 5 ? 'date' : 'text'}
                                                                            label={item.label}
                                                                            fieldProps={formik.getFieldProps(`${item.field}`)}
                                                                            fieldHelpers={formik.getFieldHelpers(`${item.field}`)}
                                                                            fieldMeta={formik.getFieldMeta(`${item.field}`)}
                                                                        />)
                                                            }
                                                        </div>
                                                    })
                                            }
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>}
        </Modal>
    );
}

export default ModalEditUser;