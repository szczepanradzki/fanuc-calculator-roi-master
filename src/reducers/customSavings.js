const helper = (state, action) => {
    switch (action.type) {
        case 'SET_SAVINGS':
            return [...action.content];
        case 'ADD_SAVINGS':
            return [...state, ...action.content];
        case'CLEAR':
            return state = [];
        default:
            return state;
    }
};

export const customSavings = (state, action) => {
    const value = helper(state, action);
    localStorage.setItem('savings', JSON.stringify(value));
    return value
};
