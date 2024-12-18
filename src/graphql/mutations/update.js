import { gql } from "@apollo/client";

export const UpdateUser = gql`
    mutation UpdateUser($id: ID!) {
        updateUser(input: {
            where: { id: $id }, 
            data: { confirmed: true } }) {
            user {
                username
                email
            }
        }
    }
`;
