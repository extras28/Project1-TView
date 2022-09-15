import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import AppResource from '../../constants/AppResource';

AppAvatar.propTypes = {
    src: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

AppAvatar.defaultProps = {
    src: null,
    size: null,
    className: null,
    onClick: null,
};

function AppAvatar(props) {
    const { src, size, className, onClick} = props;

    function clicked(){
        if(onClick) {
            onClick();
        }
    }

    return (
        <div 
        className= {`AppAvatar ${className}`}
        style={{
            width: size,
            height: size,
        }}
        onClick={()=>{clicked()}}>
            <img src={src || AppResource.images.defaultAvatar} alt='avatar'/>
        </div>
    );
}

export default AppAvatar;