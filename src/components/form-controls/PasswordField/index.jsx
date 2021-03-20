import { FormHelperText, TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {
    form: PropTypes.object.isRequired, //bat buoc phai co
    name: PropTypes.string.isRequired, //bat buoc phai co

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function PasswordField(props) {
    const { form, name, label, disabled } = props;

    //Lấy thông tin error
    //Khi ma field da touch(co nghia la focus,chinh sua rui)rui thì nó tinh la touch
    const { errors } = form;
    const hasError = !!errors[name];

    // const {errors, formState} = form;
    // const hasError = formState.touched[name] && errors[name];
    // console.log(errors[name], formState.touched[name]);

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(x => !x);
    }

    return (
        //de de dang lam viec voi cac thu vien ben ngoai va tu dong binding cac ham nhu onchange, onblur, ....
        //thi su dung controller cua React-hook-form.
        //dùng Controller nó sẽ tự động bind vào TextField này những sự kiện như onChange, onBlur, value,...Controller sẽ tự làm giúp mình
        <div>
            {/* <Controller
                name={name} //bat buoc phai co
                control={form.control} //bat buoc phai co(lay tu form.control)
                as={TextField} //ban muon su dung UI Libery nào.bat buoc phai co

                margin="normal" //duoc truyen vao trong TextField luon
                variant="outlined"//duoc truyen vao trong TextField luon
                fullWidth //duoc truyen vao trong TextField luon
                label={label} //duoc truyen vao trong TextField luon
                disabled={disabled} //duoc truyen vao trong TextField luon

                //de show error
                error={!!hasError} //!phu dinh tra ve true false
                helperText={errors[name]?.message} //?. de kiem tra th có hay ko(optional)
            /> */}

            <FormControl error={hasError} margin="normal" fullWidth variant="outlined">
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Controller
                    name={name} //bat buoc phai co
                    control={form.control} //bat buoc phai co(lay tu form.control)
                    as={OutlinedInput} //ban muon su dung UI Libery nào.bat buoc phai co

                    id={name}
                    type={showPassword ? 'text' : 'password'}
                    label={label}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={toggleShowPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }

                    disabled={disabled}
                />
                <FormHelperText >{errors[name]?.message}</FormHelperText>
            </FormControl>
        </div>



    );
}

export default PasswordField;