import { ADD_CODE, DELETE_BADGE, DELETE_CODE, UPDATE_CODE, SEARCH_CODE, FETCH_CODE, ADD_BADGE } from '../actions/types';
import createReducer from '../utils/createReducer';
import {handleActions} from 'redux-actions'
const initValue = [
]

const addCode = (state, action) => {
    const { code } = action.payload;
    let newState = state.slice();
    newState.push(code);
    return newState;
}
const deleteCode = (state, action) => {

    const { id } = action.payload;
    let newState = state.slice();
    newState = newState.filter((item, idx) => item.id != id);
    return newState;
}
const updateCode = (state, action) => {
    const { id, code } = action.payload;
    let newState = state.slice();
    let idx = -1;
    for (let key in newState) {
        let item = newState[key];
        if (item.id === id) {
            idx = key;
        }
    }
    newState[idx] = { ...code };
    return newState;
}
const addBadge = (state, action) => {
    const { id, badge } = action.payload;
    let newState = state.slice();
    newState.forEach((item, idx) => {
        if (item.id === id) {
            const newItem = { ...item };
            newItem.badges.push(badge);
            item = newItem
        }
    });
    return newState;
}
const deleteBadge = (state, action) => {
    const { codeId, badge } = action.payload;
    let newState = state.slice();
    newState.forEach((item, idx) => {
        if (item.id === codeId) {
            const newItem = { ...item };
            if (newItem.badges.includes(badge))
                newItem.badges.splice(newItem.badges.indexOf(badge), 1);
            item = newItem
        }
    });
    return newState;
}

const fetchCodeSuc = (state, action) => {
    return action.data;
}
const code = handleActions({
    [ADD_CODE]: addCode,
    [DELETE_CODE]: deleteCode,
    [UPDATE_CODE]: updateCode,
    [ADD_BADGE]: addBadge,
    [DELETE_BADGE]: deleteBadge,
    [FETCH_CODE + '_SUC']: fetchCodeSuc
},initValue)


export default code;
