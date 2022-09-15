import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

AdminPageContent.propTypes = {
    title: PropTypes.string,
    content: PropTypes.element,
};

AdminPageContent.defaultProps = {
    title: '',
    content: (<div></div>)
};

function AdminPageContent(props) {

    const { title, content } = props;

    return (
        <div className='AdminPageContent d-flex flex-column  bg-light min-vh-100'>
            <div className='bg-light sticky-top py-3'>
                <span className='AdminPageContent_Title m-5'>{title}</span>
            </div>
            <div >
                {content}
            </div>
        </div>
    );
}

export default AdminPageContent;