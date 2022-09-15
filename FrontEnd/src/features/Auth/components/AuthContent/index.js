import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'

AuthContent.propTypes = {
    rightElement: PropTypes.element,
    leftTitle: PropTypes.string,
    leftDescription: PropTypes.string,
};

AuthContent.defaultProps = {
    rightElement: (<div></div>),
    leftTitle: 'Nơi lưu giữ những khoảnh khắc có một không hai',
    leftDescription: 'Trải nghiệm khám phá thế giới theo cách hoàn toàn mới. Chúng tôi tin tưởng bạn sẽ đạt được nhiều hơn những gì mong đợi. Hãy bắt đầu trải nghiệm ngay',
}

function AuthContent(props) {

    const { rightElement, leftTitle, leftDescription } = props;

    return (
        <div className='AuthContent d-flex flex-grow-1 align-items-center'>
            <div className='container-xxl'>
                <div className='Auth row d-flex justify-content-between'>
                    {/* left */}
                    <div className='col-12 col-lg-7 d-flex flex-column justify-content-center py-20'>
                        <p className='AuthContent_Title text-center text-lg-left'>{leftTitle}</p>
                        <p className='AuthContent_Description text-center text-lg-left'>{leftDescription}</p>
                    </div>

                    {/* right */}
                    <div className='col-lg-5 col-12'>
                        {rightElement}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthContent;