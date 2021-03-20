import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import RandomPhoto from 'components/RandomPhoto';
import FormFeedback from 'reactstrap/lib/FormFeedback';

RandomPhotoField.propTypes = {
    field: PropTypes.object.isRequired, //filed này là của formik field cung cap 
    form: PropTypes.object.isRequired,  //filed này là của formik field cung cap 

    label: PropTypes.string,
};

RandomPhotoField.defaultProps = {
    label: '',
}

function RandomPhotoField(props) {
    const { field, form, label } = props;
    const { name, value, onBlur } = field;

    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const handleImageUrlChange = (newImageUrl) => {
        form.setFieldValue(name, newImageUrl);
    }

    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}

            <RandomPhoto
                name={name}
                imageUrl={value}
                onImageUrlChange={handleImageUrlChange}
                onRandomButtonBlur={onBlur}
            />
            
            <div className={showError ? 'is-invalid' : ''}></div>{/* Ko nen lam nhu cach nay(lam de biet them thui hehe) */}
            {showError && <FormFeedback>{errors[name]}</FormFeedback>}

        </FormGroup>
    );
}

export default RandomPhotoField;