import React, { useReducer } from 'react';
import NewsContext from './newsContext';
import NewsReducer from './newsReducer';
import { SET_LOADING, SEARCH_ARTICLES, GET_ARTICLES, TOP_STORIES } from '../types';
import axios from 'axios';

const NewsState = (props) => {
    const initialState = {
        loading: false,
        article: {},
        articles: [],
        topstory: {},
        topStories: []
    };

    const [state, dispatch] = useReducer(NewsReducer, initialState);

    const setLoading = (loading) => {
        dispatch({
            type: SET_LOADING,
            payload: loading,
        });
    };

    const getArticles = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api");
            console.log(res.data.results);
            dispatch({ type: GET_ARTICLES, payload: res.data.results });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const searchArticles = async (text) => {
        try {
            setLoading(true);
            const res = await axios.get(`/search/q=${text}`);
            dispatch({ type: SEARCH_ARTICLES, payload: res.data.response.docs });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const getTopArticles = async (section) => {
        try {
            setLoading(true);
            const api = await axios.get(`/topstories/${section}`);
            dispatch({ type: TOP_STORIES, payload: api.data.results });
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