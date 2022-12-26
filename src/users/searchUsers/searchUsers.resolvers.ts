import { Resolvers } from "../../types";


const resolvers:Resolvers = {
    Query: {
        searchUsers: async (_,{keyword,lastId},{client}) => {
            const users = await client.user.findMany(
                {
                    where:{
                        userName:{
                            startsWith:keyword.toLowerCase()
                        }
                    },
                    skip: lastId ? 1 : 0,
                    take: 10,
                    ...(lastId && {cursor:{id:lastId}})
                }
            )
            return {
                ok: true,
                users,
            }
        }
        }
}


export default resolvers;