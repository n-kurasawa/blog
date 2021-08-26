import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: "https://blog-api.blog.svc.cluster.local",
  uri: "http://192.168.0.110/api/query",
  cache: new InMemoryCache(),
});

export default client;
