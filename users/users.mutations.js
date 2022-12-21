import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import client from "../client"


export default {
    Mutation: {
        createAccount: async (_,
            {firstName,lastName,userName,email,password,}
        )=> {
            try {
                const existingUser = await client.user.findFirst({
                    where:{
                        OR: [
                            {
                                userName,
                            },
                            {
                                email,
                            }
                        ]
                    }
                });
                if(existingUser) {
                    throw new Error("This username/password is already taken")
                }
                const uglyPassword = await bcrypt.hash(password,10);
                return client.user.create({
                    data: {
                        userName,
                        email,
                        firstName,
                        lastName,
                        password:uglyPassword
                    }
                })
            } catch (error) {
                return error;
            }
        },
        login: async (_,{
            userName,password}) => {
                const user = await client.user.findFirst({where:{userName}})
                if(!user){
                    return {
                        ok:false,
                        error: "User not found,"
                    };
                }
                const passwordOk = await bcrypt.compare(password,user.password);
                if(!passwordOk){
                    return {
                        ok:false,
                        error:"Incorrect Password."
                    };
                }
                const token = await jwt.sign({id:user.id},process.env.SECRET_KEY);
                return {
                    ok: true,
                    token,
                }
            }
    }
}