import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";

const client = new PrismaClient()

const typeDefs = gql`
    type Movie {
        id:Int!
        title: String!
        year: Int!
        genre: String
        creatAt: String!
        updatedAt: String!
    }
    type Query {
        movies: [Movie!]!
        movie(id:Int!): Movie
    }
    type Mutation {
        createMovie(title: String!, year:Int!, genre:String):Movie
        deleteMovie(id: Int!):Boolean
    }
`;

const resolvers = {
    Query: {
        movies: () => client.movie.findMany(),
        movie: (_,{id}) => ({"title":"Hello", year:2021 })
    },
    Mutation: {
        createMovie: (_, {title,year,genre}) => 
            client.movie.create({data:{
                title,
                year,
                genre,
            }}),
        deleteMovie: (_, {id}) => true,
    }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url})=> {
    console.log(`Running on ${url}`);
})