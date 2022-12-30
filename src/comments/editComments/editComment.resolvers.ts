import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers:Resolvers = {
    Mutation: {
        editComment: protectedResolver(
            async(_,{id,payload},{loggedInUser,client})=> {
                const comment = await client.comment.findUnique({where:{id}, select:{userId:true}});
                if(!comment){
                    return {
                        ok: false,
                        error: "Comment not found."
                    }
                } else if (comment.userId !== loggedInUser.id) {
                    return {
                        ok: false,
                        error: "Not authorized."
                    }
                }
                await client.comment.update({
                    where:{id},
                    data: {
                        payload
                    }
                })
                return {
                    ok: true,
                }
            }
        )
    }
}

export default resolvers;