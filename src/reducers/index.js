import { combineReducers } from 'redux'
import { getProductsReducer } from './getProductsReducer'
import { getMediasReducer } from './getMediaReducer'
import { getToursReducer } from './getToursReducer'
import { getNewsReducer } from './getNewsReducer'
import { authReducer } from './authReducer'


export default combineReducers({
    getProductsReducer,
    getToursReducer,
    getMediasReducer,
    getNewsReducer,
    authReducer
})