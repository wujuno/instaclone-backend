import { Resolvers } from "../../types";


const resolvers:Resolvers = {
    Query: {
        seeFollowers: async (_,{userName,page},{client})=>{
            const ok = await client.user.findUnique({
                where:{userName},
                select:{id:true}
            })
            if(!ok){
                return{
                    ok: false,
                    error:"User not found."
                }
            }
            const followers = await client.user
                .findUnique({where:{userName}})
                .followers({
                    skip:(page-1)*5,
                    take:5,
                });
            const totalFollowers = (await client.user.count({where:{following:{some:{userName}}}}))
            return {
                ok: true,
                followers,
                totalPages: Math.ceil(totalFollowers/5)
            }
        }
    }
}

export default resolvers;