import { ADD_CODE, DELETE_BADGE, DELETE_CODE, UPDATE_CODE, UPDATE_TITLE, SEARCH_CODE, ADD_BADGE } from '../actions/types';
const initValue = [
    {
        title: 'js练手',
        badges: ['react', '小程序'],
        id: 1,
        text: `
        function fun(){
            const age = 13;
            return age + 1;
        }
        `,
        language: 'javascript'
    },
    {
        title: 'C语言模板',
        badges: ['c', '算法'],
        id: 2,
        text: `
        #include <stdio.h>
        int main(){
            printf("hello world");
            return 0;
        }
        `,
        language: 'c'
    },
    {
        title: 'Python输出',
        badges: [],
        id: 3,
        text: `
        # -*- coding:utf8 -*-
        print('hello world')
        `,
        language: 'python'
    },
    {
        title: 'Linux',
        badges: ['cli', '命令行'],
        id: 4,
        text: `
        mkdir test
        cd test
        touch tt.txt
        echo 'hello world' > tt.txt
        cat tt.txt
        `,
        language: 'shell'
    },
    {
        title: 'PHP建站',
        badges: [],
        id: 5,
        text: `
        $x = 12;
        echo $x;
        `,
        language: 'php'
    },
    {
        title: 'html网页编写',
        badges: [],
        id: 6,
        text: `
            <h1>hello world</h1>
            <p>this is a html test , means noting</p>
            <div>just a joke here!</div>
        `,
        language: 'html'
    }
]
const test = (state = initValue, action) => {
    const { type } = action;
    switch (type) {
        case ADD_CODE: {
            const { code } = action;
            let newState = state.slice();
            newState.push(code);

            return newState;
        }
        case DELETE_CODE: {
            const { id } = action;
            let newState = state.slice();
            newState = newState.filter((item, idx) => item.id != id);
            return newState;
        }
        case UPDATE_CODE: {
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
        case ADD_BADGE: {
            const { id, badge } = action;
            let newState = state.slice();
            newState.forEach((item, idx) => {
                if (item.id === id) {
                    const newItem = { ...item };
                    newItem.badges = [...newItem.badges, badge]
                    item = newItem
                }
            });
            return newState;
        }
        case DELETE_BADGE: {
            const { codeId, badge } = action;
            let newState = state.slice();
            newState.forEach((item, idx) => {
                if (item.id === codeId) {
                    const newItem = { ...item };
                    const badges = [...newItem.badges];
                    if (badges.includes(badge)) {
                        badges.splice(badges.indexOf(badge), 1);
                        newItem.badges = badges;
                    }
                    item = newItem
                }
            });
            return newState;
        }
        case UPDATE_TITLE: {
            const { id, title } = action;
            let newState = state.slice();
            newState.forEach((item, idx) => {
                if (item.id === id) {
                    item = {
                        ...item,
                        title
                    }
                }
            });
            return newState;

        }
        default:
            return state;

    }
}
export default test;
