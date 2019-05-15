import React, { Component } from "react";
import logo from "../../style/logo1.png"
import { login } from '../../actions/auth/auth'
import { connect } from 'react-redux'


const mapStateToProps = state => {
    console.log(state)
    return {
        auth: state.authReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (l, password) => dispatch(login(l, password))
    }
}

class AuthForm extends Component {
    state = {
        login: "",
        password: ""
    }
    setinPut = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    submit = e => {
        e.preventDefault()
        console.log(this.state)
        this.props.login(this.state.login, this.state.password).then(good => {
            console.log(good)
            this.props.history.push("/")
        })
    }
    render() {
        console.log(this.props)
        return (
            <div className="AuthForm">
                <div className="auth-wrapper">
                    <form className="form-controll" onSubmit={this.submit}>
                        <div className="icon"><img src={logo} alt=""/></div>
                        <div className="title">Admin Panel</div>
                        <div className="input-wrapper">
                            <input placeholder="login" type="text" onChange={this.setinPut} value = {this.state.login} name="login"></input>
                        </div>
                        <div className="input-wrapper">
                            <input placeholder="password" type="password" onChange={this.setinPut} value={this.state.password} name="password"></input>
                        </div>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
