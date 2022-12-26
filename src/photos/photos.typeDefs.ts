import { gql } from "apollo-server-express";

export default gql`
    type Photo {
        id: Int!
        owner: User!
        file: String!
        caption: String
        hashtag: [Hashtag]
        createdAt: String!
        updatedAt: String!
    }
    type Hashtag {
        id: String!
        hashtag: String!
        photos: [Photo]
        createdAt: String!
        updatedAt: String!
    }
`;
