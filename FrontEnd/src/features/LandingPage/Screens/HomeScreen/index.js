import React from 'react';
import PropTypes from 'prop-types';
import BaseLayoutLandingPage from '../../../../general/components/BaseLayout/BaseLayoutLandingPage';
import './style.scss'


HomeScreen.propTypes = {
    
};

function HomeScreen(props) {
    return (
            <div className='min-vh-100'>
                <BaseLayoutLandingPage>
                    <div className='min-vh-100 HomeScreen'>
                    </div>
                </BaseLayoutLandingPage>
            </div>
    );
}

export default HomeScreen;