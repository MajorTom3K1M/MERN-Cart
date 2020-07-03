import * as Yup from 'yup';

// Email format
const emailRegex = /^([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

// Amount format
const amountRegex = /^\d+\.\d\d$/;

// Datetime format
// ...

export const newProductSchema = Yup.object().shape({
    productTitle: Yup.string()
        .min(5, "should NOT be shorter than 5 characters")
        .required(),
    productPrice: Yup.string()
        .matches(amountRegex, "Should be a full 2 decimal value. Eg: 10.99")
        .required(),
    productDescription: Yup.string()
        .min(25, "should NOT be shorter than 25 characters")
        .required(),
    productPublished: Yup.boolean()
        .required(),
    productPermalink: Yup.string(),
    productComment: Yup.boolean(),
    productTags: Yup.string(),
    productOptions: Yup.mixed().oneOf([Yup.object(), Yup.string()]),
    productStock: Yup.number(),
    productStockDisable: Yup.boolean()
})