import { gql } from "@apollo/client";

export const GetSummaryTable = gql`
    query GetSummaryTable {
        summaryTable {
            years
            header {
                name
                calculate_name
                calculate_id
                css_class
                description
            }
        }
    }
`;
