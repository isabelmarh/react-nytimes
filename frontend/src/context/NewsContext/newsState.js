import React, { useReducer } from 'react';
import NewsContext from './newsContext';
import NewsReducer from './newsReducer';
import axios from 'axios';

const NewsState = (props) => {
    const initialState = {
        loading: false,
        articles: [],
        topstory: [],
        topStories: []
    };

    const [state, dispatch] = useReducer(NewsReducer, initialState);

    const setLoading = (loading) => {
        dispatch({
            type: "SET_LOADING",
            payload: loading,
        });
    };

    const getArticles = async () => {
        try {
            setLoading(true);
            const api = await axios.get('/api');
            console.log(api.data);
            dispatch({ type: "GET_ARTICLES", payload: api.data.response.docs });
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const searchArticles = async (text) => {
        try {
            setLoading(true);
            const api = await axios.get(`/api/search/q=${text}`);
            dispatch({ type: "SEARCH_ARTICLES", payload: api.data.response.docs });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };


    const getTopArticles = async (section) => {
        try {
            setLoading(true);
            const api = await axios.get(`/api/topstories/${section}`);
            dispatch({ type: "TOP_STORIES", payload: api.data.results });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <NewsContext.Provider value={{ ...state, getArticles, searchArticles, getTopArticles }}>
            {props.children}
        </NewsContext.Provider>
    );
};

export default NewsState;