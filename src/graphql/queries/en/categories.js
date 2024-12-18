import { gql } from '@apollo/client';

export const getCategoriesEN = gql`
    query getCategoriesEN {
        categoriesEns {
            id
            name
            value
            manual
        }
    }
`;
