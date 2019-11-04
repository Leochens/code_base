import React, { useState } from 'react';
import { Modal, Input,message } from 'antd';
const TextArea = Input.TextArea;
const AddingModal = props => {

    const { isShow, onOk, onCancel } = props;
    const [value, setValue] = useState('');
    const handleOnOk = () => {
        if (!value) {

            message.error('内容不能为空');
            return;
        }
        onOk && onOk(value);
    }
    return (
        <Modal
            title="添加代码片段"
            visible={isShow}
            onOk={handleOnOk}
            onCancel={onCancel}
        >
            <TextArea rows={4}
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </Modal>
    );
}
export default AddingModal;