import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";


const resolvers:Resolvers = {
    Mutation: {
        uploadPhoto: protectedResolver(
            async (_,{file,caption},{loggedInUser,client})=> {
                let hashtagsObj = []
                if(caption){
                    const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
                    hashtagsObj = hashtags.map(hashtag => ({where:{hashtag}, create:{hashtag}}));
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