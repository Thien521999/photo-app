import { PHOTO_CATEGORY_OPTIONS } from 'constants/global';
import InputField from 'custom-fields/InputField';
import RandomPhotoField from 'custom-fields/RandomPhotoField';
import SelectField from 'custom-fields/SelectField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup } from 'reactstrap';
import Spinner from 'reactstrap/lib/Spinner';
import * as Yup from 'yup';


PhotoForm.propTypes = {
    onSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    isAddode: PropTypes.string,
};

PhotoForm.defaultProps = {
    onSubmit: null,
    initialValues: {},
    isAddode: '',
}

function PhotoForm(props) {
    //khi lam vs formik(lam vs cac control) thi phai nho khai bao cac control neu ko se bi loi
    const { initialValues, isAddode } = props;

    // const initialValues =  {
    //     title: '',
    //     categoryId: null,
    //     photo: '',
    // }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('This field is required.'),

        categoryId: Yup.number().required('This field is required.').nullable(),

        //photo: Yup.string().required('This field is required.'),
        //vd:TH thang photo phu thuoc vào thang categoryId nếu như chon category thì mới cho pho required
        photo: Yup.string().when('categoryId', {
            is: 1,
            then: Yup.string().required('This field is required.'),
            otherwise: Yup.string().notRequired(),
        }),
    });

    //const {onSubmit} = props;

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={props.onSubmit}
        // onSubmit = {value => console.log('Submit:', value)}
        >
            {formitProps => {
                //do some thing here ....
                const { values, errors, touched, isSubmitting } = formitProps;
                console.log({ values, errors, touched });

                return (
                    <Form>
                        <FastField
                            name="title"                //day la props cua FastField
                            component={InputField}      //day la props cua FastField

                            label="Title"                    //day là props truyen vao InputField
                            placeholder="Eg: Wow nature ..." //day là props truyen vao InputField
                        />

                        <FastField
                            name="categoryId"                           //day la props cua FastField
                            component={SelectField}                     //day la props cua FastField

                            label="Category"                            //day là props truyen vao SelectField
                            placeholder="What's your photo category?"   //day là props truyen vao SelectField
                            options={PHOTO_CATEGORY_OPTIONS}
                        />

                        <FastField
                            name="photo"
                            component={RandomPhotoField}
                            label="Photo"
                        />

                        {/* <FormGroup>
                                <Label for="titleId">Title</Label>
                                <Input name="title" id="titleId" placeholder="Eg: Wow nature ..." />
                            </FormGroup> */}

                        {/* <FormGroup>
                                <Label for="categoryId">Category</Label>
                                <Select
                                    id="categoryId"
                                    name="categoryId"

                                    placeholder="What's your photo category?"
                                    options={PHOTO_CATEGORY_OPTIONS}
                                />
                            </FormGroup> */}

                        {/* <FormGroup>
                                <Label for="categoryId">Photo</Label>
                                <div>
                                    <Button type="button" outline color="primary">Random a photo</Button>
                                </div>
                                <div>
                                    <img width="200px" height="200px" src={Images.COLORFUL_BG} alt="colorful background" />
                                </div>
                            </FormGroup> */}

                        <FormGroup>
                            <Button type="submit" color={isAddode ? "primary" : "success"} >
                                { isSubmitting && <Spinner size="sm" />}
                                {isAddode ? 'Add to album' : 'Update photo'}
                            </Button>
                        </FormGroup>
                    </Form>
                )
            }}
        </Formik>
    );
}

export default PhotoForm;