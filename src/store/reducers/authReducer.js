const initialState = {
    type: null,
    token: null,
    userId: null,
    userName: null,
    getAuth:null,
    authRedirect: '/',
    loading: false,
    error: null
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ('GETAUTH'):
            return { ...state, getAuth: action.auth }
        case ('START_AUTH'):
            return { ...state, loading: true }
        case ('AUTH_SUCCESS'):
            return { ...state, type: action.method, token: action.idToken, userId: action.userId, userName: action.email, error: null }
        case ('SET_AUTH_REDIRECT'):
            return { ...state, authRedirect: action.path }
        case ('LOGOUT'):
            return { ...state, type: null, token: null, userId: null, userName: null }
        case ('ERROR_FIREBASE'):
            return { ...state, error: action.error }
        case ('LOADING_FINISH'):
            return { ...state, loading: false }
        default:
            return state
    }
}

export default reducer;