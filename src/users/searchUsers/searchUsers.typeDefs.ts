import { gql } from "apollo-server-express";


export default gql`
    type SearchUsersResult {
        ok:Boolean!
        users: [User!]!
    }
    type Query {
        searchUsers(keyword:String! lastId:Int): SearchUsersResult!
    }
`;
