import { gql } from '@apollo/client';

export const getCategoriesPL = gql`
    query getCategoriesPL {
        categories {
            id
            name
            value
            manual
        }
    }
`;
