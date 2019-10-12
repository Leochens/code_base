import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigInput from '../../components/BigInput/BigInput';
import './NewCode.scss'
class NewCode extends Component {

    state = {
        text: ''
    }
    handleOnChange = e => {
        this.setState({
            text: e.target.value
        })
    }
    render() {
        return (
            <div className="new-code-page">
                <div className="show-part">
                    <BigInput
                        
                        text={this.state.text}
                    />
                </div>


            </div>
        )
    }
}

export default connect(state => ({

}))(NewCode);