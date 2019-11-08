import React, { Component } from 'react';
import BigInput from '../../components/BigInput/BigInput';
import SideBar from '../../components/SideBar/SideBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddingModal from '../../components/AddingModal/AddingModal';
import { Button, Input, Tag, Statistic, Layout, Col, Row, message, Icon, Popconfirm, Tooltip, Modal, Result } from 'antd';
import DropDown from '../../components/DropDown/DropDown';
import { addCode, updateCode, deleteCode, deleteBadge, addBadge, fetchCode } from '../../actions/index';
import xml from '../../utils/xml';
import './Main.scss';
import TipCollapse from '../../components/TipCollapse/TipCollapse';
const { Header, Footer, Sider, Content } = Layout;

const getFlushKey = () => Math.random() * 10000


class Main extends Component {

    state = {
        ready: false,
        showAddingModal: false,
        isAddingTag: false,
        tagValue: '',
        mode: '横排',
        flushKey: getFlushKey()
    }
    componentDidMount() {
        // 获取codes
        const { fetchCode } = this.props;
        const that = this;
        xml.loadXML().then(res => {
            console.log(res);

            fetchCode(res);
            if (res)
                that.setState({
                    codes: [...res],
                    curCodeId: res[0].id[0],
                    curCode: res[0]
                })
            else {
                that.setState({
                    codes: [],
                    curCodeId: -1,
                    curCode: {}
                })
            }
            that.setState({ ready: true })
        }).catch(e => {
            console.log(e);
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            codes: nextProps.codes,
            flushKey: getFlushKey()
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
        const { codes, flushKey } = this.state;
        console.log(codes);
        return codes.map((item, idx) => {
            return <BigInput key={flushKey} onlyShow={true} key={idx} id={item.id} language={item.language[0]} text={item.text[0]} ></BigInput>
        })
    }
    handleSelectCode = id => {
        const { codes } = this.state;
        console.log(id);
        const code = codes.filter((item, idx) => item.id[0] == id).pop();
        this.setState({
            curCodeId: id,
            curCode: { ...code }
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
        const newCurCode = {
            ...curCode,
            language: [lang]
        };
        this.setState({
            curCode: {
                ...this.state.curCode,
                language: [lang]
            }
        })
        updateCode && updateCode(curCodeId, newCurCode)
        message.success("修改成功");
    }
    handleDeleteCode = () => {
        const { curCodeId } = this.state;
        const { deleteCode } = this.props;
        console.log(curCodeId, deleteCode);
        const that = this;

        Modal.confirm({
            title: "警告",
            content: "确认删除该代码片段吗?",
            onOk: () => {
                deleteCode && deleteCode(curCodeId);
                that.setState({
                    curCodeId: -1,
                    curCode: {}
                })
            }
        })

    }
    finishInput = (e) => {
        console.log(e.currentTarget.innerHTML);
        let title = e.currentTarget.innerHTML
        if (!title) {

            title = ["无标题"];
        }
        const { curCode, curCodeId } = this.state;
        const { updateCode } = this.props;

        console.log(curCode, curCodeId);
        if (!curCode) return;
        const newCode = {
            ...curCode,
            title
        }
        updateCode && updateCode(curCodeId, { ...newCode })
    }
    renderCurCode = () => {
        const { curCodeId } = this.state;
        const { codes, mode } = this.state;

        const code = codes.filter((item, idx) => {
            return item.id[0] == curCodeId
        }).pop();
        if (!code) return '';
        return (
            <BigInput
                onGetText={this.handleGetText}
                id={code.id[0]}
                type={mode}
                language={code.language[0]}
                text={code.text[0]} ></BigInput>
        )
    }
    showAddingTag = () => {
        this.setState({ isAddingTag: true })
    }
    hideAddingTag = () => {
        this.setState({ isAddingTag: false })
    }
    handleNewTagChange = e => { this.setState({ tagValue: e.target.value }); }
    finishAddingTag = () => {
        console.log("finish")

        const { curCodeId, curCode, tagValue } = this.state;
        if (!tagValue.trim()) return this.hideAddingTag();
        const { updateCode } = this.props;
        const newCode = {
            ...curCode,
            badges: [curCode.badges[0] + (curCode.badges[0] ? ',' : '') + tagValue]
        };
        this.setState({
            curCode: newCode,
            isAddingTag: false
        })
        updateCode && updateCode(curCodeId, newCode);
    }
    deleteTags = (tag) => {

        const { curCodeId, curCode } = this.state;
        const { updateCode } = this.props;
        const badges = curCode.badges[0].split(',');

        if (badges.includes(tag)) badges.splice(badges.indexOf(tag), 1);
        const newCode = {
            ...curCode,
            badges: [badges.join(',')]
        };
        this.setState({
            curCode: newCode,
        })
        updateCode && updateCode(curCodeId, newCode);

    }
    getBadges = () => {
        const { curCode, curCodeId, isAddingTag } = this.state;
        const add = isAddingTag
            ? <span key={10086}>
                <Input size={'small'} style={{
                    width: 100
                }} onChange={this.handleNewTagChange} suffix={<div onClick={(this.finishAddingTag)}></div>}></Input>
                <Icon style={{
                    marginLeft: 10,
                    color: '#f50'
                }} type={'check-circle'} onClick={(this.finishAddingTag)} />
                <Icon style={{
                    marginLeft: 10,
                    color: '#666'
                }} type={'close-circle'} onClick={(this.hideAddingTag)} />
            </span>
            : <Tag key={10086} color="#f50" onClick={this.showAddingTag}  ><Icon type={'plus'} /></Tag>

        const { badges } = curCode;
        if (!badges || !badges[0]) return add;
        const bds = badges[0].split(',');
        console.log("bds", bds);
        const tags = bds.map((item, idx) =>
            <Popconfirm
                key={idx}
                title="确认删除这个标签吗"
                onConfirm={() => this.deleteTags(item)}
                okText="确认"
                cancelText="取消"
            >
                <Tag color="#f50">{item}</Tag>
            </Popconfirm>
        )
        tags.push(add);
        return tags;
    }
    handleChangeMode = mode => {
        console.log(mode);
        this.setState({ mode })
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
                    <Sider style={{
                        height: window.innerHeight // 设置全屏
                    }}>
                        <SideBar curIndex={this.state.curCodeId} codeList={this.state.codes} onSelectCode={this.handleSelectCode}>
                            <AddingModal isShow={showAddingModal} onOk={this.handleAddCode} onCancel={this.handleToggleShowAddingModal}></AddingModal>
                        </SideBar>
                    </Sider>
                    <Layout style={{
                        height: window.innerHeight // 设置全屏
                    }}>
                        <Header hidden={this.state.curCodeId == -1}>
                            <div
                                onBlur={this.finishInput}
                                suppressContentEditableWarning
                                contentEditable={true} className="code-title">{title || null}
                            </div>
                        </Header>
                        <Content style={{
                            padding: 40,
                            overflow: 'auto'
                        }} hidden={this.state.curCodeId == -1}>
                            <Row gutter={1} style={{
                                fontWeight: 600,
                                color: "rgb(24, 144, 251)"
                            }}>
                                <Col span={2}>
                                    <Tooltip title="点击查看帮助">
                                        <Icon type="bulb" />:&nbsp;帮助
                                    </Tooltip>
                                </Col>
                                <Col span={2}>
                                    <DropDown.ModeDropdown curMode={this.state.mode} onClick={this.handleChangeMode} />
                                </Col>
                                <Col span={2} onClick={this.handleDeleteCode}>
                                    <Icon type="delete" />:&nbsp;删除
                                </Col>
                                <Col span={3}>
                                    <DropDown.LangDropDown onClick={this.handleChangeLang} /> :{language}
                                </Col>
                            </Row>
                            <div
                                style={{
                                    paddingTop: 20
                                }} >
                                {this.renderCurCode()}
                                <TipCollapse />
                            </div>
                            <Row style={{
                                marginTop: 20
                            }}>
                                {this.getBadges()}

                            </Row>
                        </Content>
                        <Content hidden={this.state.curCodeId != -1}>
                            <Result
                                style={{
                                    marginTop:60
                                }}
                                title={'此时您的库里还没有代码!'}
                                icon={<Icon type="plus-square" />}
                                extra={<Button type={'primary'} onClick={this.handleToggleShowAddingModal}>添加代码</Button>}
                            />
                        </Content>
                        <Footer style={{
                            padding: 40
                        }}
                            hidden={this.state.curCodeId == -1}
                        >
                            <Col span={3}>
                                <Statistic title="代码片段数量" value={this.state.codes.length} />
                            </Col>
                            <Button onClick={this.handleToggleShowAddingModal}>添加代码</Button>
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