const initialState = {
    menuList: [],
    order: [],
    error: null,
    purchase: false,
    showModal: false,
    showSpinner: false,
    showNavbar: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // ========FETCH MENU========
        case ('FETCH_MENU_START'):
            return { ...state, showSpinner: true };
        case ('FETCH_MENU_SUCCESS'):
            return { ...state, menuList: action.menuList, showSpinner: false };
        case ('FETCH_MENU_FAIL'):
            return { ...state, error: action.err, showModal: true, showSpinner: false };
        // ========PURCHASE ORDERS========
        case ('PURCHASE_START'):
            return { ...state, showSpinner: true };
        case ('PURCHASE_SUCCESS'):
            return { ...state, showSpinner: false, purchase: true }
        // ========FETCH ORDERS========
        case ('FETCH_ORDERS_START'):
            return { ...state, showSpinner: true }
        case ('FETCH_ORDERS_SUCCESS'):
            return { ...state, order: action.order, showSpinner: false }
        case ('FETCH_ORDERS_FAIL'):
            return { ...state, error: action.err, showSpinner: false }
        // ========OTHER FUNCTION========
        case ('TOGGLE_NAV'):
            return { ...state, showNavbar: !state.showNavbar }
        case ('INIT_SPINNER'):
            return { ...state, purchase: false, showSpinner: false, error: false, showNavbar: false }
        case ('MODAL_CLOSE'):
            return { ...state, showModal: false }
        default:
            return state
    }
}

export default reducer