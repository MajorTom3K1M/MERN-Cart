import axios from 'axios';
import { adminProductAPI, productAPI } from '../../services/utils';
import { slugify } from '../common'

export const productService = {
    insertProduct,
    deleteImage,
    getProduct,
    getPaginationData,
    updatePublishedState,
    deleteProduct,
    updateProduct,
    setAsMainImage,
    getIndividualProduct
}

function insertProduct(productPermalink, productTitle,
    productPrice, productDescription,
    productPublished, productTags,
    productOptions, productComment,
    productSubscription,
    productStock = null, productStockDisable = false) {

    if (productPermalink === '' && productTitle !== '') {
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
        }).catch(handleError);
}

function updateProduct(productId, productPermalink, productTitle,
    productPrice, productDescription,
    productPublished, productTags,
    productOptions, productComment,
    productSubscription,
    productStock = null, productStockDisable = false) {
    const requestOption = {
        method: 'POST',
        url: adminProductAPI + '/update',
        data: {
            productId,
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
            const { data: { product } } = res;
            return product
        }).catch(handleError);
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
        .then(handleResponse).catch(handleError);
}

function getPaginationData(pageNum = 1) {
    const requestOption = {
        method: 'GET',
        url: adminProductAPI + `/${pageNum}`,
    }
    return axios(requestOption)
        .then(handleResponse).catch(handleError);
}

function updatePublishedState(productId, state) {
    const requestOption = {
        method: 'POST',
        url: adminProductAPI + '/publishedState',
        data: {
            id: productId,
            state
        }
    }
    return axios(requestOption)
        .then(handleResponse).catch(handleError);
}

function deleteProduct(productId) {
    const requestOption = {
        method: 'POST',
        url: adminProductAPI + '/delete',
        data: {
            productId
        }
    }
    return axios(requestOption)
        .then((res) => {
            const { message } = res.data;
            return message;
        }).catch(handleError);
}

function setAsMainImage(productId, productImage) {
    const requestOption = {
        method: 'POST',
        url: `${adminProductAPI}/setasmainimage`,
        data: {
            productId,
            productImage
        }
    }
    return axios(requestOption)
        .then(handleResponse).catch(handleError);
}

function deleteImage(productId, productImage) {
    const requestOption = {
        method: 'POST',
        url: `${adminProductAPI}/deleteimage`,
        data: {
            productId,
            productImage
        }
    }
    return axios(requestOption)
        .then(handleResponse).catch(handleError);
}

function getIndividualProduct(productId) {
    const requestOpion = {
        method: 'POST',
        url: `${productAPI}`,
        data: {
            id: productId
        }
    }
    return axios(requestOpion)
        .then(handleResponse).catch(handleError)
}

function handleResponse(response) {
    const { data } = response;
    return data;
}

function handleError(error) {
    const { data } = error.response;
    const err = (data && data.message) || error.response.statusText;
    throw err;
}