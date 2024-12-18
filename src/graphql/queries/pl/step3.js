import { gql } from '@apollo/client';

export const getStep3 = gql`
    query GetStep3 {
        step3 {
            id
            multimedia_background {
                url
            }
            multimedia_title
            multimedia_subtitle
            multimedia_button_description
            multimedia_button_url
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

