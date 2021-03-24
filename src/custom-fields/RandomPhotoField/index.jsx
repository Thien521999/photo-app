import RandomPhoto from 'components/RandomPhoto';
import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
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

            {/* <div className={showError ? 'is-invalid' : ''}> */}
                <RandomPhoto
                    name={name}
                    imageUrl={value}
                    onImageUrlChange={handleImageUrlChange}
                    onRandomButtonBlur={onBlur}
                />
            {/* </div> */}

            {/* Ko nen lam nhu cach nay(lam de biet them thui hehe) */}
            <div className={showError ? 'is-invalid' : ''}></div>

            {/* dung 1 trong 2 cach ben duoi */}
            {showError && <FormFeedback>{errors[name]}</FormFeedback>}
            {/* <ErrorMessage name={name} component={FormFeedback} /> */}

        </FormGroup>
    );
}

export default RandomPhotoField;

// RandomPhoto
    //props
    //- name
    //- imageUrl
    //- onImageUrlChange
    //- onRandomButtonBlur

//RandomPhotoField : là cấu nối lay du lieu tu formik bind vao RandomPhoto

//Formik(thang co du lieu)