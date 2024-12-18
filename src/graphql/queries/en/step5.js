import { gql } from '@apollo/client';

export const getStep5En = gql`
    query getStep5En {
        step5En {
            id
            Multimedia_small_title
            Multimedia_title
            Multimedia_button_description
            document_file {
                url
            }
            Multimedia_subtitle_column1_header
            Multimedia_subtitle_column1_text
            Multimedia_subtitle_column2_header
            Multimedia_subtitle_column2_text
            Multimedia_subtitle_column3_header
            Multimedia_subtitle_column3_text
            Multimedia_background {
                url
            }
            sections_ens {
                id
                header
            }
            multimedia_personalization {
                __typename
                ... on ComponentPersonalizationSubtitle {
                    id
                    Subtitle
                    categories {
                        id
                        name
                        value
                        manual
                    }
                }
                ... on ComponentPersonalizationVideoUrl {
                    id
                    VideoCategories
                    categories {
                        id
                        name
                        value
                        manual
                    }
                }
                ... on ComponentPersonalizationHeader {
                    id
                    CategoryHeder
                    categories {
                        id
                        name
                        value
                        manual
                    }
                }
                ... on ComponentPersonalizationBackgrand {
                    id
                    media {
                        url
                    }
                    categories {
                        id
                        name
                        value
                        manual
                    }
                }
            }
        }
    }
`;


