import { gql } from "@apollo/client";

export const GetUserSavedState = gql`
    query GetUserSavedState($id: String!) {
        savedStates(where: {id: $id}) {
            state {
                calculate_id
                text
                value
            },
            savings {
                name
                value
            }
        }
    }
`;
