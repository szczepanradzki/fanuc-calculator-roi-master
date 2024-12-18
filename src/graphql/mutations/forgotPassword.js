import { gql } from "@apollo/client";

export const ForgotPassword = gql`
    mutation ForgotPassword($email: String!){
        forgotPassword(email: $email) {
            ok
        }
    }
`;
