import * as yup from 'yup';
export const bookmarkSchema = yup.object().shape({
    title: yup.string().max(0, 'The title is too long').required(),
    url: yup.string().url('Not a valid url').required(),
    description: yup.string(),
});
