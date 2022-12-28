import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtag } from "../photos.utils";


const resolvers:Resolvers = {
    Mutation: {
        uploadPhoto: protectedResolver(
            async (_,{file,caption},{loggedInUser,client})=> {
                let hashtagsObj = []
                if(caption){
                    hashtagsObj = processHashtag(caption)
                }
                const photo = await client.photo.create({
                    data:{
                        file,
                        caption,
                        owner:{
                            connect:{
                                id:loggedInUser.id
                            }
                        },
                        ...(hashtagsObj.length && {hashtag: {
                            connectOrCreate: hashtagsObj,
                        }})
                    }
                })
                return {
                    ok: true,
                    photo,
                }
            }
        )
    }
}

export default resolvers;