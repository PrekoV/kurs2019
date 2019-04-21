// const api = (method, url, body) => {
//     let token = localStorage.getItem("token")

//     let options = {
//         method: method,
//         headers: {
//             'accept': 'application/json',
//             'Content-Type': 'application/json',
//             'authorization': token
//         },
//         body: JSON.stringify(body)
//     }

//     return fetch(`http://localhost:8080/${url}`, options)
//         .catch = e => {
//             console.log(e)
//         }
// }

// export default api

import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:8080/',
    // onUploadProgress: function (progressEvent) {
    //     if (progressEvent.lengthComputable) {
    //         console.log(progressEvent.loaded + ' ' + progressEvent.total);
    //         //this.updateProgressBarValue(progressEvent);
    //     }
    // },
})

API.interceptors.request.use(function (config) {
    config.headers.common['authorization'] = localStorage.getItem('token')
    return config
}, function (error) {
    return Promise.reject(error)
})

API.interceptors.response.use(function (response) {
    if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('id', response.data.id)
    }
    return response
}, function (error) {
    return Promise.reject(error)
})

export default API