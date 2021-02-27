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
        topStories: [],
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
            const res = await axios.get("http://localhost:5000/");
            console.log('api results', res);
            dispatch({ type: GET_ARTICLES, payload: res.data });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const getTopArticles = async (section) => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:5000/topstories/${section}`);
            console.log('top results', res);
            dispatch({ type: TOP_STORIES, payload: res.data });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const searchArticles = async (text) => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:5000/search/${text}`);
            console.log('search results', res);
            dispatch({ type: SEARCH_ARTICLES, payload: res.data });
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