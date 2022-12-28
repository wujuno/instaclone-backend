import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers:Resolvers = {
    Mutation:{
        createComment: protectedResolver(
            async(_,{photoId,payload},{client,loggedInUser})=> {
                const ok = await client.photo.findUnique({where:{id:photoId},select:{id:true}})
                if(!ok){
                    return{
                        ok:false,
                        error: "Photo not found."
                    }
                }
                await client.comment.create({
                    data: {
                        payload,
                        user:{
                            connect: {
                                id:loggedInUser.id
                            }
                        },
                        photo:{
                            connect: {
                                id:photoId
                            }
                        }
                    }
                })
                return {
                    ok: true
                }
            }
        )
    }
}

export default resolvers;