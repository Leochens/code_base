import React, { Component } from 'react';
import BigInput from '../../components/BigInput/BigInput';
import SideBar from '../../components/SideBar/SideBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCode, updateCode, deleteCode, deleteBadge, addBadge, fetchCode } from '../../actions/index';
import xml from '../../utils/xml';
import './Main.scss';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false
        }
    }
    componentDidMount() {
        // 获取codes
        const { fetchCode } = this.props;
        const that = this;
        xml.loadXML().then(res => {
            console.log(res);
            fetchCode(res);
            that.setState({
                ready: true,
                codes: res,
                curCodeId: res[0].id,
                curCode: res[0]
            })
        }).catch(e => {
            console.log(e);
        });
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
            return <BigInput onlyShow={true} key={idx} id={item.id} language={item.language} text={item.text[0]} ></BigInput>
        })
    }
    handleSelectCode = id => {
        const { codes } = this.state;
        const code = codes.filter((item, idx) => item.id == id).pop();

        this.setState({
            curCodeId: id,
            curCode: code
        })
    }
    handleGetText = (text) => {
        const { updateCode } = this.props;
        const { curCode, curCodeId } = this.state;
        if (!curCode) return;
        curCode.text[0] = text;
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

        curCode.title[0] = title;
        updateCode && updateCode(curCodeId, curCode)
    }
    renderCurCode = () => {
        const { curCodeId } = this.state;
        const { codes } = this.state;
        console.log(codes)
        const code = codes.filter((item, idx) => {
            return item.id[0] == curCodeId
        }).pop();
        if (!code) return '';
        console.log(code.text[0]);
        return (
            <BigInput
                onGetText={this.handleGetText}
                id={code.id[0]}
                language={code.language[0]}
                text={code.text[0]} ></BigInput>
        )

    }
    handleAddCode = () => {
        console.log('add');
    }
    render() {
        const { ready } = this.state;
        return (
            this.state.ready ?
                <div className="main" >
                    <div className="side-bar">
                        <SideBar codeList={this.state.codes} onSelectCode={this.handleSelectCode}>
                            <div className="options">
                                <button className="btn" onClick={this.handleAddCode}>添加代码</button>
                            </div>
                        </SideBar>
                    </div>
                    <header className="code-page">
                        <div hidden={this.state.curCodeId == -1}>
                            <div
                                onBlur={this.finishInput}
                                suppressContentEditableWarning
                                contentEditable={true} className="code-title">{this.state.curCode.title}</div>
                            {this.renderCurCode()}
                            <button className="del-btn" onClick={this.handleDeleteCode} >删除本片段</button>
                        </div>
                    </header>

                </div > :
                <div>加载中...</div>
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
        fetchCode: bindActionCreators(fetchCode, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);