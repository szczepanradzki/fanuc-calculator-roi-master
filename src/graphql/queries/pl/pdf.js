import { gql } from '@apollo/client';

export const getPdfData = gql`
    query GetPdfData {
        pdf {
            page_sections_pl {
                header,
                subheader,
                pageNumber,
                records {
                    fieldName,
                    fieldReference,
                    unit,
                    description,
                    config,
                    textBold,
                    valueBold,
                    rounded
                }
            },
            page_sections_en {
                header,
                subheader,
                pageNumber,
                records {
                    fieldName,
                    fieldReference,
                    unit,
                    description,
                    config,
                    textBold,
                    valueBold,
                    rounded
                }
            }
            ready
        }
    }
`;

