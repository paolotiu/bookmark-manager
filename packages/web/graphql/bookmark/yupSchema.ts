import { isValidUrl } from '@lib/isValidUrl';
import * as yup from 'yup';

export const bookmarkSchema = yup.object().shape({
    title: yup.string().max(260, 'The title is too long'),
    url: yup
        .string()
        .test('is-valid-url', 'Not a valid URL', (val) => isValidUrl(val))
        .required(),
    description: yup.string(),
});
