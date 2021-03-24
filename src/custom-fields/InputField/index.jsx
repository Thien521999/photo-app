import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import FormFeedback from 'reactstrap/lib/FormFeedback';

InputField.propTypes = { //nhung custom filed cua formik truyen xuong 2 thang là field,form
    field: PropTypes.object.isRequired, //filed này là của  FastField cung cap 
    form: PropTypes.object.isRequired, //filed này là của FastField cung cap

    type: PropTypes.string,           //Nhung props mình D/N them cho InputField
    label: PropTypes.string,          //Nhung props mình D/N them cho InputField
    placeholder: PropTypes.string,    //Nhung props mình D/N them cho InputField
    disabled: PropTypes.bool,         //Nhung props mình D/N them cho InputField
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
//- onChange: trigger hàm này với giá trị mới khi có thay đổi
//- onBlur: xác dịnh khi nào thì control này bị touched

function InputField(props) {
    const {
        field, form,
        type, label, placeholder, disabled,
    } = props;

    //name dc lay trong field(Trong filed co 4 thu name, value, onChange, onBlur)
    const { name } = field;//dc hieu là: const { name, value, onChange, onBlur } = field;

    //show lỗi
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}

            <Input
                id={name}
                {...field} //thay vi go 4 dong thi chi go 1 dong

                type={type}
                disabled={disabled}
                placeholder={placeholder}
                invalid={showError}
            />
            
            {/* Khi co error thi show loi */}
            {/* {showError && <FormFeedback>{errors[name]}</FormFeedback>} */} {/*<FormFeedback> chi hien thi khi thang trc nó có invalid có the làm nhu nay hoac o duoi */}
            <ErrorMessage name={name} component={FormFeedback} /> {/* ErrorMessage(show loi san cua thang formik) */}
        </FormGroup>
    );
}

export default InputField;

