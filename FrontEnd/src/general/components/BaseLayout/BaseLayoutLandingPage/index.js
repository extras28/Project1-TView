import React from 'react';
import PropTypes from 'prop-types';
import HeaderLandingPage from '../../Headers/HeaderLandingPage';
import FooterLandingPage from '../../Footers/FooterLandingPage';
import AppResource from '../../../constants/AppResource';

BaseLayoutLandingPage.propTypes = {
    
};

function BaseLayoutLandingPage(props) {
    return (
        <div>
            {/* Header */}
            <HeaderLandingPage/>

            {/* Content */}
            <div className='flex-grow-1' style={{
                backgroundColor: AppResource.colors.mainBGColor,
            }}>
                {props.children}
            </div>

            {/* Footer */}
            <FooterLandingPage/>
        </div>
    );
}

export default BaseLayoutLandingPage;