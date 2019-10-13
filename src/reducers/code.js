import { ADD_CODE, DELETE_BADGE, DELETE_CODE, UPDATE_CODE, SEARCH_CODE, FETCH_CODE, ADD_BADGE } from '../actions/types';
import createReducer from '../utils/createReducer';
const initValue = [
    {
        "title": "js练手",
        "badges": [
            "react",
            "小程序"
        ],
        "id": 1,
        "text": "\nfunction fun(){\nconst age = 13;return age + 1;}",
        "language": "javascript"
    },
    {
        "title": "C语言模板",
        "badges": [
            "c",
            "算法"
        ],
        "id": 2,
        "text": "#include <stdio.h>int main(){printf(\"hello world\");return 0;}",
        "language": "c"
    },
    {
        "title": "Python输出",
        "badges": [],
        "id": 3,
        "text": "# -*- coding:utf8 -*-print(\"hello world\")",
        "language": "python"
    },
    {
        "title": "Linux",
        "badges": [
            "cli",
            "命令行"
        ],
        "id": 4,
        "text": "mkdir test",
        "language": "shell"
    },
    {
        "title": "PHP建站",
        "badges": [],
        "id": 5,
        "text": "$x = 12;echo $x;",
        "language": "php"
    },
    {
        "title": "html网页编写",
        "badges": [],
        "id": 6,
        "text": "<h1>hello world</h1><p>this is a html test , means noting</p><div>just a joke here!</div>",
        "language": "html"
    }
]

const addCode = (state, action) => {
    const { code } = action;
    let newState = state.slice();
    newState.push(code);
    return newState;
}
const deleteCode = (state, action) => {
    const { id } = action;
    let newState = state.slice();
    newState = newState.filter((item, idx) => item.id != id);
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
    return newState;
}

const fetchCodeSuc = (state, action) => {

    console.log(action);
    return state;
}
const code = createReducer(initValue, {
    [ADD_CODE]: addCode,
    [DELETE_CODE]: deleteCode,
    [UPDATE_CODE]: updateCode,
    [ADD_BADGE]: addBadge,
    [DELETE_BADGE]: deleteBadge,
    [FETCH_CODE + '_SUC']: fetchCodeSuc
})


export default code;
