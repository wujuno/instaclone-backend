import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtag } from "../photos.utils";

const resolvers:Resolvers = {
    Mutation: {
        editPhoto: protectedResolver(
            async(_,{id, caption},{client,loggedInUser})=>{
                const oldPhoto = await client.photo.findFirst(
                    {
                        where:{id,ownerId:loggedInUser.id},
                        include: {
                            hashtag: {
                                select: {
                                    hashtag: true
                                }
                            }
                        }
                    }
                )
                if(!oldPhoto){
                    return {
                        ok: false,
                        error: "Photo not found."
                    }
                }
                const photo = await client.photo.update(
                    {
                        where:{
                            id
                        },
                        data:{
                            caption,
                            hashtag: {
                                disconnect: oldPhoto.hashtag,
                                connectOrCreate: processHashtag(caption)
                    
                            }
                        }
                    }
                )
                return {
                    ok: true,
                    photo,
                }
            }
        )
    }
}
export default resolvers;