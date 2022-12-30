import { gql } from "apollo-server-express";

export default gql`
    type UploadPhotoResult {
        ok: Boolean!
        photo: Photo!
        error: String
    }
    type Mutation {
        uploadPhoto(file:Upload!, caption: String): UploadPhotoResult!
    }
`;

