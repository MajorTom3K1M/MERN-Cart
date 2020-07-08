import { 
    PRODUCT_INSESRT_REQUEST, 
    PRODUCT_REQUEST,
    PRODUCT_PAGINATION_REQUEST 
} from './actionTypes';

const initialState = {

}

export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCT_INSESRT_REQUEST:
            return {
                ...state,
                productId: action.productId
            };
        case PRODUCT_REQUEST:
            return {
                ...state,
                product: action.product
            };
        case PRODUCT_PAGINATION_REQUEST:
            return {
                ...state,
                paginationData: action.paginationData
            };
        default:
            return state;
    }
}