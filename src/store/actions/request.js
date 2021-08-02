import axios from '../../hoc/axios';

export const fetchMenu = () => {
    return (dispatch) => {
        dispatch({ type: 'FETCH_MENU_START' })
        axios.get('menu.json').then((res) => {
            const arr = [];
            for (let key in res.data) {
                arr.push({ ...res.data[key], id: key })
            }
            arr.sort((a, b) => {
                return b.type.length - a.type.length
            })
            dispatch({ type: 'FETCH_MENU_SUCCESS', menuList: arr })
        }).catch(err => {
            dispatch({ type: 'FETCH_MENU_FAIL', err: err.message })
        })
    }
}

export const fetchOrders = (token, userId) => {
    return (dispatch) => {
        dispatch({ type: 'FETCH_ORDERS_START' })
        axios.get(`orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`).then(res => {
            const arr = []
            for (let key in res.data) {
                arr.push({ data: res.data[key], id: key })
            }
            if (!arr.length) throw new Error('無下單紀錄')
            dispatch({ type: 'FETCH_ORDERS_SUCCESS', order: arr })
        }).catch(err => {
            dispatch({ type: 'FETCH_ORDERS_FAIL', err: err.message })
        })
    }
}

export const purchaseOrders = (token, userId, data) => {
    return (dispatch) => {
        dispatch({ type: 'PURCHASE_START' });
        axios.post(`/orders.json?auth=${token}`, data).then(() => {
            dispatch({ type: 'PURCHASE_SUCCESS' })
        }).then(() => {
            fetchOrders(token, userId)
        }).catch(err => {
            console.log(err.response.data)
        })
    }
}
