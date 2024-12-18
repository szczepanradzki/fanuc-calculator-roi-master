import { gql } from "@apollo/client";

export const RegisterUser = gql`
    mutation RegisterUser(
        $username: String!,
        $email: String!,
        $password: String!,
        $phone: String,
        $phones_agreement: Boolean,
        $position: String!,
        $industry: String!,
        $company_name: String!
    ) {
        createUser(input: {
            data: {
                username: $username,
                email: $email,
                password: $password,
                phone: $phone,
                phones_agreement: $phones_agreement,
                position: $position,
                industry: $industry,
                company_name: $company_name
            }
        }) {
            user {
                id
                username
                email
                phone
                position
                industry
                company_name
            }
        }
    }
`;
