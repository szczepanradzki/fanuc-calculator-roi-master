import { gql } from '@apollo/client';

export const getStep5 = gql`
    query GetStep5 {
        step5 {
            multimedia_background {
                url
            }
            multimedia_small_title
            multimedia_title
            multimedia_button_description
            document_file {
                url
            }
            multimedia_subtitle_column1_header
            multimedia_subtitle_column1_text
            multimedia_subtitle_column2_header
            multimedia_subtitle_column2_text
            multimedia_subtitle_column3_header
            multimedia_subtitle_column3_text
            sections {
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

