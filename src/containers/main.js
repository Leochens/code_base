import React, { Component } from 'react';
import logo from './logo.svg';
import BigInput from '../components/BigInput';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { add } from '../actions/index';
import '../App.css';

class Main extends Component {
    state = {   

    }
    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <BigInput language="javascript"></BigInput>
                </header>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        value: state.test.value
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add: bindActionCreators(add, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);