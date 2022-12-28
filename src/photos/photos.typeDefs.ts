import { gql } from "apollo-server-express";

export default gql`
    type Photo {
        id: Int!
        owner: User!
        file: String!
        caption: String
        hashtag: [Hashtag]
        likes: Int!
        createdAt: String!
        updatedAt: String!
    }
    type Hashtag {
        id: Int!
        hashtag: String!
        photos(page:Int!): [Photo]
        totalPhotos: Int!
        createdAt: String!
        updatedAt: String!
    }
    type Like {
        id: Int!
        photo: Photo
        createdAt: String!
        updatedAt: String!
    }
`;
