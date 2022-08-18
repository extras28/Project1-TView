import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

DefaultLayout.propTypes = {
    
};

function DefaultLayout({ children }) {
    return (
        <div>
            <Header/>
                <div>
                    <div className="content">
                        {children}
                    </div>
                </div>
        </div>
    );
}

export default DefaultLayout;