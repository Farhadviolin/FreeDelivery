// Apollo Gateway config for Unified API Layer
const { ApolloGateway } = require('@apollo/gateway');
const gateway = new ApolloGateway({
  serviceList: [
    { name: 'order', url: 'http://order-service/graphql' },
    { name: 'restaurant', url: 'http://restaurant-service/graphql' },
    // ...add more services
  ],
});
module.exports = gateway;
