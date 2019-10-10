import React, { Component } from 'react';
import Highlight from 'react-highlight';
import '../../node_modules/highlight.js/styles/github.css'


export default class BigInput extends Component {
    state = {
        text: ``
    }
    static defaultProps = {
        language: 'html'
    }
    constructor(props) {
        super(props);
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
                <textarea
                    className="text-bold text-lg"
                    cols="50"
                    rows="3"
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    value={this.state.text}>
                </textarea>
                <Highlight className={this.props.language}>
                    {this.state.text}
                </Highlight>
            </div>
        )

    }
}