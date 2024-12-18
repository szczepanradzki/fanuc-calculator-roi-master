import { gql } from "@apollo/client";

export const ConfirmPage = gql`
    query ConfirmPage {
        confirmPage {
            image {
                url
            },
            title,
            description
        }
    }

`;
