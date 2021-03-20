import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
import PropTypes from 'prop-types';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        console.log('Form Submit:', values);

        try {
            //auto set username = email
            values.username = values.email;

            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            console.log('New user:', user);

            //close dialog
            const {closeDialog} = props;
            if(closeDialog) {
                closeDialog();
            }

            //show thong báo khi dang ky thanh cong
            enqueueSnackbar('Success register', { variant: 'success' });
        } catch (error) {
            console.log('Failed to register:', error);
            //show thong báo khi dang ky thất bại
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;