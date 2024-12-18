import { gql } from "@apollo/client";

export const ResetPassword = gql`
    mutation ResetPassword(
        $password: String!,
        $reType: String!,
        $code: String!
    ){
        resetPassword(
            password: $password,
            passwordConfirmation: $reType,
            code: $code
        ) {
            jwt
        }
    }
`;
