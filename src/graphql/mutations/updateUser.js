import { gql } from "@apollo/client";

export const UpdateUser = gql`
    mutation UpdateUser(
        $id: ID!,
        $username: String,
        $email: String,
        $phone: String,
        $position: String,
        $industry: String,
        $company_name: String,
        $password: String
    ){
        updateUser(
            input: {
                where: { id: $id }
                data: { 
                    username: $username, 
                    email: $email,
                    phone: $phone,
                    password: $password,
                    position: $position,
                    industry: $industry,
                    company_name: $company_name
                }
            }
        ) {
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
