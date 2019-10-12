import React, { Component } from 'react';
import BigInput from '../../components/BigInput/BigInput';
import SideBar from '../../components/SideBar/SideBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCode, updateCode, deleteCode, deleteBadge, addBadge } from '../../actions/index';
import './Main.scss';

class Main extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            codes: props.codes,
            curCodeId: props.codes[0].id,
            curCode: props.codes[0]
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            codes: nextProps.codes
        })
    }
    handleAddCode = (text) => {
        const { addCode } = this.props;
        addCode && addCode(text);
    }
    renderCodeList = () => {
        const { codes } = this.state;
        console.log(codes);
        return codes.map((item, idx) => {
            return <BigInput onlyShow={true} key={idx} id={item.id} language={item.language} text={item.text} ></BigInput>
        })
    }
    handleSelectCode = id => {
        const { codes } = this.state;
        const code = codes.filter((item, idx) => item.id === id).pop();

        this.setState({
            curCodeId: id,
            curCode: code
        })
    }
    handleGetText = (text) => {
        const { updateCode } = this.props;
        const { curCode, curCodeId } = this.state;
        if (!curCode) return;
        curCode.text = text;
        updateCode && updateCode(curCodeId, curCode)
    }
    handleDeleteCode = () => {
        const { curCodeId } = this.state;
        const { deleteCode } = this.props;
        console.log(curCodeId, deleteCode);
        deleteCode && deleteCode(curCodeId);
        this.setState({
            curCodeId: -1,
            curCode: {}
        })
    }
    finishInput = (e) => {
        console.log(e.currentTarget.innerHTML);
        const title = e.currentTarget.innerHTML;
        const { curCode, curCodeId } = this.state;
        if (!curCode) return;

        curCode.title = title;
        updateCode && updateCode(curCodeId, curCode)
    }
    renderCurCode = () => {
        const { curCodeId } = this.state;
        const { codes } = this.state;
        console.log(codes)
        const code = codes.filter((item, idx) => {
            return item.id === curCodeId
        }).pop();
        if (!code) return '';
        console.log(code.text);
        return (
            <BigInput
                onGetText={this.handleGetText}
                id={code.id}
                language={code.language}
                text={code.text} ></BigInput>
        )

    }
    handleAddCode = () => {
        console.log('add');
    }
    render() {
        return (
            <div className="main">

                <div className="side-bar">
                    <SideBar codeList={this.state.codes} onSelectCode={this.handleSelectCode}>
                        <div className="options">
                            <button className="btn" onClick={this.handleAddCode}>添加代码</button>
                        </div>
                    </SideBar>
                </div>
                <header className="code-page">
                    <div hidden={this.state.curCodeId === -1}>
                        <div
                            onBlur={this.finishInput}
                            suppressContentEditableWarning
                            contentEditable={true} className="code-title">{this.state.curCode.title}</div>
                        {this.renderCurCode()}
                        <button className="del-btn" onClick={this.handleDeleteCode} >删除本片段</button>
                    </div>
                </header>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        codes: state.code
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addCode: bindActionCreators(addCode, dispatch),
        updateCode: bindActionCreators(updateCode, dispatch),
        deleteCode: bindActionCreators(deleteCode, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);