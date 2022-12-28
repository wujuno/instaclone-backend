import { Resolvers } from "../types";

const resolvers:Resolvers = {
    User:{
        totalFollowing:({id},_,{client}) => client.user.count(
            {
                where:{
                    followers:{
                        some:{
                            id
                        }
                    }
                }
            }
        ),
        totalFollowers:({id},_,{client}) => client.user.count(
            {
                where:{
                    following:{
                        some:{
                            id
                        }
                    }
                }
            }
        ),
        isMe:({id},args,{loggedInUser})=> {
            if(!loggedInUser){
                return false
            }
            return id === loggedInUser.id
        },
        isFollowing: async ({id},_,{loggedInUser,client})=> {
            if(!loggedInUser){
                return false
            }
            const exists = await client.user
                .findUnique({where:{userName:loggedInUser.userName}})
                .following({where:{id}});
            return exists.length !== 0
        },
        photos: ({id},_,{client})=> client.user.findUnique({where:{id}}).photos()
    }
}

export default resolvers;