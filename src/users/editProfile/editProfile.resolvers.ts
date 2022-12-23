import *as bcrypt from "bcrypt"
import { Resolvers } from "../../types"
import { protectedResolver } from "../users.utils"

const resolvers:Resolvers = {
    Mutation: {
        editProfile: protectedResolver(
            async (_,
                {firstName,lastName, userName, email, password:newPassword},
                {loggedInUser,client}) => {
                    let uglyPassword = null;
                    if(newPassword){
                        uglyPassword = await bcrypt.hash(newPassword,10);
                    }
                    const updatedUser = await client.user.update({
                        where:{
                            id:loggedInUser.id,
                        },
                        data:{
                            firstName,
                            lastName,
                            userName,
                            email,
                            ...(uglyPassword && {password:uglyPassword})
                        }
                    })
                    if(updatedUser.id){
                        return {
                            ok:true
                        }
                    } else {
                        return {
                            ok:false,
                            error: "Could not update profile."
                        }
                    }
            }
        )
    }
}

export default resolvers;