import { gql } from "@apollo/client";

export const DeleteUser = gql`
    mutation DeleteUser($id: ID!){
        deleteUser(
            input: {
                where: { id: $id }
            }
        ) {
            user {
                id
            }
        }
    }
`;
