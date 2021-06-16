import { gql } from '@apollo/client';
import { BookmarkFragments, ErrorFragments } from '@graphql/fragments';

export const CREATE_BOOKMARK = gql`
    mutation createBookmark($url: String!, $folderId: Int) {
        createBookmark(data: { url: $url, folderId: $folderId }) {
            ...Bookmark
            ...BaseError
            ...ValidationError
        }
    }

    ${BookmarkFragments.bookmark}
    ${ErrorFragments.base}
    ${ErrorFragments.validation}
`;
