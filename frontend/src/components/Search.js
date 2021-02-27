import React, { useState, useContext } from 'react';
// import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import NewsContext from '../context/NewsContext/newsContext';

const Search = () => {
    const [text, setText] = useState("");
    const newsContext = useContext(NewsContext);
    const { searchArticles } = newsContext;

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        searchArticles(text);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Search articles"
                    type="text"
                    name="text"
                    value={text}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </form>
        </div>
    );
};

// Search.propTypes = {
//     searchArticles: PropTypes.func.isRequired,
// };

export default Search;
