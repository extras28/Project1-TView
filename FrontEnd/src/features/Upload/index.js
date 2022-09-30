import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import HeaderDashboard from '../../general/components/Headers/HaederDashboard';
import BaseTextField from '../../general/components/Forms/BaseTextField';
import AppAvatar from '../../general/components/AppAvatar';
import AppButton from '../../general/components/AppButton';
import './style.scss';
import { useSelector } from 'react-redux';
import imageApi from '../../api/imageApi';
import ToastHelper from '../../general/helpers/ToastHelper';
import { useNavigate } from 'react-router-dom';
import AppLoader from 'general/components/AppLoader';

Upload.propTypes = {
    
};

const sTag = '[uploadScreen]';

function Upload(props) {
    const navigate = useNavigate();
    const [previewSource, setPreviewSource] = useState();
    const [imageToBase64, setImageToBase64] = useState('');
    const imageInput = useRef();
    const [loading, setLoading] = useState(false);

    const currentAccount = useSelector(state => state?.auth?.currentAccount);

    function handleUploadImageClicked(){
        imageInput.current.click();
    };


    function handleChangeFile(e){
        const file = e.target.files[0];
        if (file) {
            file.preview = URL.createObjectURL(file);
            setPreviewSource(file);
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

    useEffect(() => {
        return () => {
            previewSource && URL.revokeObjectURL(previewSource.preview)
        }
    }, [previewSource]);


    const formik = useFormik({
        initialValues: {
            src: '',
            title: '',
            description: '',
        },
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const params = {
                    ...values
                };
                params.src = imageToBase64;
                const res = await imageApi.uploadImage(params);
                setPreviewSource();
                if(res.result==='success'){
                    setLoading(false);
                    ToastHelper.showSuccess('Ảnh của bạn đã được chia sẻ');
                } else{
                    setLoading(false)
                    ToastHelper.showError('Đăng ảnh không thành công')
                }
                formik.getFieldHelpers('title').setValue('');
                formik.getFieldHelpers('description').setValue('');
            } catch (error){
                console.log(`${sTag} upload image error: ${error.message}`);
            }
        }
    })


    return (
        <div>
            <HeaderDashboard isPin={true}/>
            <form onSubmit={formik.handleSubmit}>
            <div className='Upload my-10 d-flex align-items-center justify-content-center'>
                {loading
                ? <AppLoader 
                    customHeight='100%'
                />
                :<div className='d-flex flex-lg-row flex-column bg-white w-lg-50 w-75 rounded-5'>

                    {/* iamge input */}
                        
                        <div className='w-lg-50 w-100 p-0'>
                            <div className={`m-10 rounded-2 p-4 ${!previewSource && "bg-light h-600px cursor-pointer"}`}>   
                                {previewSource
                                ?<div className='Upload_Image'>
                                    <img 
                                        src={previewSource.preview}
                                        alt="chosen"
                                    />
                                    <button className='Upload_Image_Button rounded-circle' onClick={()=>setPreviewSource()}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                                :<div className='bg-transparent h-100 d-flex flex-column align-items-center justify-content-center' style={{border: '3px dashed #b5b2b2'}} onClick={handleUploadImageClicked}>
                                    <div className='rounded-circle d-flex align-items-center justify-content-center' style={{backgroundColor: '#565656', height: '40px', width: '40px'}}>
                                        <i className="fas fa-arrow-up"></i>
                                    </div>
                                    <p className='font-weight-bolder mt-5 text-muted' >Nhấp vào để tải lên</p>
                                </div>}
                            </div>
                        </div>
                        <input 
                            ref={imageInput}
                            type='file' 
                            style={{display: 'none'}}
                            onChange={handleChangeFile}
                        />

                    {/* infor */}
                    <div className='d-flex flex-column justify-content-between w-lg-50 w-100 p-10'>
                        <div>
                            <div className='d-flex flex-row align-items-center my-10'>
                                <AppAvatar 
                                    src={currentAccount?.avatar}
                                    size='60px'
                                />
                                <span className='ml-4 font-weight-boldest cursor-pointer' style={{fontSize: '18px'}}>
                                    {currentAccount?.username}
                                </span>
                            </div>
                            <BaseTextField
                                label = 'Tiêu đề'
                                name = 'title'
                                className = ''
                                placeholder = 'Nhập tiêu đề...'
                                fieldHelper = {
                                    formik.getFieldHelpers('title')
                                }
                                fieldProps = {
                                    formik.getFieldProps('title')
                                }
                                fieldMeta = {
                                    formik.getFieldMeta('title')
                                }
                            />
                            <BaseTextField
                                label = 'Mô tả'
                                name = 'description'
                                className = ''
                                placeholder = 'Thêm mô tả...'
                                fieldHelper = {
                                    formik.getFieldHelpers('description')
                                }
                                fieldProps = {
                                    formik.getFieldProps('description')
                                }
                                fieldMeta = {
                                    formik.getFieldMeta('description')
                                }
                            />
                        </div>
                        <div className='d-flex justify-content-end'>
                            <AppButton 
                                className='btn-green mt-10'
                                width='60px'
                                text='Lưu'
                            />
                        </div>
                    </div>
                </div>}
            </div>
            </form>
        </div>
    );
}

export default Upload;