import { gql } from "@apollo/client";

export const GetStateContext = gql`
    query GetStateContext {
        stateContext {
            pl {
                calculateId
                fieldName
            }
            en {
                calculateId
                fieldName
            }
        }
    }
`;
