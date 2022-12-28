import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers:Resolvers = {
    Mutation: {
        toggleLike: protectedResolver(
            async(_,{id},{client,loggedInUser})=>{
                const photo = await client.user.findUnique({where:{id}})
                if (!photo){
                    return{
                        ok: false,
                        error: "Photo not found"
                    }
                }
                const like = await client.like.findUnique({
                    where:{
                        userId_photoId: {
                            userId: loggedInUser.id,
                            photoId: id
                        }
                    }
                })
                if(like){
                    await client.like.delete(
                        {
                            where:{
                                userId_photoId:{
                                    userId: loggedInUser.id,
                                    photoId: id
                                }
                            }
                        }
                    )
                } else {
                    await client.like.create({
                        data:{
                            user:{
                                connect: {
                                    id:loggedInUser.id
                                }
                            },
                            photo: {
                                connect:{
                                    id: photo.id
                                }
                            }
                        },
                    })
                }
                return {
                    ok: true,
                }
            }
        )
    }
}

export default resolvers;