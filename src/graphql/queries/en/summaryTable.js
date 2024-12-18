import { gql } from "@apollo/client";

export const GetSummaryTableEN = gql`
    query GetSummaryTableEN {
        summaryTableEn {
            years
            header {
                id
                calculate_id
                calculate_name
                name
                description
            }
        }
    }
`;
