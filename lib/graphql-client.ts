import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(process.env.API_URL!, { headers: {} });

export default client;
