import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import './styles/index.css'
// 1
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

// const ENDPOINT = 'https://api.graph.cool/simple/v1/cj9n4826v09og0108mpkuskt';
const ENDPOINT = 'https://api.graph.cool/simple/v1/cj9n45fuh09bu0108ys3epslq';


const client = new ApolloClient({
  link: createHttpLink({ uri: ENDPOINT }),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// 4
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root')
)
registerServiceWorker()
