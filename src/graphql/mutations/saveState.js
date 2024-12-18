import { gql } from "@apollo/client";

export const SaveState = gql`
    mutation SaveState(
        $state: [ComponentCaclculatorCommponentsStateInput]!
        $savings: [ComponentCaclculatorCommponentsSavingInput]!
    ) {
        createSavedState(input: {
            data: {
                state: $state,
                savings: $savings
            }
        }) {
            savedState {
                id
            }
        }
    }
`;
