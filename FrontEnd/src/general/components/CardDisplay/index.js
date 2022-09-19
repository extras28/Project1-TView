import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import { useNavigate } from 'react-router-dom';

CardDisplay.propTypes = {
    src: PropTypes.string,
    imgId: PropTypes.string,
};

CardDisplay.defaultProps = {
    src: null,
    imgId: null,
};


function CardDisplay(props) {
    const { src, imgId } = props;
    const navigate = useNavigate();

    function handleViewDetail(){
        navigate(`/pin/${imgId}`)
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