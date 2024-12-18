import { gql } from "@apollo/client";

export const GetUserSavedOffers = gql`
    query GetUserSavedOffers($email: String!) {
        savedOffers(where: {email: $email}) {
            email
            calculationName
            createdAt
            stateId
        }
    }
`;
