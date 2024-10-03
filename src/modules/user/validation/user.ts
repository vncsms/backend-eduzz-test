import * as yup from 'yup';

export const createUserValidation = yup.object().shape({
    nome: yup.string().required().min(1),
    email: yup.string().required().min(1),
    password: yup.string().required().min(1)
})