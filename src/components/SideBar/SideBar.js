import React, { Component } from 'react';
import { Col, Row, Icon } from 'antd';
import './SideBar.scss';
export default class SideBar extends Component {

    static defaultProps = {
        codeList: [],
        onSelectCode: () => { },
        curIndex: 1
    }
    renderBadges(badges, id) {
        if (badges[0] === '') return;
        const bds = badges[0].split(',');
        return bds.map((item, idx) => {
            return <span style={{
                fontSize: 4,
                color: 'orange',
                marginRight: 4
            }} key={idx} id={id} >{item}</span>
        })
    }

    handleSelectCode = (e) => {

        console.log(e.target.id);
        const { onSelectCode } = this.props;
        this.setState({
            curIndex: e.target.id
        })
        const id = parseInt(e.target.id);
        onSelectCode && onSelectCode(id);
    }
    renderList() {
        const { codeList, curIndex } = this.props;
        return codeList.map((item, idx) => {
            return (
                <div
                    className="item"
                    onClick={this.handleSelectCode}
                    key={idx}
                    style={{
                        background: curIndex == item.id ? '#5E626A' : null
                    }}
                    id={item.id}>
                    
                    {item.title}&nbsp;
                    <br />

                    {this.renderBadges(item.badges, item.id)}
                </div>
            )
        })
    }
    render() {
        return (
            <Col span={24} className={'side-bar'}>
                <Row style={{
                    color: "#fff",
                    fontSize: 20,
                    alignItems: 'center',
                    padding: 16
                }} justify="center" align="middle">
                    <Icon type="unordered-list" /> &nbsp; 代码列表
                </Row>
                {this.renderList()}
                <Row >
                    {this.props.children}
                </Row>
            </Col>
        )
    }
}