import { gql } from "@apollo/client";

export const GetUserDetails = gql`
    query GetUserDetails($id: ID!) {
        user(id: $id) {
            id
            username
            email
            phone
            position
            industry
            company_name
            phones_agreement
        }
    }
`;
