import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

AppButton.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    fontSize: PropTypes.string,
    fontWeight: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    onClick: PropTypes.func,
    beforIcon: PropTypes.element,
    style: PropTypes.object,
    type: PropTypes.string,
};

AppButton.defaultProps = {
    className: null,
    text: null,
    fontSize: null,
    fontWeight: null,
    width: null,
    height: null,
    onClick: null,
    beforIcon: (<></>),
    style: {},
    type: '',
}

function AppButton(props) {

    const {
        className,
        text,
        fontSize,
        fontWeight,
        width,
        height,
        onClick,
        beforIcon,
        style,
        type,
    } = props;

    function clicked(){
        if(onClick){
            onClick();
        }
    };


    return (
        <button 
            className={`d-flex flex-row align-items-center justify-content-center ${className}`}
            style={{
                width: width,
                height: height,
                fontSize: fontSize || '1rem',
                fontWeight: fontWeight || '600',
                ...style,
            }}
            onClick={clicked}
            type={type}
        >
            {/* icon */}
            {beforIcon}

            {/* text */}
            <span className=''>{text}</span>

        </button>
    );
}

export default AppButton;