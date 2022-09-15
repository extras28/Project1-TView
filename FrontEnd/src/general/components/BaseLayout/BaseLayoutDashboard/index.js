import React from 'react';
import PropTypes from 'prop-types';
import HeaderDashboard from '../../Headers/HaederDashboard';

BaseLayoutDashboard.propTypes = {
    
};

function BaseLayoutDashboard(props) {
    return (
        <div>
            {/* Header */}
            <HeaderDashboard/>

            {/* Content */}
            <div className='flex-grow-1'>
                {props.children}
            </div>
        </div>
    );
}

export default BaseLayoutDashboard;