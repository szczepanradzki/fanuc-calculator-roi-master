import { gql } from "@apollo/client";

export const ThankYouPage = gql`
    query ThankYouPage {
        thankYouPage {
            id
            title
            description
            image {
                url
            }
        }
    }
`;
