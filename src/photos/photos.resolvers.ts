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
            ),
        likes: (_,{id},{client})=> client.like.count({where:{photoId:id}}),
        comments: ({id},_,{client}) => client.comment.count({where:{photoId:id}}),
        isMine: async ({ownerId},_,{loggedInUser}) => {
            if(!loggedInUser){
                return false
            }
            return ownerId === loggedInUser.id
        }
        
    },
    Hashtag: {
        photos: ({id},{page},{client}) => {
            return client.hashtag.findUnique({where:{id}}).photos()
        },
        totalPhotos: ({id},_,{client})=> client.photo.count(
            {where:{hashtag:{some:{id}}}}
        )
        
    },

}   

export default resolvers;