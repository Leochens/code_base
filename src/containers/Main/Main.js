import React, { Component } from 'react';
import BigInput from '../../components/BigInput/BigInput';
import SideBar from '../../components/SideBar/SideBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddingModal from '../../components/AddingModal/AddingModal';
import { Button, Input, Tag, Layout, Col, Row, message, Icon } from 'antd';
import DropDown from '../../components/DropDown/DropDown';
import { addCode, updateCode, deleteCode, deleteBadge, addBadge, fetchCode } from '../../actions/index';
import xml from '../../utils/xml';
import './Main.scss';
const { Header, Footer, Sider, Content } = Layout;




class Main extends Component {

    state = {
        ready: false,
        showAddingModal: false
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
    handleToggleShowAddingModal = () => {
        const { showAddingModal } = this.state;
        this.setState({
            showAddingModal: !showAddingModal
        })
    }
    handleAddCode = (text) => {
        const { addCode } = this.props;
        addCode && addCode(text);
        this.handleToggleShowAddingModal()
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
        console.log(id);
        const code = codes.filter((item, idx) => item.id[0] == id).pop();

        this.setState({
            curCodeId: id,
            curCode: code
        })
    }
    handleGetText = (text) => {
        const { updateCode } = this.props;
        const { curCode, curCodeId } = this.state;
        if (!curCode) return;
        const newCurCode = { ...curCode };
        this.setState({
            curCode: {
                ...this.state.curCode,
                text: [text]
            }
        })
        newCurCode.text[0] = text;
        updateCode && updateCode(curCodeId, curCode)
        message.success("修改成功");
    }
    handleChangeLang = (lang) => {
        const { updateCode } = this.props;
        const { curCode, curCodeId } = this.state;
        if (!curCode) return;
        const newCurCode = { ...curCode };
        this.setState({
            curCode: {
                ...this.state.curCode,
                language: [lang]
            }
        })
        newCurCode.language[0] = lang;

        updateCode && updateCode(curCodeId, curCode)
        message.success("修改成功");
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
    getBadges = () => {
        const { curCode } = this.state;
        const add = <Tag key={10086} color="#f50">
            <Icon type={'plus'} /> 添加标签
        </Tag>
        const { badges } = curCode;
        if (!badges[0]) return add;
        const bds = badges[0].split(',');
        console.log("bds", bds);
        const tags = bds.map((item, idx) =>
            <Tag key={idx} color="#f50">{item}</Tag>
        )
        tags.push(add);

        return tags;
    }
    render() {
        const { ready, showAddingModal, curCode } = this.state;
        if (!curCode) return null;
        const {
            language,
            title,
            text
        } = curCode;
        return (
            ready ?

                <Layout>
                    <Sider>
                        <SideBar codeList={this.state.codes} onSelectCode={this.handleSelectCode}>

                            <Button style={{
                                marginTop: 30
                            }} onClick={this.handleToggleShowAddingModal}>添加代码</Button>

                            <AddingModal isShow={showAddingModal} onOk={this.handleAddCode} onCancel={this.handleToggleShowAddingModal}></AddingModal>
                        </SideBar>
                    </Sider>
                    <Layout>
                        <Header hidden={this.state.curCodeId == -1}>
                            <div
                                onBlur={this.finishInput}
                                suppressContentEditableWarning
                                contentEditable={true} className="code-title">{title || null}
                            </div>
                        </Header>
                        <Content style={{
                            padding: 40,
                        }} hidden={this.state.curCodeId == -1}>
                            <Row>
                                <Col span={10}>
                                    提示:您可以双击代码片段修改代码
                                </Col>
                                <Col span={4} offset={10}>
                                    <div>当前语言:{language || ''}</div>
                                    <DropDown onClick={this.handleChangeLang} />
                                </Col>
                            </Row>
                            <div
                                style={{

                                    paddingTop: 60
                                }} >
                                {this.renderCurCode()}
                            </div>
                            {this.getBadges()}
                        </Content>
                        <Footer style={{
                            padding: 40
                        }} hidden={this.state.curCodeId == -1}>
                            <Button className="del-btn" onClick={this.handleDeleteCode} >删除本片段</Button>
                        </Footer>
                    </Layout>

                </Layout>
                :
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