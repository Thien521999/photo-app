import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label } from 'reactstrap';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import { ErrorMessage } from 'formik';

InputField.propTypes = {
    field: PropTypes.object.isRequired, //filed này là của formik field cung cap 
    form: PropTypes.object.isRequired, //filed này là của formik form cung cap

    type: PropTypes.string,           //Nhung props mình D/N them
    label: PropTypes.string,          //Nhung props mình D/N them
    placeholder: PropTypes.string,    //Nhung props mình D/N them
    disabled: PropTypes.bool,         //Nhung props mình D/N them
};

InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
};

// Custom field
//Cau noi giua UI control va formik
//UI control la mot controlled component vs props:
//- name: tên xác định control
//- value: giá trị của control
//- onChnage: trigger hàm này với giá trị mới khi có thay đổi
//- onBlur: xác dịnh khi nào thì control này bị touched

function InputField(props) {
    const {
        field, form,
        type, label, placeholder, disabled,
    } = props;

    //name dc lay trong field
    const { name, value, onChange, onBlur } = field;

    //show lỗi
    const { errors, touched } = form;
    const showError = errors[name] && touched[name] ;

    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}

            <Input
                id={name}
                {...field}

                type={type}
                disabled={disabled}
                placeholder={placeholder}
                invalid={showError}
            />

            {/* {showError && <FormFeedback>{errors[name]}</FormFeedback>} */} {/*<FormFeedback> chi hien thi khi thang trc nó invalid có the làm nhu nay hoac o duoi */}
            <ErrorMessage name={name} component={FormFeedback} /> {/* ErrorMessage(show loi san cua thang formik) */}
        </FormGroup>
    );
}

export default InputField;


// RandomPhoto
//props
//- name
//- imageUrl
//- onImageUrlChange
//- onRandomButtonBlur

//RandomPhotoField : là cấu nối lay du lieu tu formik bind vao RandomPhoto

//Formik(thang co du lieu)

