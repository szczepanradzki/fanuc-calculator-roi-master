import { gql } from "@apollo/client";

export const getUserDetailsPagePL = gql`
    query GetUserDetailsPage {
        registration {
            multimedia_background {
                url
            }
            multimedia_title
            register_title
            register_description
            multimedia_subtitle
            active_button_text
            document_file {
                url
            }
            button_text
            button_url
        }
    }

`;
