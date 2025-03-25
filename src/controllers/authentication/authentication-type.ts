import type { User } from "@prisma/client"

export enum SignupError {
    CONFLICTING_USERNAME = "CONFLICTING_USERNAME",
    UNKNOWN = "UNKNOWN",
}
export type SignUpWithUsernameAndPasswordResponseResult = {
    token: string;
    user: User;
}
export type loginWithUserNameAndPAsswordResult =
{
  token: string;
  user: User
}


export enum SignInWithUsernameAndPasswordError {
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  UNKNOWN = "UNKNOWN",
} 

