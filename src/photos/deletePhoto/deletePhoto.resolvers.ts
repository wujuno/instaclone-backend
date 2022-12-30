import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers:Resolvers = {
    Mutation: {
        deletePhoto: protectedResolver(
            async(_,{id},{loggedInUser,client})=>{
                const photo = await client.photo.findUnique({where:{id},select:{ownerId:true}});
                if(!photo){
                    return {
                        ok: false,
                        error: "Found not photo."
                    }
                } else if (photo.ownerId !== loggedInUser.id) {
                    return {
                        ok: false,
                        error: "Not authorized."
                    }
                }
                await client.photo.delete({where:{id}})
                return {
                    ok: true,
                }
            }
        )
    }
}

export default resolvers;