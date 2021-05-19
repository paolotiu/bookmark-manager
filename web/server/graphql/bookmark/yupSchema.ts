import * as yup from 'yup';
export const bookmarkSchema = yup.object().shape({
    title: yup.string().max(260, 'The title is too long'),
    url: yup.string().url('Not a valid url').required(),
    description: yup.string(),
});
