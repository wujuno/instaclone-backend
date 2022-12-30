import *as bcrypt from "bcrypt"
import { Resolvers } from "../../types"
import { protectedResolver } from "../users.utils"
import { uploadToS3 } from "../../shared/shared.utils";

const resolvers:Resolvers = {
    Mutation: {
        editProfile: protectedResolver(
        async (_,
                {firstName,lastName, userName, email, password:newPassword, bio, avatar},
                {loggedInUser,client}) => {
                    let avatarUrl = null;
                    if(avatar){
                        avatarUrl = await uploadToS3(avatar, loggedInUser.id,"avatars")
                       /*  const {filename,createReadStream} = await avatar;
                        const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`
                        const readStream  = createReadStream();
                        const writeStream = createWriteStream(process.cwd()+"/uploads/"+ newFilename);
                        readStream.pipe(writeStream);
                        avatarUrl = `http://localhost:4000/static/${newFilename}` */
                    }
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
                            bio,                            
                            ...(uglyPassword && {password:uglyPassword}),
                            ...(avatarUrl && {avatar:avatarUrl})
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