import { Resolvers } from "../../types";


const resolvers:Resolvers = {
    Query: {
        seeFollowers: async (_,{userName,page},{client})=>{
            const aFollowers = await client.user
                .findUnique({where:{userName}})
                .followers();
            const bFollowes = await client.user
                .findMany({where:{following:{some:{userName}}}})
        }
    }
}

export default resolvers;