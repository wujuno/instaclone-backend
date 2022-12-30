import *as jwt from "jsonwebtoken"
import client from "../client";
import { Resolver } from "../types";

export const getUser = async(authorization: string | null) => {
    try {
        if(!authorization){
            return null;
        }
        const verifiedToken = await jwt.verify(authorization, process.env.SECRET_KEY);
        const user = await client.user.findUnique({where:{id:verifiedToken["id"]}});
        if(user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

export const protectedResolver = (ourResolver:Resolver) => (root,arg,context,info) => {
    if(!context.loggedInUser){
        const query = info.operation.operation === "query";
        if(query){
            return null;
        } else{
            return{
                ok:false,
                error:"Please login to perform this action."
            }
        }
    }
    return ourResolver(root,arg,context,info);
}