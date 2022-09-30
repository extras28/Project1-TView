import React from 'react';
import PropTypes from 'prop-types';
import AppResource from 'general/constants/AppResource';
import './style.scss';

EmptyView.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    buttonIcon: PropTypes.string,
    buttonText: PropTypes.string,
    onPressButton: PropTypes.func,
};

EmptyView.defaultProps = {
    title: '',
    description: '',
    buttonIcon: '',
    buttonText: '',
    onPressButton: null,
};

function EmptyView(props) {
    // MARK: --- Params ---
    const {  title, description, buttonIcon, buttonText, onPressButton } = props;

    // MARK: --- Functions ---
    function handlePress() {
        if (onPressButton) {
            onPressButton();
        }
    }

    return (
        <div className='EmptyView d-flex flex-column align-items-center mt-10'>
            <div className='EmptyView_Image'>
                <img
                    className=''
                    alt='icon'
                    src={AppResource.images.imageEmpty}
                />
            </div>
            <div className='d-flex flex-column align-items-center my-5'>
                <h2 className='font-weight-boldest'>{title}</h2>
                <p className='text-center font-size-lg'>{description}</p>
            </div>
            {
                buttonText && buttonText.length > 0 && (
                    <button
                        type="button"
                        className="btn btn-outline-secondary font-weight-bold"
                        onClick={handlePress}
                    >
                        {
                            buttonIcon && buttonIcon.length > 0 && (
                                <i className={`${buttonIcon} mr-2`} />
                            )
                        }
                        {buttonText}
                    </button>
                )
            }
        </div>
    );
}

export default EmptyView;