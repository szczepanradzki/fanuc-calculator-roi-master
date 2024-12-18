import { gql } from '@apollo/client';

export const getPrivacyPolicyEN = gql`
    query getPrivacyPolicyEN {
        privacyPolicyEn {
            id
            title
            subtitle
            description
            content
        }
    }

`;
