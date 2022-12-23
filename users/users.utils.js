import jwt from "jsonwebtoken"
import client from "../client";

export const getUser = async(authorization) => {
    try {
        if(!authorization){
            return null;
        }
        const {id} = await jwt.verify(authorization, process.env.SECRET_KEY);
        const user = await client.user.findUnique({where:{id}});
        if(user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

export const protectedResolver = (ourResolver) => (root,arg,context,info) => {
    if(!context.loggedInUser){
        return{
            ok:false,
            error:"Please login to perform this action."
        }
    }
    return ourResolver(root,arg,context,info);
}