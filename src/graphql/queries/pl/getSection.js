import { gql } from '@apollo/client';

export const getSection = gql`
    query getSection($sectionName: String!) {
        sections: sections(where: { header: $sectionName }) {
            id
            header
            dynamic_content {
                ...on ComponentCaclculatorCommponentsTitleCommponent {
                    __typename
                    id
                    header
                    ribon
                    description
                    default_value
                    calculate_name
                    calculate_id
                    properities
                    showArrow
                }
                ...on ComponentCaclculatorCommponentsCalculation {
                    __typename
                    id
                    calculator_subtitle
                    logic_operation
                    calculator_description
                    calculate_name
                    calculate_id
                    unit
                    Records {
                        id
                        header
                        ribon
                        description
                        default_value
                        show_arrows
                        css_class
                        calculate_name
                        calculate_id
                        properities
                        unit
                    }
                    NewDropDown {
                        __typename
                        id
                        header
                        ribbon
                        defalut_value
                        css_class
                        calculate_id
                        unit
                        properities
                    }
                }
                ...on ComponentCaclculatorCommponentsGreyInput {
                    __typename
                    id
                }

                ...on ComponentCaclculatorCommponentsAdditionalBox{
                    __typename
                    id
                    componentID
                    description
                    unit
                    calculate_id
                    default_records{
                        id
                        header
                        description
                        default_value
                        css_class
                        properities
                        unit
                    }
                }

                ...on ComponentCaclculatorCommponentsAttribute{
                    __typename
                    id
                    header
                    ribon
                    description
                    default_value
                    field_explaination
                    show_arrows
                    unit
                    properities
                    calculate_name
                    calculate_id
                    css_class
                }
                ...on ComponentCaclculatorCommponentsBorderBox{
                    __typename
                    id
                    attributesList {
                        id
                        header
                        ribon
                        description
                        default_value
                        show_arrows
                        css_class
                        properities
                        calculate_name
                        calculate_id
                        unit
                    }
                }
                ...on ComponentCaclculatorCommponentsGreyInput {
                    __typename
                    id
                    defalut_value
                    description
                    properities
                    calculate_id
                    css_class
                }
                ...on ComponentCaclculatorCommponentsButton {
                    __typename
                    id
                    text
                    link
                    css_class
                }
                ... on ComponentCaclculatorCommponentsOutcome{
                    __typename
                    id
                    title
                    mainResult{
                        id
                        header
                        description
                        default_value
                        unit
                        properities
                        calculate_id
                        calculate_name
                        css_class
                    }
                }
            }
        }
    }
`;
