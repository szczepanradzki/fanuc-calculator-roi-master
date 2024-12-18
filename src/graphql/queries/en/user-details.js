import { gql } from "@apollo/client";

export const getUserDetailsPageEN = gql`
    query GetUserDetailsPageEN {
        registrationEn {
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
