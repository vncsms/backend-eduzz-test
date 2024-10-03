import UserModel from "./model/model";

interface UserSerializer {
    nome: string
    password: string
    email: string
}

interface AuthenticationSerializer {
    token: string
}

export function userSerializer(user: UserModel): UserSerializer {
    const serializer: UserSerializer = {
        nome: user.nome,
        email: user.email,
        password: user.password,
    }

    return serializer;
}

export function authSerializer(token: string): AuthenticationSerializer {
    const serializer: AuthenticationSerializer = {
        token: token,
    }

    return serializer;
}