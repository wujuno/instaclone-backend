import *as bcrypt from "bcrypt"
import { Resolvers } from "../../types";

const resolvers:Resolvers ={
    Mutation: {
        createAccount: async (_,
            {firstName,lastName,userName,email,password,},
            {client}
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
                    throw new Error("This username/email is already taken")
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
    }
}

export default resolvers;