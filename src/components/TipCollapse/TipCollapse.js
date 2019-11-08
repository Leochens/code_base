import React from 'react';
import { Collapse, Icon } from 'antd';

const { Panel } = Collapse;

const text = `
 双击代码片段即可修改
`;

const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
};



const TipCollapse = function () {

    return (
        <Collapse
            bordered={false}
            // defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
        >
            <Panel header="如何修改代码片段" key="1" style={customPanelStyle}>
                <p>{text}</p>
            </Panel>
        </Collapse>
    )
}

export default TipCollapse;