import { gql } from "@apollo/client";

export const ConfirmPageEn = gql`
    query ConfirmPageEn {
        confirmPageEn {
            Title
            Description
            Image {
                url
            }
        }
    }

`;
