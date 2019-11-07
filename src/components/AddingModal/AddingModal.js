import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import DropDown from '../DropDown/DropDown';
import { Button } from 'antd/lib/radio';
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
            <Input style={{
                marginBottom: 10
            }} required value={title} placeholder={"输入标题"} onChange={e => setTitle(e.target.value)} />
            <TextArea style={{
                marginBottom: 10
            }} rows={4} required
                value={value}
                autoSize={{ minRows: 10 }}
                placeholder={"请输入代码,推荐将代码拷贝到此处."}
                onChange={e => setValue(e.target.value)}
            />
            <Input style={{
                marginBottom: 10
            }} value={tag} placeholder={"输入标签，以逗号分隔"} onChange={e => setTag(e.target.value)} />
            选择代码语言>
            <Button>
                <DropDown.LangDropDown onClick={lang => setLang(lang)} />
            </Button>
        </Modal>
    );
}
export default AddingModal;