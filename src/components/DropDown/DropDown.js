import React, { useState } from 'react';
import { Menu, Dropdown, Icon, Tooltip } from 'antd';

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
            <span className="ant-dropdown-link" href="#">
                <Tooltip title="选择代码语言">
                    <Icon type="number" />
                </Tooltip>
            </span>
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
            <span className="ant-dropdown-link" href="#">
                <Tooltip title="视图模式,切换模式前注意保存代码">
                    <Icon type="layout" />:&nbsp;{mode}
                </Tooltip>
            </span>
        </Dropdown>
    )
}

export default {
    ModeDropdown,
    LangDropDown
};