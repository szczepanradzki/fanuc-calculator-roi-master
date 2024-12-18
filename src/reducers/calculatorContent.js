import { calculations } from "../utils/calculations";

const helper = (state, action) => {
    switch (action.type) {
        case "ADD_CALCULATION_CONTENT":
            return {...state, [action.content.name]: +action.content.value};
        case "SUMMARY_CALCULATE":
            let calc = calculations(action.content.calculation, state);
            return {...state, [action.content.name]: +calc};
        case "ADD_HELPER_STATE":
            return {...state, [action.content.name]: action.content.value};
        case "MERGE_HELPER_STATE":
            const newState = {...state};
            newState[action.content.name] = newState[action.content.name] || {};
            newState[action.content.name] = {...newState[action.content.name], ...action.content.value};
            return newState;
        case "REPLACE_STATE":
            return action.content;
        case'CLEAR':
            return state = {};
        default:
            return state;
    }
};

export const calcReducer = (state, action) => {
    const value = helper(state, action);
    localStorage.setItem('calc', JSON.stringify(value));
    return value
};
