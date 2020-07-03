import axios from 'axios';
import { productService } from '../../util/product.service';
import { 
    PRODUCT_INSESRT_REQUEST, 
    PRODUCT_REQUEST,
    PRODUCT_PAGINATION_REQUEST 
} from './actionTypes';

export const productInsert = (productPermalink, productTitle,
    productPrice, productDescription,
    productPublished, productTags,
    productOptions, productComment, productSubscription,
    productStock = null, productStockDisable = false, callback) => {

    return dispatch => {
        productService.insertProduct(productPermalink, productTitle,
            productPrice, productDescription,
            productPublished, productTags,
            productOptions, productComment,
            productSubscription,
            productStock, productStockDisable)
            .then(
                productId => {
                    dispatch(request(productId))
                    if(callback) callback(productId);
                }
            )
    }
    function request(productId) { return { type: PRODUCT_INSESRT_REQUEST, productId } }
}

export const getProduct = (productId, callback) => {
    return dispatch => (
        productService.getProduct(productId)
            .then(
                product => {
                    dispatch(request(product));
                    if(callback) callback(product);
                }
            )
    )
    function request(product) { return { type: PRODUCT_REQUEST, product } }
}

export const getPaginationData = (pageNum, callback) => {
    return dispatch => (
        productService.getPaginationData(pageNum)
            .then(
                data => {
                    dispatch(request(data));
                    if(callback) callback(data);
                }
            )
    )
    function request(paginationData) { return { type: PRODUCT_PAGINATION_REQUEST, paginationData } }
}