import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

BaseCheckBox.propTypes = {
    name: PropTypes.string.isRequired,
    fieldProps: PropTypes.object,
    fieldMeta: PropTypes.object,
    fieldHelper: PropTypes.object,

    label: PropTypes.string,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    additionClassName: PropTypes.string,
    additionLabelStyle: PropTypes.object,
    labelElement: PropTypes.element,
};

BaseCheckBox.defaultProps = {
    fieldProps: {},
    fieldMeta: {},
    fieldHelper: {},

    label: '',
    disabled: false,
    text: '',
    additionClassName: '',
    additionLabelStyle: {},
    labelElement: (<span></span>)
};

function BaseCheckBox(props) {
    // MARK: --- Params ---
    const { name, fieldProps, fieldMeta, fieldHelper, label, disabled, text, additionClassName, additionLabelStyle, labelElement } = props;
    const { error, touched } = fieldMeta;
    const isError = error && touched;

    return (
        <div className={`BaseCheckBox form-group  ${additionClassName}`}>
                <div className='d-flex flex-row align-items-center'>
                    <input
                        className='BaseCheckBox_Input'
                        type='checkbox'
                        name={name}
                        {...fieldProps}
                        checked={fieldProps.value ?? false}
                    />
                    <span className='ms-2' style={additionLabelStyle} >
                        {label || labelElement} 
                    </span>
                </div>
            {
                text.length > 0 && (
                    <span className='form-text text-muted'>{text}</span>
                )
            }
            {
                isError && (
                    <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{error}</div>
                    </div>
                )
            }
        </div>
    );
}

export default BaseCheckBox;