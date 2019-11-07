import React, { useState } from 'react';
import { Menu, Dropdown, Icon } from 'antd';

const LangDropDown = props => {
    const { onClick, curLang } = props;
    const [lang, setLang] = useState(curLang);
    const getMenu = onClick => [
        'C',
        'cpp',
        'JavaScript',
        'Python',
        'php',
        'java',
        'sql',
        'bash',
        'ruby',
        'go',
        'typescript',
        'xml',
        'apache',
        'css',
        'text'
    ].map((item, idx) => {
        return (
            <Menu.Item key={idx} onClick={() => {
                onClick(item)
                setLang(item);
            }}>
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
                设置语言{lang || ":"} <Icon type="down" />
            </a>
        </Dropdown>
    )
}
const ModeDropdown = props => {
    const { onClick, curMode } = props;
    const [mode, setMode] = useState(curMode);
    const getMenu = onClick => [
        '竖排',
        '横排'
    ].map((item, idx) => {
        return (
            <Menu.Item key={idx} onClick={() => {
                onClick(item)
                setMode(item);
            }}>
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
                视图模式:{mode} <Icon type="down" />
            </a>
        </Dropdown>
    )
}

export default {
    ModeDropdown,
    LangDropDown
};