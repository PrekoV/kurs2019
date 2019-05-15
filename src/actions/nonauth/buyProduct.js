// import API from '../../services/api'
// import { BUY_PRODUCT_SUCCESS,BUY_PRODUCT_FAILED } from '../../constants'

// const buyProductSuccess = () => {
//     // console.log(payload)
//     return {
//         type: BUY_PRODUCT_SUCCESS,
        
//     }
// }

// const buyProductFailed = (err) => {
//     return {
//         type: BUY_PRODUCT_FAILED,
//         err
//     }
// }

// export const buyProduct = (purchases) => {
//     return (dispatch) => {
//         API.post('purchases/send', purchases).then(res => {
//             // console.log(res.data)
//             return dispatch(buyProductSuccess())
//         }).catch( e => {
//             return dispatch(buyProductFailed(e.message))
//         })
//     }
// }

// // export const getOneMedia = (id) => {
// //     return (dispatch) => {
// //         API.get('media/' + id).then(res => {
// //             return dispatch(getOneMediaAction(res.data))
// //         })
// //     }
// // }