import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import NavBar from './components/layouts/NavBar';
import { Articles, TopStories, Search } from './components';
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import NewsState from './context/NewsContext/newsState';

const App = () => {
  return (
    <NewsState>
      <Router>
        <NavBar />
        <Container>
          <Typography color="textPrimary" gutterBottom variant="h2" align="center">
            <Switch>
              <Route exact path="/" render={() => (
                <>
                  <Search/>
                  <NavLink to="/topstories">
                    <Link component="button" variant="body2">Go to top stories in World, Tech and U.S</Link>
                  </NavLink>
                  <Articles />
                </>
              )} />
              <Route exact path="/topstories" render={() => (
                <>
                  <TopStories />
                </>
              )} />
            </Switch>
          </Typography>
        </Container>
      </Router>
    </NewsState>
  );
};

export default App;

  // https://api.nytimes.com/svc/topstories/v2/world.json?api-key=
  // https://api.nytimes.com/svc/search/v2/articlesearch.json?q=technology&api-key=
  //https://api.nytimes.com/svc/search/v2/articlesearch.json?q=technology&api-key=

  // useEffect(() => {
  //   const getArticles = async () => {
  //     setLoading(true);
  //     const res = await axios.get(` https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:("Front Page")&sort=newest&api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`);
  //     setArticles(res.data.response.docs);
  //     setLoading(false);
  //   };
  //   getArticles();
  // }, []);

  // const searchArticles = async (text) => {
  //   setLoading(true);
  //   const res = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${text}&api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`);
  //   setArticles(res.data.response.docs);
  //   setLoading(false);
  // };

  // const getTopArticles = async (section) => {
  //   setLoading(true);
  //   const res = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`);
  //   setTopStories(res.data.results);
  //   setLoading(false);
  // };
