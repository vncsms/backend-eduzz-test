import * as yup from 'yup';

export const createUserValidation = yup.object().shape({
    nome: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(5)
})

export const loginUserValidation = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(5)
})