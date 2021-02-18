const reducerfn = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: payload,
            };
        case "GET_ARTICLES":
            return {
                ...state,
                articles: payload,
            };
        case "SEARCH_ARTICLES":
            return {
                ...state,
                articles: payload,
            };
        case "TOP_STORIES":
            return {
                ...state,
                topStories: payload
            };
        default:
            return state;
    }
};

export default reducerfn;