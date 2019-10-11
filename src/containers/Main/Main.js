import React, { Component } from 'react';
import BigInput from '../../components/BigInput/BigInput';
import SideBar from '../../components/SideBar/SideBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCode } from '../../actions/index';
import './Main.scss';

class Main extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            codes: props.codes,
            curCodeId: '1'
        }
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
        this.setState({
            curCodeId: id
        })
    }
    renderCurCode = () => {
        const { curCodeId } = this.state;
        const { codes } = this.state;
        console.log(codes)
        const code = codes.filter((item, idx) => {
            return item.id + '' === curCodeId
        }).pop();
        if (!code) return '';
        console.log(code.text);
        return (
            <div>
                <div className="code-title">{code.title}</div>
                <BigInput onlyShow={false} id={code.id} language={code.language} text={code.text} ></BigInput>
            </div>
        )

    }
    render() {
        return (
            <div className="main">

                <div className="side-bar">
                    <SideBar codeList={this.props.codes} onSelectCode={this.handleSelectCode}></SideBar>
                </div>
                <header className="code-page">
                    {this.renderCurCode()}
                </header>
                {this.props.children}
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
        addCode: bindActionCreators(addCode, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);