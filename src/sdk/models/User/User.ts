export enum UserType {
    ADMIN = 'admin',
    REGULAR = 'regular',
    SUPER_ADMIN = 'super_admin'
}

export interface IUserApiResponse {
    createdAt: string;
    email: string;
    id: string;
    type: UserType;
    updatedAt: string;
    username: string;
}

export class User {
    static createFromResponse(response: IUserApiResponse): User {
        return new User(
            new Date(response.createdAt),
            response.email,
            response.id,
            response.type,
            new Date(response.updatedAt),
            response.username
        );
    }

    constructor(
        public createdAt: Date,
        public email: string,
        public id: string,
        public type: UserType,
        public updatedAt: Date,
        public username: string
    ) {}
}