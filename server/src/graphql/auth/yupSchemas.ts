import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    email: yup.string().email('The email is invalid').required('An email is required'),
    name: yup.string().required('A name is required'),
    password: yup
        .string()
        .min(8, 'The password is too short - Minimum of 8 characters required')
        .required('A name is required'),
});
