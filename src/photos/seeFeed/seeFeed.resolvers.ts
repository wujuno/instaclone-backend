import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers:Resolvers = {
    Query: {
        seeFeed: protectedResolver(
            async(_,__,{client,loggedInUser})=> {
                await client.photo.findMany(
                    {
                        where: {
                            OR: [
                                {
                                    owner:{
                                        followers:{
                                            some:{
                                                id:loggedInUser.id
                                            }
                                        }
                                    }
                                },
                                {
                                    ownerId: loggedInUser.id
                                }
                            ]
                        },
                        orderBy: {
                            createdAt:"desc"
                        }
                    }
                )
            }
        )
    }
}
export default resolvers;