import { Resolvers } from "../types";

const resolvers:Resolvers = {
    Photo: {
        owner: ({ownerId},_,{client})=> client.user.findUnique({where:{id:ownerId}}),
        hashtag: ({id},_,{client})=> client.hashtag.findMany(
            {
                where:{
                    photos: {
                        some: {id}
                    }
                }
            }
            ) 
    }
}   

export default resolvers;