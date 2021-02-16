import React, { useReducer } from 'react';
import NewsContext from './newsContext';
import NewsReducer from './newsReducer';
import axios from 'axios';

const NewsState = (props) => {
    const initialState = {
        loading: false,
        articles: [],
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
            const res = await axios.get('/');
            dispatch({ type: "GET_ARTICLES", payload: res.data.response.docs });
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const searchArticles = async (text) => {
        try {
            setLoading(true);
            const res = await axios.get(`search/v2/articlesearch.json?q=${text}`);
            dispatch({ type: "SEARCH_ARTICLES", payload: res.data.response.docs });
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const getTopArticles = async (section) => {
        try {
            setLoading(true);
            const res = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${section}.json`);
            dispatch({ type: "TOP_ARTICLES", payload: res.data.results });
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <NewsContext.Provider value={{...state, getArticles, searchArticles, getTopArticles}}>
            {props.children}
        </NewsContext.Provider>
    )
}

export default NewsState;