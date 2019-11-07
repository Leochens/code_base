import React, { Component } from 'react';
import Highlight from 'react-highlight';
import { Col, Row, Input } from 'antd';
import '../../../node_modules/highlight.js/styles/github.css'
import './BigInput.scss';
const { TextArea } = Input;
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
        type: '横排',
        onGetText: (text) => { console.log(text) }
    }
    state = {
        text: '',
        isEdit: false
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            text: nextProps.text,
            language: nextProps.language
        })
    }

    componentDidMount() {
        console.log(this.props);
        this.setState({
            text: this.props.text,
            language: this.props.language
        })
    }
    toggleEdit = () => {
        const { isEdit } = this.state;
        this.setState({
            isEdit: !isEdit
        })
        if (isEdit) {
            this.handleGetText();
        }

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
        const { onGetText, id } = this.props;
        const { text } = this.state;
        onGetText && onGetText(text, id);
    }

    render() {
        const { type, onlyShow } = this.props
        const { isEdit, language } = this.state;
        console.log(language);
        return (
            type === '竖排' ?
                <Row>
                    <label htmlFor="hl" onDoubleClick={this.toggleEdit}>
                        {isEdit ?
                            <Col span={12}>
                                <div>
                                    <TextArea
                                        id="hl"
                                        style={{
                                            border: '1px solid transparent',
                                            borderRadius: 6,
                                            outline: "none",
                                            padding: 4
                                        }}
                                        autoSize={{ minRows: 1 }}
                                        className={this.state.isEdit ? 'open' : 'close'}
                                        onChange={this.onChange}
                                        onKeyDown={this.onKeyDown}
                                        value={this.state.text}>
                                    </TextArea>
                                </div>
                            </Col> :
                            <div></div>
                        }
                        <Col span={isEdit ? 12 : 24}>
                            <Highlight className={language + " hl"}>
                                {this.state.text ? this.state.text : "当前无代码，请双击添加"}
                            </Highlight>
                        </Col>
                    </label>
                </Row>
                : <div className="inp">
                    <label htmlFor="hl" onDoubleClick={this.toggleEdit} >
                        <Highlight className={language + " hl"}>
                            {this.state.text}
                        </Highlight>
                    </label>
                    <div hidden={this.props.onlyShow}>
                        <textarea
                            id="hl"
                            style={{
                                border: '1px solid transparent',
                                borderRadius: 6,
                                outline: "none",
                                padding: 4
                            }}
                            className={this.state.isEdit ? 'open' : 'close'}
                            onChange={this.onChange}
                            onKeyDown={this.onKeyDown}
                            value={this.state.text}>
                        </textarea>
                    </div>
                </div>
        )

    }
}