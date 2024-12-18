import { gql } from '@apollo/client';

export const getPrivacyPolicyPL = gql`
    query getPrivacyPolicyPL {
        privacyPolicy {
            id
            title
            subtitle
            description
            content
        }
    }

`;
