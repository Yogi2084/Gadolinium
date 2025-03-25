import type { User } from "@prisma/client";
import { SignupError, type SignUpWithUsernameAndPasswordResponseResult } from "./+type.js";
import { SignInWithUsernameAndPasswordError } from "./+type.js";
import jwt from "jsonwebtoken";
import { prisma } from "../../extras/prisma";
import { createHash } from "crypto";    
import { secret } from "../../environment";




export const signUpWithUsernameAndPasswordResponseResult = async (parameters: {
    username: string,
    password: string
}): Promise<SignUpWithUsernameAndPasswordResponseResult> => {
    try{
        const existingUser = await prisma.user.findUnique({
            where: {
                username: parameters.username,
            },
        });

        if (existingUser) {
            throw SignupError.CONFLICTING_USERNAME;
        }

        const passwordHash = createHash("sha256").update(parameters.password).digest("hex");
        const user = await prisma.user.create({
            data: {
                name: parameters.username, // Assuming the name is the same as the username
                username: parameters.username,
                password: passwordHash,
            },
        });

        const jwtPayload: jwt.JwtPayload = {
            iss: "https://purpleshoy.co.in",
            sub: user.id,
            username: user.username,
        };

        const token = jwt.sign(jwtPayload, secret, {
            expiresIn: "30d",
        });

        const result: SignUpWithUsernameAndPasswordResponseResult = {
            token,
            user,
        };
        return result;
    } catch (e) {
        console.error(e);
        throw SignupError.UNKNOWN;
    }
}
export const loginWithUserNameAndPAsswordResult = async (parameters: {
    username: string,
    password: string
}): Promise<SignUpWithUsernameAndPasswordResponseResult> => {
        const user = await prisma.user.findUnique({
            where: {
                username: parameters.username,
            },
        });

        if (!user) {    
            throw SignInWithUsernameAndPasswordError.INVALID_CREDENTIALS;
        }    

        const passwordHash = createHash("sha256").update(parameters.password).digest("hex");

        if (user.password !== passwordHash) {
            throw SignInWithUsernameAndPasswordError.INVALID_CREDENTIALS;
        }

        const jwtPayload: jwt.JwtPayload = {
            iss: "https://purpleshoy.co.in",
            sub: user.id,
            username: user.username,
        };

        const token = jwt.sign(jwtPayload, secret, {
            expiresIn: "30d",
        });

        const result: SignUpWithUsernameAndPasswordResponseResult = {
            token,
            user,
        };
        return result;
    

        }