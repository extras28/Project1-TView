import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'

CardDisplay.propTypes = {
    size: PropTypes.string,
    src: PropTypes.string,
};

CardDisplay.defaultProps = {
    size: null,
    src: null,
};
const styles = {
    small: {
        gridRowEnd: 'span 26'
    },
    medium: {
        gridRowEnd: 'span 33'
    },
    large: {
        gridRowEnd: 'span 45'
    }
}

function CardDisplay(props) {
    const { size, src } = props;
    return (
        <div className='CardDisplay' style={{
            ...styles[size]
        }}>
        <img alt='' src={src}
        />
        </div>
    );
}

export default CardDisplay;