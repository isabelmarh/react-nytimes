import { SET_LOADING, GET_ARTICLES, SEARCH_ARTICLES, TOP_STORIES } from '../types';

const reducerFn = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: payload,
            };
        case GET_ARTICLES:
            return {
                ...state,
                articles: payload,
            };
        case SEARCH_ARTICLES:
            return {
                ...state,
                articles: payload,
            };
        case TOP_STORIES:
            return {
                ...state,
                topStories: payload
            };
        default:
            return state;
    }
};

export default reducerFn;
