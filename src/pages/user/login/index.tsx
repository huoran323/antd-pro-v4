import React, {Component} from "react";
import {Dispatch} from "redux"

interface LoginProps {
  dispatch: Dispatch<any>;
}

interface LoginState {

}

class Login extends Component<LoginProps, LoginState> {

  render() {
    return (
      <div>
        我是登录页面
      </div>
    )
  }
}

export default Login;
