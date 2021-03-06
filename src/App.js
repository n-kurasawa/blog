/*globals module: false */
import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import styled from 'styled-components';
import { load } from 'reducers/article';
import Header from 'components/Header';
import ArticleList from 'components/ArticleList';
import Article from 'components/Article';
import Profile from 'components/Profile';

const link = new HttpLink({ uri: '/api/graphql' });
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

class App extends React.Component {
  componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <React.Fragment>
            <Header />
            <Container>
              <Switch>
                <Route exact path="/" component={ArticleList} />
                <Route exact path="/articles" component={ArticleList} />
                <Route path="/articles/:id" component={Article} />
                <Route path="/profile" component={Profile} />
              </Switch>
            </Container>
          </React.Fragment>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

const Container = styled.div`
  margin: 90px auto;
  width: 60%;

  @media screen and (max-width: 768px) {
    margin: 70px auto;
    width: 90%;
  }
`;

export default connect(null, { load })(hot(module)(App));
