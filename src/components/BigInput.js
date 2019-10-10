import React, { Component } from 'react';
import Highlight from 'react-highlight';
import '../../node_modules/highlight.js/styles/github.css'
import './BigInput.scss';
/* 
代码输入组件
功能：
    1. 将用户输入的代码存起来
    2. 可以选择语言
    3. 


*/

export default class BigInput extends Component {
    state = {
        text: '',
        isEdit: false
    }
    static defaultProps = {
        language: 'html'
    }
    constructor(props) {
        super(props);
    }
    toggleEdit = () => {
        const { isEdit } = this.state;
        this.setState({
            isEdit: !isEdit
        })
    }

    onChange = (e) => {
        const text = e.target.value;
        this.setState({
            text
        })
    }
    onKeyDown = (e) => {
        const { text } = this.state;
        if (e.key === 'Tab') {
            const start = e.target.selectionStart;
            const _text = text.slice(0, start) + '    ' + text.slice(start);
            e.preventDefault();
            e.target.blur();
            this.setState({
                text: _text
            });
            const target = e.target;
            setTimeout(function () {
                target.focus();
                target.selectionStart = start + 4;
                target.selectionEnd = start + 4;
            })
        }
    }
    render() {
        return (
            <div>
                <Highlight className={this.props.language}>
                    {this.state.text}
                </Highlight>
                <textarea
                    hidden={!this.state.isEdit}
                    className="textarea text-bold text-lg"
                    cols="50"
                    rows="3"
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    value={this.state.text}>
                </textarea>

                <button className="inp-button" onClick={this.toggleEdit} >{this.isEdit ? '完成' : '编辑'}</button>
            </div>
        )

    }
}