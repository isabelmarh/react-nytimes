import React, { useContext, useEffect } from 'react';
import Spinner from './layouts/Spinner';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Article from './Article.js';
import PropTypes from 'prop-types';
import NewsContext from '../context/NewsContext/newsContext';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "#fafafa",
    },
    media: {
        height: 300,
    },
});

const Articles = () => {
    const newsContext = useContext(NewsContext);
    const { loading, searchArticles, articles } = newsContext;

    const classes = useStyles();

    useEffect(() => {
        searchArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {
                loading ? (
                    <Spinner />
                ) : (
                        <div className={classes.root} >
                            <Grid container spacing={3}>
                                {articles && articles.map((article) => (
                                    <Grid item xs={12} sm={4} key={article._id}>
                                        <Article article={article} />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>)}
        </>
    );
};

Articles.propTypes = {
    loading: PropTypes.bool.isRequired,
    articles: PropTypes.array.isRequired,
};

export default Articles;