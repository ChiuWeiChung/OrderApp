// import * as actionTypes from './actionTypes';


export const choose = (item, event=null) => {
    return {
        type: 'CHOOSE_ITEM',
        item,
        event
    }
}

export const changeNumber = (isAdd) => {
    return {
        type: 'CHANGE_NUMBER',
        add: isAdd,
    }
}

export const cancelButton = () => {
    return {
        type: 'INITIALIZE_ITEM'
    }
}

export const addItem = (item) => {
    return {
        type: 'ADD_ITEM',
        item
    }
}

export const removeItem = (name)=>{
    return {
        type:'REMOVE_ITEM',
        name
    }
}