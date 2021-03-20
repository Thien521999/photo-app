import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label } from 'reactstrap';
import Select from 'react-select';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import { ErrorMessage } from 'formik';

SelectField.propTypes = {
    field: PropTypes.object.isRequired, //filed này là của formik field
    form: PropTypes.object.isRequired, //filed này là của formik form

    options: PropTypes.array,           //Nhung props mình D/N them
    label: PropTypes.string,          //Nhung props mình D/N them
    placeholder: PropTypes.string,    //Nhung props mình D/N them
    disabled: PropTypes.bool,         //Nhung props mình D/N them
};

SelectField.defaultProps = {
    options: [],
    label: '',
    placeholder: '',
    disabled: false,
};

function SelectField(props) {
    const {
        field, form,
        options, label, placeholder, disabled,
    } = props;

    //name dc lay trong field
    const { name, value, onChange, onBlur } = field;
    const selectedOption = options.find(option => option.value === value);

    const {errors, touched} = form;
    const showError= errors[name] && touched[name];

    const handleSelectedOptionChange = (selectedOption) => {
        const selectedValue = selectedOption ? selectedOption.value : selectedOption;

        const ChangeEvent = {
            target: {
                name: name,
                value: selectedValue,
            }
        };

        field.onChange(ChangeEvent);
    }
    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}

            <Select
                id={name}
                {...field}
                value = {selectedOption}
                onChange={handleSelectedOptionChange} //phai viet o duoi thang {...field} neu ko se loi(bi override)

                options={options}
                disabled={disabled}
                placeholder={placeholder}
                className={showError ? 'is-invalid' : ''}
            />

            {showError && <FormFeedback>{errors[name]}</FormFeedback>}
            {/* <ErrorMessage name={name} component={FormFeedback} /> */}
        </FormGroup>
    );
}

export default SelectField;
