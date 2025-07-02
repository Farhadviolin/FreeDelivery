const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const typeDefs = gql(fs.readFileSync('schema.graphql','utf8'));
const resolvers = {
  Query: {
    recommend: async (_, { userId }, { dataSources }) =>
      dataSources.graphAPI.getRecommendations(userId),
  }
};
const server = new ApolloServer({ typeDefs, resolvers, dataSources: () => ({ graphAPI }) });
server.listen();
