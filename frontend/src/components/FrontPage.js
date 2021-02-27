import React, { useEffect, useContext } from 'react';
import TopStory from './TopStory';
import Spinner from './layouts/Spinner';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
// import PropTypes from 'prop-types';
import NewsContext from '../context/NewsContext/newsContext';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "#fafafa",
    },
    media: {
        height: 300,
    },
    buttons: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const TopStories = () => {
    const newsContext = useContext(NewsContext);
    const { loading, getArticles, topStories } = newsContext;

    const classes = useStyles();

    useEffect(() => {
        getArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            { loading ?
                (
                    <Spinner /> // or instead just type "Loading"
                ) : (
                    <>
                        <div className={classes.root} >
                            <Grid container spacing={3}>
                                {topStories && topStories.map((topstory) => (
                                    <Grid item xs={12} sm={4} key={topstory.url}>
                                        <TopStory topstory={topstory}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </>
                )}
        </>
    );
};

// TopStories.propTypes = {
//     loading: PropTypes.bool.isRequired,
//     topStories: PropTypes.array.isRequired,
//     getTopArticles: PropTypes.func.isRequired,
// };

export default TopStories;
