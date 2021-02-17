require('dotenv').config();

const keysDev = {
    API_KEY: process.env.REACT_APP_NYTIMES_API_KEY,
};

const keysProd = {
    API_KEY: process.env.REACT_APP_NYTIMES_API_KEY,
};

if (process.env.NODE_ENV === "production") {
    module.exports = keysProd;
} else {
    module.exports = keysDev;
}