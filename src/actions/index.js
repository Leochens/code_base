import { ADD_CODE, UPDATE_CODE, DELETE_BADGE, DELETE_CODE, ADD_BADGE, UPDATE_TITLE, SEARCH_CODE } from './types';
export const addCode = (code) => {
    return {
        type: ADD_CODE,
        code
    }
}


export const updateCode = (id,code) => {
    return {
        type: UPDATE_CODE,
        id,
        code
    }
}

export const deleteCode = id => {
    return {
        type: DELETE_CODE,
        id
    }
}

export const searchCode = id => {
    return {
        type: SEARCH_CODE,
        id
    }
}

export const addBadge = (id, badge) => {
    return {
        type: ADD_BADGE,
        id,
        badge
    }
}
export const deleteBadge = (codeId, badge) => {
    return {
        type: DELETE_BADGE,
        codeId,
        badge
    }
}

export const updateTitle = (id, title) => {
    return {
        type: UPDATE_TITLE,
        id,
        title
    }
}


// {
//     type: 'UPDATE_CODE',
//     id:1,
//     code:{
//     id:1,
//     text:'hhhh',
//     title:'lalala',
//     language:'c',
//     badges:[]
//     }
//     }