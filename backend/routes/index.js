const express = require("express");
const axios = require("axios");
const router = express.Router();
const { API_KEY } = require('./../config/keys');

router.get("/", async (req, res) => {
    const res = await axios.get(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`);
    res.send(res.data.response.docs);
});

router.get("/search", async (text) => {
    const res = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${text}&api-key=${API_KEY}`);
    res.send(res.data.response.docs);
});

router.get("/toparticles", async (section) => {
    const res = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${section}.json?&api-key=${API_KEY}`);
    res.send(res.data.results);
});

module.exports = router;
