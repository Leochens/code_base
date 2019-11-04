import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import DropDown from '../DropDown/DropDown';
const TextArea = Input.TextArea;
const AddingModal = props => {

    const { isShow, onOk, onCancel } = props;
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [tag, setTag] = useState('');
    const [lang, setLang] = useState('');
    const handleOnOk = () => {
        if (!value || !title || !lang) {

            message.error('内容不能为空');
            return;
        }
        const code = {
            title: [title],
            text: [value],
            badges: [tag],
            language: [lang]
        }
        onOk && onOk(code);
    }
    return (
        <Modal
            title="添加代码片段"
            visible={isShow}
            onOk={handleOnOk}
            onCancel={onCancel}
        >
            <Input required value={title} placeholder={"输入标题"} onChange={e => setTitle(e.target.value)} />
            <TextArea rows={4} required
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <Input value={tag} placeholder={"输入标签，以逗号分隔"} onChange={e => setTag(e.target.value)} />
            <DropDown onClick={lang => setLang(lang)} />
        </Modal>
    );
}
export default AddingModal;