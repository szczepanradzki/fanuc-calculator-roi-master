import { gql } from "@apollo/client";

export const ThankYouPageEn = gql`
    query ThankYouPageEn {
        thankYouPageEn {
            id
            Title
            Description
            Image {
                url
            }
        }
    }
`;
