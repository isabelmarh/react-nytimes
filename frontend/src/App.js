import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import NavBar from './components/layouts/NavBar';
import { Articles, TopStories, Search, FrontPage } from './components';
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
                  <Search />
                  <NavLink to="/topstories/:section">
                    <Link component="button" variant="body2">Go to top stories in World, Tech and U.S</Link>
                  </NavLink>
                  <FrontPage />
                  {/* <Articles /> */}
                </>
              )} />
              <Route path="/topstories/:section" render={() => (
                <>
                  <TopStories />
                </>
              )} />

              <Route path="/search/:text" render={() => (
                <>
                  <Articles />
                </>
              )} />
            </Switch>
          </Typography>
        </Container>
      </Router>
    </NewsState >
  );
};

export default App;

  // https://api.nytimes.com/svc/topstories/v2/world.json?api-key=
  // https://api.nytimes.com/svc/search/v2/articlesearch.json?q=technology&api-key=
  //https://api.nytimes.com/svc/search/v2/articlesearch.json?q=technology&api-key=

