import { gql } from "@apollo/client";

export const LoginUser = gql`
    mutation LoginUser ($identifier: String!, $password: String!){
        login (input: {
            identifier: $identifier,
            password: $password
        }){
            jwt
            user {
                id
                username
                email,
                role {
                    type
                }
            }
        }
    }
`;
