import React, { Component } from 'react';
import Highlight from 'react-highlight';
import '../../../node_modules/highlight.js/styles/github.css'
import './BigInput.scss';
/* 
代码输入组件
功能：
    1. 显示代码
    2. 编辑代码
    3. 将用户输入的代码存起来

*/

export default class BigInput extends Component {
    static defaultProps = {
        language: 'html',
        text: '',
        onlyShow: false,
        onGetText: (text) => { console.log(text) }
    }
    state = {
        text: '',
        isEdit: false
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            text: nextProps.text
        })
    }
    componentDidMount() {
        console.log(this.props);
        this.setState({
            text: this.props.text
        })
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
    handleGetText = () => {
        const { onGetText } = this.props;
        const { text } = this.state;
        onGetText && onGetText(text);
    }

    render() {
        return (
            <div className="inp">
                <label htmlFor="hl" >
                    <Highlight className={this.props.language + " hl"}>
                        {this.state.text}
                    </Highlight>
                </label>
                <div hidden={this.props.onlyShow}>
                    <textarea
                        id="hl"
                        className={this.state.isEdit ? 'open' : 'close'}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown}
                        value={this.state.text}>
                    </textarea>
                    <button className="inp-button" onClick={this.toggleEdit} >{this.state.isEdit ? '完成' : '编辑'}</button>
                    <button className="inp-button" onClick={this.handleGetText}>保存</button>
                </div>

            </div>
        )

    }
}