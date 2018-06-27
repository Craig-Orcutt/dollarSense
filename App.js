import React from "react";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { getToken } from "./loginUtils";
import graphKey  from "./graphKey";
import Navigator from './Navigator';

// sets context for apollo link
const authLink = setContext(async (req, { headers }) => {
  const token = await getToken();

  // sets authorization headers for JWT
  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  };
});

// creates link to graphCool
const httpLink = new HttpLink({
  uri: `${graphKey.key}`
});

// links app to graphCool
const link = authLink.concat(httpLink);

// creates new apollo client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Navigator />
      </ApolloProvider>
    );
  }
}
