import React from 'react';
import PropTypes from 'prop-types';

ImageLayout.propTypes = {
    
};

const styles = {
    pin_container: {
        margin: 0,
        padding: 0,
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 250px)',
        gridAutoRows: '10px',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    }
}

function ImageLayout(props) {
    return (
        <div style={styles.pin_container}>
            {props.children}
        </div>
    );
}

export default ImageLayout;