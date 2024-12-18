import { gql } from '@apollo/client';

export const getHomepageEN = gql`
    query getHomepageEN {
        homepageEn {
            media_title
            media_background {
                url
            }
            media_link
            media_caption
            media_button_text
            welcome_text
            welcome_header
            Login
            register_text
            register_link
            redirect_link
        }
    }
`;
