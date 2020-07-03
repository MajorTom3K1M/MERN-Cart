import axios from 'axios';
import { adminProductAPI } from '../services/utils';
import { slugify } from '../util/common'

export const productService = {
    insertProduct,
    getProduct,
    getPaginationData
}

function insertProduct(productPermalink, productTitle,
    productPrice, productDescription,
    productPublished, productTags,
    productOptions, productComment,
    productSubscription,
    productStock = null, productStockDisable = false) {

    if(productPermalink === '' && productTitle !== '') {
        productPermalink = slugify(productTitle) 
    }

    const requestOption = {
        method: 'POST',
        url: adminProductAPI + '/insert',
        data: {
            productPermalink,
            productTitle,
            productPrice,
            productDescription,
            productPublished,
            productTags,
            productOptions,
            productComment,
            productSubscription,
            productStock,
            productStockDisable
        }
    }
    return axios(requestOption)
        .then((res) => {
            const { data: { productId, message } } = res;
            return productId;
        })
}

function getProduct(productId) {
    const requestOption = {
        method: 'POST',
        url: adminProductAPI + '/edit',
        data: {
            id: productId
        }
    }
    return axios(requestOption)
        .then((res) => {
            const { data: product } = res;
            return product;
        })
}

function getPaginationData(pageNum = 1) {
    const requestOption = {
        method: 'GET',
        url: adminProductAPI + `/${pageNum}`,
    }
    return axios(requestOption)
        .then((res) => {
            const { data } = res;
            return data;
        });
}