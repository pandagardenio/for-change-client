import { UserType } from "../User";

export interface IAuth {
    token: string;
    userId: string;
    userType: string;
}

export interface IAuthApiResponse {
    token: string;
    userId: string;
    userType: string;
}

export class Auth {
    static createFromResponse(response: IAuthApiResponse): Auth {
        return new Auth(
            response.token,
            response.userId,
            response.userType as UserType
        );
    }

    static deserialize(data: IAuth): Auth {
        return new Auth(
            data.token,
            data.userId,
            data.userType as UserType
        )
    }

    constructor(
        public token: string,
        public userId: string,
        public userType: UserType
    ) {}

    toJSON(): IAuth {
        return {
            token: this.token,
            userId: this.userId,
            userType: this.userType
        }
    }

    isSuperAdmin(): boolean {
        return this.userType === UserType.SUPER_ADMIN;
    }

    isAdmin(): boolean {
        return this.userType === UserType.ADMIN ||
            this.userType === UserType.SUPER_ADMIN;
    }
}