import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import { FormGroup, Label } from 'reactstrap';
import FormFeedback from 'reactstrap/lib/FormFeedback';

SelectField.propTypes = {   //nhung custom filed cua formik truyen xuong 2 thu là field,form
    field: PropTypes.object.isRequired, //filed này là của formik field
    form: PropTypes.object.isRequired, //filed này là của formik form

    options: PropTypes.array,          //Nhung props mình D/N them(danh sach option lua chon)
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
    const { name, value } = field;//dc hieu là: const { name, value, onChange, onBlur } = field;
    const selectedOption = options.find(option => option.value === value);

    const {errors, touched} = form;
    const showError= errors[name] && touched[name];

    const handleSelectedOptionChange = (selectedOption) => {
        const selectedValue = selectedOption ? selectedOption.value : selectedOption;

        //fake event
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
                {...field}//do name,value,onChange, onBlur
                value = {selectedOption}
                onChange={handleSelectedOptionChange} //phai viet o duoi thang {...field} neu ko se loi(override lai thang onChange o trong field)

                options={options} //truyen vao gi thi use cai đó
                disabled={disabled}
                placeholder={placeholder}
                className={showError ? 'is-invalid' : ''} //do thang select ko ho tro isInvalid
            />

            {showError && <FormFeedback>{errors[name]}</FormFeedback>}
            {/* <ErrorMessage name={name} component={FormFeedback} /> */}
        </FormGroup>
    );
}

export default SelectField;
