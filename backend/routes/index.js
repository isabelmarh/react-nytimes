const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
    const res = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:("Arts")&sort=newest`, {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_NYTIMES_API_KEY}` },
    });
    res.send(res.data.response.docs);
});

router.get("/search", async (text) => {
    const res = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${text}`, {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_NYTIMES_API_KEY}` },
    });
    res.send(res.data.response.docs);
});

router.get("/toparticles", async (section) => {
    const res = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${section}.json`, {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_NYTIMES_API_KEY}` },
    });
    res.send(res.data.results);
});

module.exports = router;
