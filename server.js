import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    type Query {
        hello : String
    }
`;

const resolvers = {
    Query: {
        hello: () => "baby"
    },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url})=> {
    console.log(`Running on ${url}`);
})