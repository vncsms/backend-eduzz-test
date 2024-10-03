import UserModel from "./model/model";

interface UserSerializer {
    nome: string
    password: string
    email: string
}

export function userSerializer(user: UserModel): UserSerializer {
    const serializer: UserSerializer = {
        nome: user.nome,
        email: user.email,
        password: user.password,
    }

    return serializer;
}