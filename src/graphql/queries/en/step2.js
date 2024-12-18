import { gql } from '@apollo/client';

export const getStep2En = gql`
    query getStep2En {
        step2En {
            id
            Multimedia_header
            Multimedia_subtitle
            Multimedia_button_description
            Multimedia_button_url
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
