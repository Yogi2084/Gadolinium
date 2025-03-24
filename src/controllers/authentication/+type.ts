import type { User } from "@prisma/client"

export enum SignupError {
    CONFLICTING_USERNAME = "CONFLICTING_USERNAME",
    UNKNOWN = "UNKNOWN",
}
export type SignUpWithUsernameAndPasswordResponseResult = {
    token: string;
    user: User;
}