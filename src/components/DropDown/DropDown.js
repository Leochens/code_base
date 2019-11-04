import React, { useState } from 'react';
import { Menu, Dropdown, Icon } from 'antd';

const _DropDown = props => {
    const { onClick, curLang } = props;
    const [lang, setLang] = useState(curLang);
    const getMenu = onClick => [
        'C',
        'cpp',
        'javascript',
        'python',
        'php',
        'java',
        'sql',
        'bash',
        'ruby',
        'go',
        'typescript',
        'xml',
        'apache',
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

export default _DropDown;