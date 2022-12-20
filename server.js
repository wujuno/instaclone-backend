import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    type Movie {
        id:Int
        title: String
        year: Int
    }
    type Query {
        movies: [Movie!]!
        movie: Movie
    }
    type Mutation {
        createMovie(title: String!):Boolean
        deleteMovie(title: String!):Boolean
    }
`;

const resolvers = {
    Query: {
        movies: () => [],
        movie: () => ({"title":"Hello", year:2021 })
    },
    Mutation: {
        createMovie: (_, {title}) => true,
        deleteMovie: (_, {title}) => true,
    }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url})=> {
    console.log(`Running on ${url}`);
})