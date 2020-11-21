import { UserType } from "../models/User";

export interface IRegisterDto {
    name: string;
    surname: string;
    speciality?: string;
    license: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
    privacy: boolean;
    userType: UserType;
}

export class RegisterDto {
    public userType: UserType = UserType.REGULAR;

    static deserialize(data: IRegisterDto): RegisterDto {
        return new RegisterDto(
            data.name,
            data.surname,
            data.license,
            data.email,
            data.phone,
            data.password,
            data.confirmPassword,
            data.terms,
            data.privacy
        );
    }

    constructor(
        public name: string,
        public surname: string,
        public license: string,
        public email: string,
        public phone: string,
        public password: string,
        public confirmPassword: string,
        public terms: boolean,
        public privacy: boolean
    ) {}

    toJSON(): IRegisterDto {
        return {
            name: this.name,
            surname: this.surname,
            license: this.license,
            email: this.email,
            phone: this.phone,
            password: this.password,
            confirmPassword: this.confirmPassword,
            terms: this.terms,
            privacy: this.privacy,
            userType: this.userType
        };
    }
}