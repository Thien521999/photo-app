import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
}

function TodoForm(props) {
    const schema = yup.object().shape({
        title: yup.string()
            .required('Please enter title')
            .min(5, 'Title is too short'),
    });

    const form = useForm({
        defaultValues: {
            title: '', //cần liệt kê tất cả các field ở đây nếu không nó sẽ xãy ra TH không hiểu or UnControl
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = (values) => {
        //console.log('TODO FORM: ', values);
        const { onSubmit } = props;
        if (!onSubmit) return;
        onSubmit(values);

        // khi submit xong xoa gia tri trong ô input
        form.reset();
    }

    return (
        //form.handleSubmit la cua thang form,
        //handleSubmit la cua minh viet
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name="title" label="Todo" form={form} />
        </form>
    );
}

export default TodoForm;