import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';

const _DropDown = props => {
    const { onClick } = props;
    const getMenu = onClick => ['C', 'C++', 'javascript', 'python', 'php', 'java'].map((item, idx) => {
        return (
            <Menu.Item key={idx} onClick={() => onClick(item)}>
                {item}
            </Menu.Item>
        )
    });
    return (
        <Dropdown overlay={() => {
            return <Menu>
                {getMenu(onClick)}
            </Menu>
        }}>
            <a className="ant-dropdown-link" href="#">
                更改语言 <Icon type="down" />
            </a>
        </Dropdown>
    )
}

export default _DropDown;