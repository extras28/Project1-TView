import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkGetImageDetail } from 'features/IgameDetailScreen/ImageSlice';
import { Dropdown } from 'react-bootstrap';
import AppResource from 'general/constants/AppResource';
import AppButton from '../AppButton';
import AppDeleteModal from '../AppModalDelete';
import { useState } from 'react';
import ModalEditImage from 'features/Account/screens/PersonalPage/ModalEditImage';

CardDisplay.propTypes = {
    src: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    owner: PropTypes.bool,
    imgId: PropTypes.string,
};

CardDisplay.defaultProps = {
    src: null,
    onClick: null,
    className: '',
    owner: false,
    imgId: ''
};


function CardDisplay(props) {
    const {
        src,
        onClick,
        className,
        owner,
        imgId
    } = props;

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const dispatch = useDispatch();

    function handleViewDetail() {
        if (onClick) {
            onClick();
        }
    }

    function handleDelete(){
        console.log('deleted');
    }
return (
    <div 
        className={`CardDisplay ${className}`} 
    >
        {owner && <div className='CardDisplay_Button'>
            <AppButton
                beforIcon={(<i className="fas fa-eye"></i>)}
                className='btn-green mr-2 rounded-circle'
                width='25px'
                height='25px'
                onClick = {
                    () => {
                        setShowEditModal(true);
                        dispatch(thunkGetImageDetail(imgId));
                    }
                }
            />

            <AppButton 
                beforIcon={(<i className="fas fa-trash"></i>)}
                className='btn-red rounded-circle'
                width='25px'
                height='25px'
                onClick={()=>setShowDeleteModal(true)}
            />
        </div>}
        
        <img alt='' src={src}
            onClick={handleViewDetail}
        />
        <AppDeleteModal 
            show={showDeleteModal}
            onClose={()=>setShowDeleteModal(false)}
            deleteTitle='Xóa ảnh'
            deleteText='Bạn muốn xóa ảnh này ?'
            deleteItem={handleDelete}
        />
        <ModalEditImage 
            show={showEditModal}
            onClose={()=>setShowEditModal(false)}
        />
    </div>
);
}

export default CardDisplay;