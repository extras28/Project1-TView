import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

AccountContent.propTypes = {
    title: PropTypes.string,
    cotent: PropTypes.element,
};

AccountContent.defaultProps = {
    title: '',
    content: (<div></div>),
}

function AccountContent(props) {

    const navigate = useNavigate();
    const { title, content } = props;

    function handleNavigate() {
        navigate('/account')
    }
    return (
        <div className="container-xxl mt-20" style={{ filter: 'drop-shadow(0px 10px 60px rgba(0, 0, 0, 0.15))' }}>
            <div className="border">
                {/* Header */}
                <div className="bg-white p-5 border-bottom">
                    <span className='font-weight-bold cursor-pointer' style={{ fonntSize: '16px', lineHeight: '24px', color: '#E92E4E' }} onClick={handleNavigate}>Thiết lập  /</span>
                    <span className='font-weight-bold ms-1' style={{ fonntSize: '16px', lineHeight: '24px', color: '#4A5677' }}>{title}</span>
                </div>

                {/* Content */}
                <div className='p-3' style={{ background: '#F6F7FB' }}>
                    {content}
                </div>
            </div>
        </div>
    );
}

export default AccountContent;