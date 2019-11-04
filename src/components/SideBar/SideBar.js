import React, { Component } from 'react';
import './SideBar.scss';
export default class SideBar extends Component {

    static defaultProps = {
        codeList: [],
        onSelectCode: () => { }
    }
    renderBadges(badges) {
        const bds = badges[0].split(',');
        return bds.map((item, idx) => {
            return <span key={idx} className="badge">{item}</span>
        })
    }

    handleSelectCode = (e) => {
        console.log(e.target.id);
        const { onSelectCode } = this.props;
        const id = parseInt(e.target.id);
        onSelectCode && onSelectCode(id);
    }
    renderList() {
        const { codeList } = this.props;
        return codeList.map((item, idx) => {
            return (
                <div
                    className="item"
                    onClick={this.handleSelectCode}
                    key={idx}
                    id={item.id}>{item.title}
                    {this.renderBadges(item.badges)}
                </div>
            )
        })
    }
    render() {
        return (
            <div className="side-bar">
                {this.renderList()}
                <div className="extra">
                    {this.props.children}
                </div>
            </div>
        )
    }
}