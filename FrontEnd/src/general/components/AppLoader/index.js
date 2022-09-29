import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

AppLoader.propTypes = {
    customHeight: PropTypes.string,
};

AppLoader.defaultProps = {
    customHeight: '100vh'
}

function AppLoader(props) {
    const { customHeight } = props;
    return (
        <div className='d-flex flex-column align-items-center justify-content-center' style={{
            backgroundColor: 'transparent',
            width: '100%',
            height: customHeight,
        }}>
            <div className="lds-dual-ring"></div>
        </div>
    );
}

export default AppLoader;