import * as yup from 'yup';

export const createCryptoTransactionValidation = yup.object().shape({
    quantity: yup.number().required().min(0),
})

export const sellCryptoTransactionValidation = yup.object().shape({
    quantity: yup.number().required().min(0),
})