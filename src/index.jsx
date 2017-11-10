/* global document localStorage */
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { BrowserRouter } from 'react-router-dom';
import { GC_AUTH_TOKEN } from './constants';

import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

const ENDPOINT_BASE = 'cj9pvw1dt0z200109z9n3l07w';
const ENDPOINT = `https://api.graph.cool/simple/v1/${ENDPOINT_BASE}`;
const SUBSCRIPTION_ENDPOINT = `wss://subscriptions.us-west-2.graph.cool/v1/${ENDPOINT_BASE}`;

const wsLink = new WebSocketLink({
  uri: SUBSCRIPTION_ENDPOINT,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(GC_AUTH_TOKEN),
    },
  },
});

const httpLink = new HttpLink({ uri: ENDPOINT });
const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(GC_AUTH_TOKEN);
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  });
  return forward(operation);
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLinkWithAuthToken
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// 4
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
// registerServiceWorker();
