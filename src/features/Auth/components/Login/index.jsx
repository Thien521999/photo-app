import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';

Login.propTypes = {
    closeDialog: PropTypes.func,
};

function Login(props) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        console.log('Form Submit:', values);

        try {
            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            console.log('New user:', user);

            //close dialog
            const { closeDialog } = props;
            if (closeDialog) {
                closeDialog();
            }
        } catch (error) {
            console.log('Failed to login:', error);
            //show thong báo khi dang ky thất bại
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    }

    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;