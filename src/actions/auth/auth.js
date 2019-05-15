import { AUTH_SUCCESS, AUTH_FAILED, LOGOUT, GET } from '../../constants'
import API from '../../services/api'

const authSuccessAction = (payload) => {
    return {
        type: AUTH_SUCCESS,
        auth: true,
        name: payload.login,
        token: payload.token,
        img: payload.img
    }
}

const authFailedAction = (message) => {
    return {
        type: AUTH_FAILED,
        auth: false,
        token: null,
        message
    }
}

const logoutAction = () => {
    return {
        type: LOGOUT,
        auth: false,
        token: null
    }
}

export const login = (l, password) => {
    return dispatch => {
        console.log(login, password)
        return API.post("admin/login", { login: l, password }).then(res => {
              dispatch(authSuccessAction(res.data)) 
                // break
                // case 500: () => {
                //     localStorage.clear()
                //      dispatch(authFailedAction(res.data.message))
                // }
                // case 404: () => {
                //     localStorage.clear()
                //      dispatch(authFailedAction(res.data.message))
                // }
                // default:  dispatch(authFailedAction("There is some problems with server..."))
            
        }).catch ( e => {
            localStorage.clear()
            dispatch(authFailedAction(e.message))
        })
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.clear()
        return dispatch(logoutAction())
    }
}

export const registered = () => {
    return dispatch => {
        API.get('admin/' + localStorage.getItem("id")).then(res => {
            // switch (res.status) {
              dispatch(authSuccessAction(res.data))
                // case 500: () => {
                //     localStorage.clear()
                //     return dispatch(authFailedAction(res.data.message))
                // }
                // case 404: () => {
                //     localStorage.clear()
                //     return dispatch(authFailedAction(res.data.message))
                // }
                // default: return dispatch(authFailedAction("There is some problems with server..."))
            //}
        }).catch(e => {
            dispatch(authFailedAction(e.message))
        })
    }
}