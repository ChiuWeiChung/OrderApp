import axios from 'axios';
import { apiKey } from '../../hoc/apiKey';


export const setAuthRedirect = (path) => {
    return {
        type: 'SET_AUTH_REDIRECT',
        path
    }
}

export const authSuccess = (method, idToken, userId, email) => {
    return {
        type: 'AUTH_SUCCESS',
        method,
        idToken,
        userId,
        email
    }
}

export const authFail = (error) => {
    return {
        type: 'ERROR_FIREBASE',
        error: error
    }
}


export const logout = () => {
    return (dispatch, getState) => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('method');
        if (getState().auth.type === 'GOOGLE') window.gapi.auth2.getAuthInstance().signOut();
        dispatch({ type: 'LOGOUT' });
    }
}

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

const saveLocalStorage = (method, expirationDate, token, userId, userName) => {
    localStorage.setItem('expirationDate', expirationDate + new Date().getTime());
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName)
    localStorage.setItem('userId', userId);
    localStorage.setItem('method', method)
}

const axiosPromise = (url, obj) => {
    return axios.post(url, obj).then(res => {
        return res.data
    }).catch(err => {
        return err.response.data.error
    })
}

const showSpinner = () => {
    return { type: 'START_AUTH' }
}

const closeSpinner = () => {
    return { type: 'LOADING_FINISH' }
}


export const sign = (method, email, password, forSignIn) => {
    return async (dispatch, getState) => {
        let profile = {};
        if (method === 'GOOGLE') {
            // ======Google Login Method======
            let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${apiKey}`;
            const res = await window.gapi.auth2.getAuthInstance().signIn();
            const obj = {
                requestUri: "http://localhost",
                postBody: `id_token=${res.getAuthResponse().id_token}&providerId=google.com`,
                returnIdpCredential: true,
                returnSecureToken: true,
            };
            const authResponse = await axios.post(url, obj);
            profile.expiresIn = authResponse.data.expiresIn * 1000;
            profile.userId = authResponse.data.localId;
            profile.userName = authResponse.data.firstName;
            profile.token = authResponse.data.idToken;
        } else {
            // ======Firebase Login & SignUp Method======
            dispatch(showSpinner());
            const obj = { email, password, returnSecureToken: true };
            let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
            if (!forSignIn) url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
            const res = await axiosPromise(url, obj);
            dispatch(closeSpinner());
            if (res.errors) return dispatch(authFail(res.message))
            profile.expiresIn = res.expiresIn * 1000;
            profile.userId = res.localId;
            profile.userName = res.email;
            profile.token = res.idToken;
        }
        saveLocalStorage(method, profile.expiresIn, profile.token, profile.userId, profile.userName);
        dispatch(checkAuthTimeout(profile.expiresIn / 1000));
        dispatch(authSuccess(method, profile.token, profile.userId, profile.userName))

    }
}


export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');

        if (!token) return dispatch(logout());
        const expirationDate = new Date(parseInt(localStorage.getItem('expirationDate')));
        if (expirationDate < new Date()) return dispatch(logout())

        const userId = localStorage.getItem('userId');
        const userName = localStorage.getItem('userName');
        const method = localStorage.getItem('method');
        dispatch(authSuccess(method, token, userId, userName));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));


    }
}


