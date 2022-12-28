import { gql } from "apollo-server-express";

export default gql`
    type EditPhotoResult {
        ok: Boolean!
        error: String
        photo: Photo
    }
    type Mutation {
        editPhoto(id:Int!, caption:String): EditPhotoResult!
    }
`;