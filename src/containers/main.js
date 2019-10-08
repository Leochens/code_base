import React, { Component } from 'react';
import logo from './logo.svg';
import BigInput from '../components/BigInput';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { add } from '../actions/index';
import '../App.css';

class Main extends Component {
    state = {
        a: 'lalal'
    }
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        console.log(this.props);
    }
    onClick = () => {
        const { add } = this.props;
        add && add(12);
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <BigInput></BigInput>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        The Value from store is {this.props.value}
                    </a>
                    <button onClick={this.onClick}>ADD</button>
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