const express = require("express");
const axios = require("axios");
const router = express.Router();
const { API_KEY } = require('./../config/keys');

//   https://api.nytimes.com/svc/topstories/v2/home.json?api-key={yourkey}
/*API Key Authentication
Key location: query;
Parameter name: api - key
*/

router.get("/api", async (req, res) => {
    try {

        const api = await axios.get("https://api.nytimes.com/svc/topstories/v2/home.json?", {
            headers: { Authorization: `api-key ${API_KEY}` },
        });
        res.send(api.data.results);
    }
    catch (err) {
        console.log(err.message);
    }
});

//https://api.nytimes.com/svc/topstories/v2/home.json?api-key=ANbWf0Gyc18XxiPWyYbnrP4htpQFammZ

router.get("/search", async (req, res) => {
    console.log(req);
    try {
        const query = req.query;
        const api = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${API_KEY}`);
        res.send(api.data.response.docs);
    }
    catch (err) {
        console.log(err.message);
    }
});

router.get("/topstories/:section", async (req, res) => {
    try {
        const { section } = req.params;
        const api = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${API_KEY}`);
        console.log(api.data);
        res.send(api.data.results);
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;
