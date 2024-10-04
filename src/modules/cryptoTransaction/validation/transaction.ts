import * as yup from 'yup';

export const createCryptoTransactionValidation = yup.object().shape({
    quantity: yup.number().required().min(0),
    transactionType: yup.number().required().oneOf([1,2]),
})