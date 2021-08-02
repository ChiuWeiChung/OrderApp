
const initialState = {
    showDetail: false,
    currentItem: {
        name: null,
        price: null,
        total: null,
        number: 1,
    },
    cartList: [],
    total: 0,
}

const choose = (state, action) => {
    if (action.event) {
        action.event.stopPropagation();
    }
    const initialState = { ...state };
    let item
    const existedItem = state.cartList.find(el => {
        return el.name === action.item.name
    })
    if (existedItem) {
        item = { ...initialState.currentItem, ...existedItem };
    } else {
        item = { ...initialState.currentItem, ...action.item, number: 1, total: action.item.price };
    }
    return { ...state, currentItem: item, showDetail: true }
}

const change = (state, action) => {
    const initialState = { ...state };
    const item = { ...initialState.currentItem };
    action.add === true ? item.number++ : item.number--;
    item.total = item.number * item.price;
    if (item.number < 1 || item.number > 10) return { ...state }
    return { ...state, currentItem: item };
}

const init = (state) => {
    const oldState = { ...state };
    const item = { ...oldState.currentItem, name: null, price: null, number: 1, total: null };
    return { ...state, currentItem: item, showDetail: false };
}

const add = (state, action) => {
    const list = [...state.cartList];
    const existedIndex = list.findIndex(el => {
        return el.name === action.item.name;
    })
    if (existedIndex >= 0) {
        list[existedIndex] = action.item;
    } else {
        list.push(action.item);
    }
    let total = 0;
    list.forEach(el => total += el.total);
    return { ...init(state), cartList: list, total: total }
}


const remove = (state, action) => {
    const initialState = { ...state };
    const cartList = [...initialState.cartList];
    const changedCartList = cartList.filter(el => {
        return el.name !== action.name
    })
    return { ...state, cartList: changedCartList }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ('CHOOSE_ITEM'):
            return choose(state, action);
        case ('CHANGE_NUMBER'):
            return change(state, action);
        case ('INITIALIZE_ITEM'):
            return init(state);
        case ('PURCHASE_SUCCESS'):
            return { ...init(state), cartList: [] }
        case ('ADD_ITEM'):
            return add(state, action);
        case ('REMOVE_ITEM'):
            return remove(state, action);
        default: return state;
    }
}


export default reducer