import { ADD_CODE } from '../actions/types';
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
            console.log("hello add")
            return state;
        }
        default:
            return state;

    }
}
export default test;
