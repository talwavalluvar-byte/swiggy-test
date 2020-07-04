import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";

const cache: InMemoryCache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_TEST_API_URL || ""}/graphql`,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("Graph ql error :: ", graphQLErrors);
    return;
  }
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const testClient = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache,
});

export { testClient };
