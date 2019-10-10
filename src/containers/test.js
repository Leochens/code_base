import React, { Component } from 'react';
import Highlight from 'react-highlight';
import '../../node_modules/highlight.js/styles/github.css'


export default class Test extends Component {
    state = {
        text: ``
    }
    onChange = (e) => {
        const text = e.target.value;
        this.setState({
            text
        })
    }
    onKeyDown = (e) => {
        const { text } = this.state;
        console.log(e.key);
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
        return <div>
            <textarea cols="100" rows="20" onChange={this.onChange} onKeyDown={this.onKeyDown} value={this.state.text}></textarea>
            <Highlight className="javascript">
                {this.state.text}
            </Highlight>
        </div>
    }
}