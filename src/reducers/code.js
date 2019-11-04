import { FETCH_CODE, ADD_CODE, DELETE_BADGE, DELETE_CODE, UPDATE_CODE, SEARCH_CODE, ADD_BADGE } from '../actions/types';
import createReducer from '../utils/createReducer';
import xml from '../utils/xml';

const fetchCode = (state, action) => {
    const { code } = action;
    return code;
}

const addCode = (state, action) => {
    const { code } = action;
    let newState = state.slice();
    newState.push(code);
    xml.saveToXML(newState);
    return newState;
}
const deleteCode = (state, action) => {
    const { id } = action;
    let newState = state.slice();
    newState = newState.filter((item, idx) => item.id != id);
    xml.saveToXML(newState);
    return newState;
}
const updateCode = (state, action) => {
    const { id, code } = action;
    let newState = state.slice();
    let idx = -1;
    for (let key in newState) {
        let item = newState[key];
        if (item.id === id) {
            idx = key;
        }
    }
    newState[idx] = { ...code };
    xml.saveToXML(newState);

    return newState;
}
const addBadge = (state, action) => {
    const { id, badge } = action;
    let newState = state.slice();
    newState.forEach((item, idx) => {
        if (item.id === id) {
            const newItem = { ...item };
            newItem.badges.push(badge);
            item = newItem
        }
    });
    xml.saveToXML(newState);

    return newState;
}
const deleteBadge = (state, action) => {
    const { codeId, badge } = action;
    let newState = state.slice();
    newState.forEach((item, idx) => {
        if (item.id === codeId) {
            const newItem = { ...item };
            if (newItem.badges.includes(badge))
                newItem.badges.splice(newItem.badges.indexOf(badge), 1);
            item = newItem
        }
    });
    xml.saveToXML(newState);

    return newState;
}
const code = createReducer([], {
    [FETCH_CODE]: fetchCode,
    [ADD_CODE]: addCode,
    [DELETE_CODE]: deleteCode,
    [UPDATE_CODE]: updateCode,
    [ADD_BADGE]: addBadge,
    [DELETE_BADGE]: deleteBadge
})


export default code;
