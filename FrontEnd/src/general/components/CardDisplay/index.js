import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkGetImageDetail } from 'features/IgameDetailScreen/ImageSlice';

CardDisplay.propTypes = {
    src: PropTypes.string,
    imgId: PropTypes.string,
    onClick: PropTypes.func,
};

CardDisplay.defaultProps = {
    src: null,
    imgId: null,
    onClick: null
    };


    function CardDisplay(props) {
        const {
            src,
            imgId,
            onClick
        } = props;
        const navigate = useNavigate();
        const dispatch = useDispatch();

        function handleViewDetail() {
            if (onClick) {
                onClick();
            }
        }
    return (
        <div 
            className='CardDisplay' 
            onClick={handleViewDetail}
        >
        <img alt='' src={src}
        />
        </div>
    );
}

export default CardDisplay;